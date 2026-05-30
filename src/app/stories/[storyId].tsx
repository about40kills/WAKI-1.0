import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { STORIES } from "@/constants/stories";
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
      paddingHorizontal: 24,
      gap: 12,
      paddingTop: 24,
    },
    missingText: {
      fontSize: 16,
      color: colors.textMuted,
    },
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
    meta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginBottom: 24,
    },
    metaText: {
      fontSize: 13,
      color: colors.textMuted,
    },
    body: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 25,
    },
  });
}

export default function StoryDetailScreen() {
  const { storyId: raw } = useLocalSearchParams<{ storyId: string | string[] }>();
  const storyId = Array.isArray(raw) ? raw[0] : raw ?? "";
  const { t } = useLanguage();
  const language = useUserStore((s) => s.languageCode);
  const story = useMemo(() => STORIES.find((item) => item.id === storyId), [storyId]);
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  if (!story) {
    return (
      <SafeAreaWrapper>
        <View style={styles.missing}>
          <ScreenHeader />
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.missingText}>{t("stories.notFound")}</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader />
        <Text style={styles.title}>{localizedContent(story.title, language)}</Text>
        <View style={styles.meta}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>
            {t("stories.readTime", { min: String(story.readTimeMinutes) })}
          </Text>
        </View>
        <Text style={styles.body}>{localizedContent(story.body, language)}</Text>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
