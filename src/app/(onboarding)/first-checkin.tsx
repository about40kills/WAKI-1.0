import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { EmotionWheelPicker } from "@/components/checkin/EmotionWheelPicker";
import type { AppColors } from "@/constants/colors";
import { trackAnalyticsEvent } from "@/services/analytics/client";
import { useUserStore } from "@/store/userStore";
import { useLanguage } from "@/hooks/useLanguage";
import { saveCheckin } from "@/services/storage/moodRepository";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    content: {
      paddingHorizontal: 24,
      paddingTop: 40,
      paddingBottom: 40,
      flexGrow: 1,
    },
    topIcon: { alignSelf: "center", marginBottom: 16 },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: colors.textMuted,
      textAlign: "center",
      marginBottom: 28,
      lineHeight: 22,
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      marginTop: 24,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    btnPressed: { opacity: 0.88 },
    btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  });
}

export default function FirstCheckinScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const language = useUserStore((s) => s.languageCode);
  const setOnboardingDone = useUserStore((s) => s.setOnboardingDone);
  const setLastCheckinDate = useUserStore((s) => s.setLastCheckinDate);
  const setStreakCount = useUserStore((s) => s.setStreakCount);
  const [emotionId, setEmotionId] = useState("");
  const [emotionLabel, setEmotionLabel] = useState("");

  const handleFinish = async () => {
    const hasInitialCheckin = Boolean(emotionId);
    if (emotionId) {
      const today = new Date().toISOString().split("T")[0];
      await saveCheckin({
        emotion_id: emotionId,
        emotion_label: emotionLabel,
        language_code: language,
        timestamp: new Date().toISOString(),
      });
      await setLastCheckinDate(today);
      await setStreakCount(1);
      await trackAnalyticsEvent("mood_checkin_saved", {
        source: "onboarding",
        hasFollowUp: false,
      });
    }
    await setOnboardingDone(true);
    await trackAnalyticsEvent("onboarding_completed", {
      languageCode: language,
      hasInitialCheckin,
    });
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <Ionicons name="happy-outline" size={48} color={colors.primary} style={styles.topIcon} />
        <Text style={styles.title}>{t("firstCheckin.title")}</Text>
        <Text style={styles.subtitle}>{t("firstCheckin.subtitle")}</Text>

        <EmotionWheelPicker
          languageCode={language}
          onPick={(id, label) => {
            setEmotionId(id);
            setEmotionLabel(label);
          }}
        />

        <Pressable
          onPress={handleFinish}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Ionicons name={emotionId ? "checkmark-circle" : "arrow-forward"} size={20} color="#fff" />
          <Text style={styles.btnText}>
            {emotionId ? t("firstCheckin.saveAndStart") : t("firstCheckin.skip")}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
