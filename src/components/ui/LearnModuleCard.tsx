import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { AppColors } from "@/constants/colors";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";

interface LearnModuleCardProps {
  title: string;
  summary: string;
  readTime: string;
  completed?: boolean;
  onPress: () => void;
}

function getStyles(colors: AppColors, isDark: boolean) {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 16,
      marginBottom: 12,
      gap: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.35 : 0.06,
      shadowRadius: 4,
      elevation: 1,
    },
    cardPressed: { opacity: 0.88 },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    content: { flex: 1, gap: 4 },
    title: {
      fontSize: 15,
      fontWeight: "600",
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
      marginTop: 4,
    },
    metaText: {
      fontSize: 11,
      color: colors.textMuted,
      marginRight: 8,
    },
  });
}

export function LearnModuleCard({
  title,
  summary,
  readTime,
  completed,
  onPress,
}: LearnModuleCardProps) {
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons
          name={completed ? "checkmark-circle" : "book-outline"}
          size={22}
          color={completed ? colors.primaryLight : colors.primary}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.summary} numberOfLines={2}>{summary}</Text>
        <View style={styles.meta}>
          <Ionicons name="time-outline" size={12} color={colors.textMuted} />
          <Text style={styles.metaText}>{readTime}</Text>
          {completed && (
            <>
              <Ionicons name="checkmark" size={12} color={colors.primaryLight} />
              <Text style={[styles.metaText, { color: colors.primaryLight }]}>Completed</Text>
            </>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}
