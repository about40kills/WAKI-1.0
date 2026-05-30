import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { PSYCHOED_MODULES } from "@/constants/psychoedModules";
import type { AppColors } from "@/constants/colors";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserStore } from "@/store/userStore";
import { useThemeColors } from "@/theme/ThemeProvider";
import { localizedContent } from "@/utils/localizedContent";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    missing: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    missingText: { fontSize: 16, color: colors.textMuted },
    content: {
      padding: 24,
      paddingBottom: 48,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginBottom: 24,
    },
    metaText: {
      fontSize: 13,
      color: colors.textMuted,
    },
    section: {
      marginBottom: 24,
    },
    sectionHeading: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    sectionBody: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 24,
    },
  });
}

export default function LearnModuleScreen() {
  const { moduleId: raw } = useLocalSearchParams<{ moduleId: string | string[] }>();
  const moduleId = Array.isArray(raw) ? raw[0] : raw ?? "";
  const { t } = useLanguage();
  const language = useUserStore((s) => s.languageCode);
  const mod = useMemo(() => PSYCHOED_MODULES.find((m) => m.id === moduleId), [moduleId]);
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  if (!mod) {
    return (
      <SafeAreaWrapper>
        <View style={styles.missing}>
          <ScreenHeader />
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.missingText}>Module not found</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader />

        <Text style={styles.title}>{localizedContent(mod.title, language)}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>
            {t("learn.minuteRead", { min: String(mod.readTimeMinutes) })}
          </Text>
        </View>

        {mod.sections.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionHeading}>{localizedContent(section.heading, language)}</Text>
            <Text style={styles.sectionBody}>{localizedContent(section.body, language)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
}
