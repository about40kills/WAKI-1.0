import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";
import { useLanguage } from "@/hooks/useLanguage";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: colors.crisisBg,
      marginBottom: 8,
    },
    textWrap: { flex: 1 },
    text: { color: colors.crisis, fontWeight: "600", fontSize: 13 },
  });
}

export function CrisisBar({ onPress }: { onPress?: () => void }) {
  const colors = useThemeColors();
  const { t } = useLanguage();
  const styles = useMemo(() => getStyles(colors), [colors]);
  return (
    <Pressable onPress={onPress} style={styles.bar}>
      <Ionicons name="warning-outline" size={16} color={colors.crisis} />
      <View style={styles.textWrap}>
        <Text style={styles.text}>{t("crisis.barText")}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.crisis} />
    </Pressable>
  );
}
