import { useMemo } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { LearnModuleCard } from "@/components/ui/LearnModuleCard";
import { PSYCHOED_MODULES } from "@/constants/psychoedModules";
import type { AppColors } from "@/constants/colors";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserStore } from "@/store/userStore";
import { useThemeColors } from "@/theme/ThemeProvider";
import { localizedContent } from "@/utils/localizedContent";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    heading: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },
    subheading: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 24,
    },
  });
}

export default function LearnScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const language = useUserStore((s) => s.languageCode);
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>{t("learn.title")}</Text>
        <Text style={styles.subheading}>{t("learn.subtitle")}</Text>

        {PSYCHOED_MODULES.map((mod) => (
          <LearnModuleCard
            key={mod.id}
            title={localizedContent(mod.title, language)}
            summary={localizedContent(mod.summary, language)}
            readTime={t("learn.minuteRead", { min: String(mod.readTimeMinutes) })}
            onPress={() => router.push(`/learn/${mod.id}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
}
