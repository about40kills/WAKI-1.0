import { useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TranscriptDisplay } from "@/components/conversation/TranscriptDisplay";
import { CrisisModal } from "@/components/conversation/CrisisModal";
import { VoiceInputOverlay } from "@/components/conversation/VoiceInputOverlay";
import { PermissionGate } from "@/components/shared/PermissionGate";
import { VoiceButton } from "@/components/ui/VoiceButton";
import { CrisisBar } from "@/components/ui/CrisisBar";
import { LoadingWave } from "@/components/ui/LoadingWave";
import type { AppColors } from "@/constants/colors";
import { useConversation } from "@/hooks/useConversation";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useLanguage } from "@/hooks/useLanguage";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useUserStore } from "@/store/userStore";
import { speakText } from "@/services/khaya/tts";
import { playAudioUri } from "@/services/audio/player";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    flex: { flex: 1 },
    messageList: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
      flexGrow: 1,
      justifyContent: "flex-end",
    },
    errorBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.crisisBg,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    errorText: {
      color: colors.crisis,
      fontSize: 13,
      flex: 1,
    },
    offlineCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.surfaceWarm,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    offlineText: {
      flex: 1,
      fontSize: 13,
      color: colors.text,
    },
    inputBar: {
      flexDirection: "row",
      alignItems: "flex-end",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.textMuted,
      backgroundColor: colors.surface,
      gap: 8,
    },
    input: {
      flex: 1,
      maxHeight: 100,
      borderWidth: 1,
      borderColor: colors.textMuted,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: Platform.OS === "ios" ? 10 : 7,
      fontSize: 15,
      color: colors.text,
      backgroundColor: colors.surface,
    },
    sendBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    sendBtnDisabled: {
      backgroundColor: colors.textMuted,
    },
    voiceRow: {
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    safeguardStrip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 8,
      backgroundColor: colors.surfaceWarm,
    },
    safeguardText: {
      flex: 1,
      fontSize: 11,
      color: colors.textMuted,
      lineHeight: 15,
    },
    modeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
    modeText: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: "500",
    },
  });
}

export function ChatInterface() {
  const router = useRouter();
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { isOffline } = useNetworkStatus();
  const { messages, init, send, error, riskLevel, isStreaming, mode } = useConversation();
  const voice = useVoiceInput();
  const languageCode = useUserStore((s) => s.languageCode);
  const [value, setValue] = useState("");
  const [showModerateModal, setShowModerateModal] = useState(false);
  const [showSafeguard, setShowSafeguard] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isStreaming]);

  const submit = async (text: string, inputMethod: "text" | "voice" = "text") => {
    if (!text.trim()) return;
    if (isOffline) return;
    setValue("");
    const result = await send(text, inputMethod);
    if (result.risk_level === "moderate") {
      setShowModerateModal(true);
    } else {
      setShowModerateModal(false);
    }
    if (result.crisis) {
      router.push("/crisis");
      return;
    }
    try {
      const audioUri = await speakText(result.response, languageCode);
      if (audioUri) await playAudioUri(audioUri);
    } catch {
      // Audio playback failure is non-fatal — message is already displayed.
    }
  };

  const onVoicePressIn = async () => {
    await voice.startRecording();
  };

  const onVoicePressOut = async () => {
    const text = await voice.stopRecording();
    if (text) await submit(text, "voice");
  };

  const showPermissionGate = voice.hasPermission === false;
  const voiceError = voice.error === "Microphone permission denied" ? null : voice.error;
  const sendDisabled = !value.trim() || isOffline;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.flex}>
        {showSafeguard && (
          <Pressable
            onPress={() => setShowSafeguard(false)}
            style={styles.safeguardStrip}
          >
            <Ionicons name="shield-checkmark-outline" size={13} color={colors.textMuted} />
            <Text style={styles.safeguardText}>{t("conversation.safeguard")}</Text>
            <Ionicons name="close" size={14} color={colors.textMuted} />
          </Pressable>
        )}

        {messages.length > 0 && (
          <View style={styles.modeRow}>
            <Ionicons
              name={mode === "guiding" ? "compass-outline" : "ear-outline"}
              size={13}
              color={colors.primary}
            />
            <Text style={styles.modeText}>
              {mode === "guiding"
                ? t("conversation.modeGuiding")
                : t("conversation.modeListening")}
            </Text>
          </View>
        )}

        {riskLevel === "low" && (
          <CrisisBar onPress={() => router.push("/crisis")} />
        )}

        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.messageList}
          keyboardShouldPersistTaps="handled"
        >
          <TranscriptDisplay messages={messages} />
          {isStreaming && <LoadingWave />}
        </ScrollView>

        {isOffline ? (
          <View style={styles.offlineCard}>
            <Ionicons name="cloud-offline-outline" size={15} color={colors.secondary} />
            <Text style={styles.offlineText}>{t("offline.banner")}</Text>
          </View>
        ) : null}

        {(error || voiceError) ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={15} color={colors.crisis} />
            <Text style={styles.errorText}>{String(error ?? voiceError ?? "")}</Text>
          </View>
        ) : null}

        {!voice.isRecording && (
          <View style={styles.inputBar}>
            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder={t("conversation.typePlaceholder")}
              placeholderTextColor={colors.textMuted}
              multiline
              style={styles.input}
              onSubmitEditing={() => submit(value, "text")}
              blurOnSubmit={false}
            />
            <Pressable
              onPress={() => submit(value, "text")}
              style={[styles.sendBtn, sendDisabled && styles.sendBtnDisabled]}
              disabled={sendDisabled}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </Pressable>
          </View>
        )}

        <View style={styles.voiceRow}>
          {showPermissionGate ? (
            <PermissionGate onRetry={voice.requestPermission} />
          ) : (
            <VoiceButton
              disabled={isOffline}
              isRecording={voice.isRecording}
              isProcessing={voice.isTranscribing}
              onPressIn={onVoicePressIn}
              onPressOut={onVoicePressOut}
            />
          )}
        </View>
      </View>

      <VoiceInputOverlay visible={voice.isRecording} />

      <CrisisModal
        visible={showModerateModal}
        onClose={() => setShowModerateModal(false)}
        onGetSupport={() => {
          setShowModerateModal(false);
          router.push("/crisis");
        }}
      />
    </KeyboardAvoidingView>
  );
}
