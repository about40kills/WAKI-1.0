import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { AudioSource } from "expo-audio";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { useLanguage } from "@/hooks/useLanguage";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

type AudioPlayerProps = {
  source: AudioSource;
  /**
   * Full-width “Play guided audio” CTA until playback has started; then shows
   * compact play / pause / stop (for toolkit detail — no separate player screen).
   */
  guidedCta?: boolean;
  ctaLabel?: string;
  onPlayStart?: () => void;
};

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    ctaBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.primary,
      borderRadius: 14,
      paddingVertical: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    ctaBtnPressed: { opacity: 0.85 },
    ctaBtnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 8,
    },
    playBtn: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    stopBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.textMuted,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 13,
      color: colors.textMuted,
    },
    errorText: {
      marginTop: 10,
      fontSize: 13,
      color: colors.crisis,
      lineHeight: 18,
    },
  });
}

export function AudioPlayer({
  source,
  guidedCta = false,
  ctaLabel = "Play guided audio",
  onPlayStart,
}: AudioPlayerProps) {
  const colors = useThemeColors();
  const { t } = useLanguage();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { isPlaying, isPaused, isLoading, error, play, pause, resume, stop } = useAudioPlayback(source);

  const handleMain = () => {
    if (isPlaying) {
      void pause();
    } else if (isPaused) {
      onPlayStart?.();
      void resume();
    } else {
      onPlayStart?.();
      void play();
    }
  };

  const mainIcon: keyof typeof Ionicons.glyphMap = isPlaying
    ? "pause"
    : isPaused
    ? "play"
    : "play";

  const showGuidedCta = guidedCta && !isPlaying && !isPaused && !isLoading;

  if (showGuidedCta) {
    return (
      <View>
        <Pressable
          onPress={() => {
            onPlayStart?.();
            void play();
          }}
          style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
          android_ripple={{ color: "rgba(255,255,255,0.25)" }}
        >
          <Ionicons name="play-circle" size={22} color="#fff" />
          <Text style={styles.ctaBtnText}>{ctaLabel}</Text>
        </Pressable>
        {error ? <Text style={styles.errorText}>{t("audio.playbackError")}</Text> : null}
      </View>
    );
  }

  return (
    <View>
      <View style={styles.row}>
        <Pressable
          onPress={handleMain}
          style={styles.playBtn}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Ionicons name={mainIcon} size={22} color="#fff" />
        </Pressable>

        {(isPlaying || isPaused || isLoading) && (
          <Pressable
            onPress={() => {
              void stop();
            }}
            style={styles.stopBtn}
          >
            <Ionicons name="stop" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
      {isLoading ? <Text style={styles.loadingText}>{t("audio.loading")}</Text> : null}
      {error ? <Text style={styles.errorText}>{t("audio.playbackError")}</Text> : null}
    </View>
  );
}
