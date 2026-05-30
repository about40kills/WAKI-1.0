import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { useLanguage } from "@/hooks/useLanguage";
import { LANGUAGES } from "@/constants/languages";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";
import { useUserStore } from "@/store/userStore";
import { useConversationStore } from "@/store/conversationStore";
import { useMoodStore } from "@/store/moodStore";
import { clearAnalyticsState, syncAnalyticsConsent } from "@/services/analytics/client";
import { deleteProfile } from "@/services/storage/userRepository";
import { clearCheckins } from "@/services/storage/moodRepository";
import { clearConversationData } from "@/services/storage/conversationRepository";
import { exportUserData, importUserDataFromPicker } from "@/services/storage/exportData";
import {
  scheduleDailyCheckinReminder,
  cancelCheckinReminder,
  requestNotificationPermissions,
} from "@/services/notifications/checkinScheduler";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const colors = useThemeColors();
  const styles = getStyles(colors);

  const nickname = useUserStore((s) => s.nickname);
  const languageCode = useUserStore((s) => s.languageCode);
  const onboardingDone = useUserStore((s) => s.onboardingDone);
  const consentLocal = useUserStore((s) => s.consentLocal);
  const consentTrain = useUserStore((s) => s.consentTrain);
  const notificationTime = useUserStore((s) => s.notificationTime);
  const streakCount = useUserStore((s) => s.streakCount);
  const lastCheckinDate = useUserStore((s) => s.lastCheckinDate);
  const lastCopingToolId = useUserStore((s) => s.lastCopingToolId);
  const theme = useUserStore((s) => s.theme);
  const setNickname = useUserStore((s) => s.setNickname);
  const setTheme = useUserStore((s) => s.setTheme);
  const setLanguageCode = useUserStore((s) => s.setLanguageCode);
  const setOnboardingDone = useUserStore((s) => s.setOnboardingDone);
  const setConsentLocal = useUserStore((s) => s.setConsentLocal);
  const setConsentTrain = useUserStore((s) => s.setConsentTrain);
  const setNotificationTime = useUserStore((s) => s.setNotificationTime);
  const setStreakCount = useUserStore((s) => s.setStreakCount);
  const setLastCheckinDate = useUserStore((s) => s.setLastCheckinDate);
  const setLastCopingToolId = useUserStore((s) => s.setLastCopingToolId);
  const resetSession = useUserStore((s) => s.resetSession);

  const notificationsEnabled = notificationTime !== null;
  const handleToggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermissions();
      if (!granted) return;
      const defaultTime = "09:00";
      await scheduleDailyCheckinReminder(
        defaultTime,
        t("app.name"),
        t("home.nudge")
      );
      await setNotificationTime(defaultTime);
    } else {
      await cancelCheckinReminder();
      await setNotificationTime(null);
    }
  };

  const handleToggleConsentTrain = async (enabled: boolean) => {
    await setConsentTrain(enabled);
    await syncAnalyticsConsent(enabled);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { uri, shared } = await exportUserData({
        nickname,
        languageCode,
        theme,
        onboardingDone,
        consentLocal,
        consentTrain,
        consentCloud: false,
        notificationTime,
        streakCount,
        lastCheckinDate,
        lastCopingToolId,
      });

      Alert.alert(
        t("settings.dataExport"),
        shared ? t("settings.exportReady") : t("settings.exportFallback", { path: uri })
      );
    } catch {
      Alert.alert(t("settings.dataExport"), t("settings.exportFailed"));
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      const restored = await importUserDataFromPicker();

      await setNickname(restored.nickname);
      setLanguageCode(restored.languageCode);
      await setTheme(restored.theme);
      await setOnboardingDone(true);
      await setConsentLocal(restored.consentLocal);
      await setConsentTrain(restored.consentTrain);
      await setNotificationTime(restored.notificationTime);
      await setStreakCount(restored.streakCount);
      await setLastCheckinDate(restored.lastCheckinDate);
      await setLastCopingToolId(restored.lastCopingToolId);

      useConversationStore.setState({
        currentSessionId: null,
        isStreaming: false,
        lastResponseText: "",
        currentRiskLevel: "none",
      });
      useMoodStore.setState({
        checkedInToday: restored.lastCheckinDate === new Date().toISOString().split("T")[0],
        weeklySummary: [],
      });

      await clearAnalyticsState();
      await syncAnalyticsConsent(restored.consentTrain);

      if (restored.notificationTime) {
        const granted = await requestNotificationPermissions();
        if (granted) {
          await scheduleDailyCheckinReminder(
            restored.notificationTime,
            t("app.name"),
            t("home.nudge")
          );
        }
      } else {
        await cancelCheckinReminder();
      }

      Alert.alert(t("settings.restoreData"), t("settings.restoreReady"));
      router.replace("/(tabs)/home");
    } catch (error) {
      if (error instanceof Error && /cancel/i.test(error.message)) {
        return;
      }
      Alert.alert(t("settings.restoreData"), t("settings.restoreFailed"));
    } finally {
      setIsImporting(false);
    }
  };

  const handleDeleteAll = () => {
    Alert.alert(
      t("settings.deleteAllTitle"),
      t("settings.deleteAllBody"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("settings.deleteAllCta"),
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
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title={t("settings.title")} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.language")}</Text>
          <View style={styles.card}>
            {LANGUAGES.map((language) => {
              const active = language.code === languageCode;
              return (
                <Pressable
                  key={language.code}
                  onPress={() => {
                    void setLanguageCode(language.code);
                  }}
                  style={({ pressed }) => [
                    styles.languageButton,
                    active && styles.languageButtonActive,
                    pressed && styles.pressed,
                  ]}
                >
                  <View>
                    <Text style={[styles.languageTitle, active && styles.languageTitleActive]}>
                      {language.displayName}
                    </Text>
                    <Text style={[styles.languageSubtitle, active && styles.languageSubtitleActive]}>
                      {language.nativeName}
                    </Text>
                  </View>
                  {active ? <Ionicons name="checkmark-circle" size={20} color="#fff" /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.theme")}</Text>
          <View style={[styles.card, styles.row]}>
            <Pressable
              onPress={() => void setTheme("light")}
              style={({ pressed }) => [styles.themeButton, theme === "light" && styles.themeButtonActive, pressed && styles.pressed]}
            >
              <Ionicons name="sunny-outline" size={20} color={theme === "light" ? "#fff" : colors.primary} />
              <Text style={[styles.themeButtonText, theme === "light" && styles.themeButtonTextActive]}>{t("settings.themeLight")}</Text>
            </Pressable>
            <Pressable
              onPress={() => void setTheme("dark")}
              style={({ pressed }) => [styles.themeButton, theme === "dark" && styles.themeButtonActive, pressed && styles.pressed]}
            >
              <Ionicons name="moon-outline" size={20} color={theme === "dark" ? "#fff" : colors.primary} />
              <Text style={[styles.themeButtonText, theme === "dark" && styles.themeButtonTextActive]}>{t("settings.themeDark")}</Text>
            </Pressable>
            <Pressable
              onPress={() => void setTheme("system")}
              style={({ pressed }) => [styles.themeButton, theme === "system" && styles.themeButtonActive, pressed && styles.pressed]}
            >
              <Ionicons name="phone-portrait-outline" size={20} color={theme === "system" ? "#fff" : colors.primary} />
              <Text style={[styles.themeButtonText, theme === "system" && styles.themeButtonTextActive]}>{t("settings.themeSystem")}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.privacy")}</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{t("settings.privacyLocal")}</Text>
                <Text style={styles.rowHint}>{t("consent.toggleLocalHint")}</Text>
              </View>
              <Switch value={consentLocal} disabled />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{t("settings.privacyTrain")}</Text>
              <Text style={styles.rowHint}>{t("consent.toggleTrainHint")}</Text>
            </View>
              <Switch value={consentTrain} onValueChange={(value) => void handleToggleConsentTrain(value)} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.notifications")}</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{t("settings.notifications")}</Text>
                <Text style={styles.rowHint}>{t("settings.notificationHint")}</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={(value) => void handleToggleNotifications(value)}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.backupRestore")}</Text>
          <Pressable onPress={handleExport} style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
            <View style={styles.actionIcon}>
              <Ionicons name="download-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{t("settings.dataExport")}</Text>
              <Text style={styles.rowHint}>
                {isExporting ? t("settings.exporting") : t("settings.dataExportHint")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
          <Pressable onPress={handleImport} style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
            <View style={styles.actionIcon}>
              <Ionicons name="cloud-upload-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{t("settings.restoreData")}</Text>
              <Text style={styles.rowHint}>
                {isImporting ? t("settings.restoring") : t("settings.restoreDataHint")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t("settings.deleteAll")}</Text>
          <Pressable onPress={handleDeleteAll} style={({ pressed }) => [styles.dangerCard, pressed && styles.pressed]}>
            <View style={styles.actionIconDanger}>
              <Ionicons name="trash-outline" size={18} color={colors.crisis} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{t("settings.deleteAll")}</Text>
              <Text style={styles.rowHint}>{t("settings.deleteAllBody")}</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const getStyles = (COLORS: AppColors) => StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 48,
    gap: 20,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: "hidden",
  },
  themeButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 6,
    borderRadius: 12,
  },
  themeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  themeButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  themeButtonTextActive: {
    color: "#fff",
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  languageButtonActive: {
    backgroundColor: COLORS.primary,
  },
  languageTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  languageTitleActive: {
    color: "#fff",
  },
  languageSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  languageSubtitleActive: {
    color: "rgba(255,255,255,0.82)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowText: {
    flex: 1,
    gap: 3,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  rowHint: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 17,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.textMuted,
    opacity: 0.2,
    marginHorizontal: 16,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
  },
  dangerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: COLORS.crisisBg,
    borderRadius: 16,
    padding: 16,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  actionIconDanger: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.88,
  },
});
