import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { AppColors } from "@/constants/colors";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";

interface StoryCardProps {
  title: string;
  summary: string;
  readTime: string;
  onPress: () => void;
}

function getStyles(colors: AppColors, isDark: boolean) {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      gap: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.35 : 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    cardPressed: {
      opacity: 0.88,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceWarm,
    },
    content: {
      flex: 1,
      gap: 4,
    },
    title: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },
    summary: {
      fontSize: 13,
      color: colors.textMuted,
      lineHeight: 18,
    },
    meta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 2,
    },
    metaText: {
      fontSize: 11,
      color: colors.textMuted,
    },
  });
}

export function StoryCard({ title, summary, readTime, onPress }: StoryCardProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.iconWrap}>
        <Ionicons name="bookmarks-outline" size={22} color={colors.secondary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.summary} numberOfLines={3}>
          {summary}
        </Text>
        <View style={styles.meta}>
          <Ionicons name="time-outline" size={12} color={colors.textMuted} />
          <Text style={styles.metaText}>{readTime}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}
