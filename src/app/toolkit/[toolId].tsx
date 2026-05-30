import { useEffect, useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { trackAnalyticsEvent } from "@/services/analytics/client";
import { COPING_TOOLS } from "@/constants/copingTools";
import { COPING_TOOL_ICONS } from "@/constants/copingToolIcons";
import type { AppColors } from "@/constants/colors";
import { useUserStore } from "@/store/userStore";
import { useThemeColors } from "@/theme/ThemeProvider";
import { localizedContent } from "@/utils/localizedContent";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    missingState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    notFound: { fontSize: 16, color: colors.textMuted },
    content: { padding: 24, paddingTop: 24, gap: 0 },
    iconWrap: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 18,
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 10,
    },
    description: {
      fontSize: 15,
      color: colors.textMuted,
      lineHeight: 22,
      marginBottom: 32,
    },
  });
}

export default function ToolkitDetailScreen() {
  const { toolId: raw } = useLocalSearchParams<{ toolId: string | string[] }>();
  const toolId = Array.isArray(raw) ? raw[0] : raw ?? "";
  const language = useUserStore((s) => s.languageCode);
  const tool = useMemo(() => COPING_TOOLS.find((t) => t.id === toolId), [toolId]);
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const hasTrackedAudioStart = useRef(false);

  useEffect(() => {
    if (!tool) return;
    void trackAnalyticsEvent("coping_tool_opened", {
      toolId: tool.id,
      category: tool.category,
    });
  }, [tool]);

  if (!tool) {
    return (
      <SafeAreaWrapper>
        <View style={styles.missingState}>
          <ScreenHeader />
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.notFound}>Tool not found</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  const iconName = COPING_TOOL_ICONS[tool.category].filled;
  const audioSource = localizedContent(tool.audioSource, language);

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader />
        <View style={styles.iconWrap}>
          <Ionicons name={iconName} size={40} color={colors.primary} />
        </View>

        <Text style={styles.title}>{localizedContent(tool.title, language)}</Text>
        <Text style={styles.description}>{localizedContent(tool.description, language)}</Text>

        <AudioPlayer
          key={tool.id}
          source={audioSource}
          guidedCta
          onPlayStart={() => {
            if (hasTrackedAudioStart.current) return;
            hasTrackedAudioStart.current = true;
            void trackAnalyticsEvent("coping_audio_started", {
              toolId: tool.id,
              category: tool.category,
            });
          }}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
}
