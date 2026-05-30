import { useMemo } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { StoryCard } from "@/components/ui/StoryCard";
import { STORIES } from "@/constants/stories";
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

export default function StoriesScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const language = useUserStore((s) => s.languageCode);
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>{t("stories.title")}</Text>
        <Text style={styles.subheading}>{t("stories.subtitle")}</Text>

        {STORIES.map((story) => (
          <StoryCard
            key={story.id}
            title={localizedContent(story.title, language)}
            summary={localizedContent(story.summary, language)}
            readTime={t("stories.readTime", { min: String(story.readTimeMinutes) })}
            onPress={() => router.push(`/stories/${story.id}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
}
