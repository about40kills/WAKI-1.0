import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    banner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: colors.surfaceWarm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.secondary,
    },
    text: {
      flex: 1,
      fontSize: 13,
      fontWeight: "600",
      color: colors.text,
      lineHeight: 18,
    },
  });
}

export function OfflineBanner() {
  const { t } = useLanguage();
  const { isOffline, ready } = useNetworkStatus();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  if (!ready || !isOffline) return null;

  return (
    <View style={styles.banner}>
      <Ionicons name="cloud-offline-outline" size={16} color={colors.secondary} />
      <Text style={styles.text}>{t("offline.banner")}</Text>
    </View>
  );
}
