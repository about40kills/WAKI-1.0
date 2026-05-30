import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { COPING_TOOLS, type CopingToolCategory } from "@/constants/copingTools";
import { COPING_TOOL_ICONS } from "@/constants/copingToolIcons";
import { CopingCard } from "@/components/ui/CopingCard";
import type { AppColors } from "@/constants/colors";
import type { TranslationKey } from "@/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserStore } from "@/store/userStore";
import { useThemeColors } from "@/theme/ThemeProvider";
import { localizedContent } from "@/utils/localizedContent";

const FILTERS: ReadonlyArray<{ key: TranslationKey; value: CopingToolCategory | "all" }> = [
  { key: "toolkit.filterAll", value: "all" },
  { key: "toolkit.filterGrounding", value: "grounding" },
  { key: "toolkit.filterBreathing", value: "breathing" },
  { key: "toolkit.filterBody", value: "body" },
  { key: "toolkit.filterComfort", value: "comfort" },
];

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
      marginBottom: 16,
    },
    filterRow: {
      flexDirection: "row",
      gap: 8,
      paddingBottom: 18,
    },
    filterPill: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.textMuted,
    },
    filterPillActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.textMuted,
    },
    filterTextActive: {
      color: "#fff",
    },
  });
}

export default function ToolkitScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const language = useUserStore((s) => s.languageCode);
  const setLastCopingToolId = useUserStore((s) => s.setLastCopingToolId);
  const [activeFilter, setActiveFilter] = useState<CopingToolCategory | "all">("all");
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const filteredTools = activeFilter === "all"
    ? COPING_TOOLS
    : COPING_TOOLS.filter((tool) => tool.category === activeFilter);

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>{t("toolkit.title")}</Text>
        <Text style={styles.subheading}>{t("toolkit.subtitle")}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f.value}
              onPress={() => setActiveFilter(f.value)}
              style={[
                styles.filterPill,
                activeFilter === f.value && styles.filterPillActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === f.value && styles.filterTextActive,
                ]}
              >
                {t(f.key)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {filteredTools.map((tool) => (
          <CopingCard
            key={tool.id}
            title={localizedContent(tool.title, language)}
            description={localizedContent(tool.description, language)}
            iconName={COPING_TOOL_ICONS[tool.category].outline}
            onPress={() => {
              setLastCopingToolId(tool.id);
              router.push(`/toolkit/${tool.id}`);
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
}
