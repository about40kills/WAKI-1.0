import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { COPING_TOOLS } from "@/constants/copingTools";
import type { AppColors } from "@/constants/colors";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserStore } from "@/store/userStore";
import { useMoodStore } from "@/store/moodStore";
import { useThemeColors } from "@/theme/ThemeProvider";
import { localizedContent } from "@/utils/localizedContent";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingTop: 36,
      paddingBottom: 40,
    },
    greeting: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 16,
      lineHeight: 32,
    },
    quoteCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.surfaceWarm,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 16,
    },
    quoteText: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
      fontStyle: "italic",
      lineHeight: 20,
    },
    streakRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 16,
    },
    streakText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.secondary,
    },
    nudgeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.surface,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    nudgeText: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    primaryBtn: {
      flexDirection: "row",
      gap: 10,
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    primaryBtnText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },
    lastToolBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.surface,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 24,
    },
    lastToolText: {
      flex: 1,
      fontSize: 14,
      color: colors.primary,
      fontWeight: "500",
    },
    safeguardWrap: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginTop: 8,
      opacity: 0.7,
    },
    safeguardText: {
      flex: 1,
      fontSize: 11,
      color: colors.textMuted,
      lineHeight: 16,
    },
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const name = useUserStore((s) => s.nickname) || "friend";
  const streakCount = useUserStore((s) => s.streakCount);
  const lastCheckinDate = useUserStore((s) => s.lastCheckinDate);
  const lastCopingToolId = useUserStore((s) => s.lastCopingToolId);
  const language = useUserStore((s) => s.languageCode);
  const checkedInToday = useMoodStore((s) => s.checkedInToday);

  const today = new Date().toISOString().split("T")[0];
  const hasCheckedInToday = lastCheckinDate === today || checkedInToday;
  const showNudge = !hasCheckedInToday;

  const lastTool = lastCopingToolId
    ? COPING_TOOLS.find((tool) => tool.id === lastCopingToolId)
    : null;

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>{t("home.greeting", { name })}</Text>

        <View style={styles.quoteCard}>
          <Ionicons name="sparkles-outline" size={16} color={colors.primaryLight} />
          <Text style={styles.quoteText}>{t("home.quote")}</Text>
        </View>

        {streakCount > 0 && (
          <View style={styles.streakRow}>
            <Ionicons name="flame" size={18} color={colors.secondary} />
            <Text style={styles.streakText}>
              {t("home.streak", { count: String(streakCount) })}
            </Text>
          </View>
        )}

        {showNudge && (
          <Pressable
            onPress={() => router.push("/checkin")}
            style={styles.nudgeCard}
          >
            <Ionicons name="sunny-outline" size={20} color={colors.primary} />
            <Text style={styles.nudgeText}>{t("home.nudge")}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </Pressable>
        )}

        <Pressable
          onPress={() => router.push("/conversation/default")}
          style={styles.primaryBtn}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Ionicons name="mic" size={20} color="#fff" />
          <Text style={styles.primaryBtnText}>{t("home.talk")}</Text>
        </Pressable>

        {lastTool && (
          <Pressable
            onPress={() => router.push(`/toolkit/${lastTool.id}`)}
            style={styles.lastToolBtn}
          >
            <Ionicons name="refresh-outline" size={18} color={colors.primary} />
            <Text style={styles.lastToolText}>
              {t("home.lastTool", { tool: localizedContent(lastTool.title, language) })}
            </Text>
          </Pressable>
        )}

        <View style={styles.safeguardWrap}>
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.textMuted} />
          <Text style={styles.safeguardText}>{t("safeguard.statement")}</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
