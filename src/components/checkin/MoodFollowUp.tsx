import { useMemo } from "react";
import { StyleSheet, TextInput } from "react-native";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1.5,
      borderColor: colors.primaryLight,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 15,
      color: colors.text,
      minHeight: 90,
    },
  });
}

export function MoodFollowUp({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <TextInput
      placeholder="How are you feeling about that?"
      placeholderTextColor={colors.textMuted}
      value={value}
      onChangeText={onChange}
      multiline
      numberOfLines={3}
      style={styles.input}
      textAlignVertical="top"
    />
  );
}
