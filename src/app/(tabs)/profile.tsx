import { useMemo } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { LanguagePill } from "@/components/ui/LanguagePill";
import { MoodChart } from "@/components/ui/MoodChart";
import type { AppColors } from "@/constants/colors";
import { useMoodData } from "@/hooks/useMoodData";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserStore } from "@/store/userStore";
import { clearAnalyticsState } from "@/services/analytics/client";
import { deleteProfile } from "@/services/storage/userRepository";
import { clearCheckins } from "@/services/storage/moodRepository";
import { clearConversationData } from "@/services/storage/conversationRepository";
import { useConversationStore } from "@/store/conversationStore";
import { useMoodStore } from "@/store/moodStore";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors, isDark: boolean) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 24,
      paddingBottom: 48,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 20,
    },
    avatarWrap: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.primaryLight,
    },
    headerText: { flex: 1, gap: 6 },
    name: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.textMuted,
      marginBottom: 24,
      opacity: 0.3,
    },
    settingsCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
    },
    settingsCardPressed: {
      opacity: 0.88,
    },
    settingsIcon: {
      width: 42,
      height: 42,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    settingsTextWrap: {
      flex: 1,
      gap: 3,
    },
    settingsTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },
    settingsBody: {
      fontSize: 13,
      lineHeight: 19,
      color: colors.textMuted,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 12,
    },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    chartCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.35 : 0.06,
      shadowRadius: 4,
      elevation: 1,
    },
    privacyCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      backgroundColor: colors.surfaceWarm,
      borderRadius: 12,
      padding: 16,
    },
    privacyText: {
      flex: 1,
      fontSize: 13,
      color: colors.textMuted,
      lineHeight: 20,
    },
    sessionCard: {
      backgroundColor: colors.crisisBg,
      borderRadius: 14,
      padding: 16,
      marginTop: 18,
      gap: 12,
    },
    sessionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    sessionTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },
    sessionBody: {
      fontSize: 13,
      lineHeight: 20,
      color: colors.textMuted,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.crisis,
      borderRadius: 12,
      paddingVertical: 14,
    },
    logoutButtonPressed: {
      opacity: 0.86,
    },
    logoutButtonText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
    },
  });
}

export default function ProfileScreen() {
  const router = useRouter();
  const { labels, points } = useMoodData();
  const { t } = useLanguage();
  const nickname = useUserStore((s) => s.nickname);
  const resetSession = useUserStore((s) => s.resetSession);
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const handleLogout = () => {
    Alert.alert(
      t("profile.logoutTitle"),
      t("profile.logoutBody"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("profile.logoutCta"),
          style: "destructive",
          onPress: async () => {
            await Promise.all([
              deleteProfile(),
              clearAnalyticsState(),
              clearCheckins(),
              clearConversationData(),
              resetSession(),
            ]);
            useConversationStore.setState({
              currentSessionId: null,
              isStreaming: false,
              lastResponseText: "",
              currentRiskLevel: "none",
            });
            useMoodStore.setState({
              checkedInToday: false,
              weeklySummary: [],
            });
            router.replace("/(onboarding)/welcome");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={28} color={colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{nickname || "friend"}</Text>
            <LanguagePill />
          </View>
        </View>

        <View style={styles.divider} />

        <Pressable
          onPress={() => router.push("/settings")}
          style={({ pressed }) => [styles.settingsCard, pressed && styles.settingsCardPressed]}
        >
          <View style={styles.settingsIcon}>
            <Ionicons name="settings-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.settingsTextWrap}>
            <Text style={styles.settingsTitle}>{t("settings.title")}</Text>
            <Text style={styles.settingsBody}>{t("settings.about")}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Pressable>

        <View style={styles.sectionHeader}>
          <Ionicons name="bar-chart-outline" size={15} color={colors.textMuted} />
          <Text style={styles.sectionLabel}>{t("profile.moodChartTitle")}</Text>
        </View>
        <View style={styles.chartCard}>
          <MoodChart
            labels={labels}
            points={points}
            emptyMessage={t("profile.moodChartEmpty")}
            yAxisHigh={t("profile.moodAxis.high")}
            yAxisMid={t("profile.moodAxis.mid")}
            yAxisLow={t("profile.moodAxis.low")}
          />
        </View>

        <View style={styles.privacyCard}>
          <Ionicons name="lock-closed-outline" size={16} color={colors.textMuted} />
          <Text style={styles.privacyText}>{t("profile.localData")}</Text>
        </View>

        <View style={styles.sessionCard}>
          <View style={styles.sessionHeader}>
            <Ionicons name="log-out-outline" size={18} color={colors.crisis} />
            <Text style={styles.sessionTitle}>{t("profile.sessionTitle")}</Text>
          </View>
          <Text style={styles.sessionBody}>{t("profile.sessionBody")}</Text>

          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}
          >
            <Ionicons name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.logoutButtonText}>{t("profile.logoutCta")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
