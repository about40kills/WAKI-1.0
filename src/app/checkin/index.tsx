import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { EmotionWheelPicker } from "@/components/checkin/EmotionWheelPicker";
import { MoodFollowUp } from "@/components/checkin/MoodFollowUp";
import { CheckinSummary } from "@/components/checkin/CheckinSummary";
import type { AppColors } from "@/constants/colors";
import { trackAnalyticsEvent } from "@/services/analytics/client";
import { useUserStore } from "@/store/userStore";
import { useMoodStore } from "@/store/moodStore";
import { useLanguage } from "@/hooks/useLanguage";
import { saveCheckin } from "@/services/storage/moodRepository";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    savedScreen: {
      flex: 1,
    },
    headerWrap: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    content: {
      padding: 20,
      paddingBottom: 48,
      gap: 20,
    },
    heading: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
    subheading: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: -12,
    },
    followUpWrap: { gap: 8 },
    followUpLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    saveBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 17,
      marginTop: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    },
    saveBtnDisabled: { backgroundColor: colors.textMuted, shadowOpacity: 0 },
    saveBtnPressed: { opacity: 0.88 },
    saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  });
}

export default function CheckinScreen() {
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const language = useUserStore((s) => s.languageCode);
  const lastCheckinDate = useUserStore((s) => s.lastCheckinDate);
  const streakCount = useUserStore((s) => s.streakCount);
  const setLastCheckinDate = useUserStore((s) => s.setLastCheckinDate);
  const setStreakCount = useUserStore((s) => s.setStreakCount);
  const setCheckedInToday = useMoodStore((s) => s.setCheckedInToday);
  const [emotionId, setEmotionId] = useState("");
  const [emotionLabel, setEmotionLabel] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <SafeAreaWrapper>
        <View style={styles.savedScreen}>
          <View style={styles.headerWrap}>
            <ScreenHeader />
          </View>
        <CheckinSummary emotion={emotionLabel} />
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader />
        <Text style={styles.heading}>{t("checkin.title")}</Text>
        <Text style={styles.subheading}>{t("checkin.subtitle")}</Text>

        <EmotionWheelPicker
          languageCode={language}
          onPick={(id, label) => {
            setEmotionId(id);
            setEmotionLabel(label);
          }}
        />

        {emotionId !== "" && (
          <View style={styles.followUpWrap}>
            <Text style={styles.followUpLabel}>{t("checkin.followUpLabel")}</Text>
            <MoodFollowUp value={followUp} onChange={setFollowUp} />
          </View>
        )}

        <Pressable
          onPress={async () => {
            if (!emotionId) return;
            const now = new Date();
            const today = now.toISOString().split("T")[0];
            await saveCheckin({
              emotion_id: emotionId,
              emotion_label: emotionLabel,
              follow_up_text: followUp,
              language_code: language,
              timestamp: now.toISOString(),
            });
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split("T")[0];
            const isConsecutive = lastCheckinDate === yesterdayStr || lastCheckinDate === today;
            await setStreakCount(isConsecutive ? streakCount + 1 : 1);
            await setLastCheckinDate(today);
            setCheckedInToday(true);
            await trackAnalyticsEvent("mood_checkin_saved", {
              source: "daily_checkin",
              hasFollowUp: Boolean(followUp.trim()),
            });
            setSaved(true);
          }}
          style={({ pressed }) => [
            styles.saveBtn,
            !emotionId && styles.saveBtnDisabled,
            pressed && emotionId && styles.saveBtnPressed,
          ]}
          disabled={!emotionId}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.saveBtnText}>{t("checkin.save")}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
