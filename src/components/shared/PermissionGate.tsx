import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceWarm,
    },
    content: {
      flex: 1,
      gap: 8,
    },
    title: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },
    body: {
      fontSize: 13,
      color: colors.textMuted,
      lineHeight: 18,
    },
    button: {
      alignSelf: "flex-start",
      backgroundColor: colors.primary,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 9,
    },
    buttonPressed: {
      opacity: 0.88,
    },
    buttonText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "700",
    },
  });
}

export function PermissionGate({ onRetry }: { onRetry: () => void }) {
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="mic-off-outline" size={20} color={colors.secondary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t("permission.micTitle")}</Text>
        <Text style={styles.body}>{t("permission.micBody")}</Text>
        <Pressable onPress={onRetry} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>{t("permission.micCta")}</Text>
        </Pressable>
      </View>
    </View>
  );
}
