import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/store/userStore";
import { useLanguage } from "@/hooks/useLanguage";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { LANGUAGES } from "@/constants/languages";
import type { AppColors } from "@/constants/colors";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";
import type { LanguageCode } from "@/types/language";

const ICON_FOR_LANG: Record<LanguageCode, keyof typeof Ionicons.glyphMap> = {
  en: "globe-outline",
  tw: "chatbubble-ellipses-outline",
  gaa: "people-outline",
  ee: "flower-outline",
  dag: "map-outline",
};

function getStyles(colors: AppColors, isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 52,
    },
    header: { marginBottom: 28 },
    title: {
      fontSize: 26,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textMuted,
      lineHeight: 21,
    },
    options: { gap: 12 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 18,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.35 : 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    cardPressed: { opacity: 0.85 },
    cardIcon: {
      width: 52,
      height: 52,
      borderRadius: 14,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    cardText: { flex: 1 },
    cardLabel: { fontSize: 17, fontWeight: "700", color: colors.text, marginBottom: 2 },
    cardSub: { fontSize: 13, color: colors.textMuted },
  });
}

export default function LanguageSelectScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const setLanguageCode = useUserStore((s) => s.setLanguageCode);
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const languageRoster = useMemo(
    () => LANGUAGES.map((l) => l.nativeName).join(" · "),
    []
  );

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("onboarding.languageTitle")}</Text>
          <Text style={styles.subtitle}>
            {t("onboarding.languageSubtitle", { roster: languageRoster })}
          </Text>
        </View>

        <View style={styles.options}>
          {LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() => {
                setLanguageCode(lang.code);
                router.push({
                  pathname: "/(onboarding)/nickname",
                  params: { lang: lang.code },
                });
              }}
            >
              <View style={styles.cardIcon}>
                <Ionicons name={ICON_FOR_LANG[lang.code]} size={28} color={colors.primary} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>{lang.displayName}</Text>
                <Text style={styles.cardSub}>{lang.nativeName}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaWrapper>
  );
}
