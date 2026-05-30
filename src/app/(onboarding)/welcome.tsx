import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { useLanguage } from "@/hooks/useLanguage";
import type { AppColors } from "@/constants/colors";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors, isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 28,
      paddingBottom: 40,
    },
    centerBlock: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    hero: { alignItems: "center", gap: 10 },
    logoWrap: {
      width: 88,
      height: 88,
      borderRadius: 24,
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.92)",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.4 : 0.2,
      shadowRadius: 10,
      elevation: 5,
      marginBottom: 8,
      borderWidth: isDark ? StyleSheet.hairlineWidth : 0,
      borderColor: "rgba(255,255,255,0.1)",
    },
    title: {
      fontSize: 34,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: -0.5,
    },
    tagline: {
      fontSize: 15,
      color: colors.textMuted,
      fontStyle: "italic",
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    btnPressed: { opacity: 0.88 },
    btnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  });
}

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <View style={styles.centerBlock}>
          <View style={styles.hero}>
            <View style={styles.logoWrap}>
              <Ionicons name="leaf" size={48} color={colors.primary} />
            </View>
            <Text style={styles.title}>{t("app.name")}</Text>
            <Text style={styles.tagline}>{t("onboarding.tagline")}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/(onboarding)/language-select")}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Text style={styles.btnText}>{t("onboarding.getStarted")}</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
}
