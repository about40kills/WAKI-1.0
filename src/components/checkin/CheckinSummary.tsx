import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
      gap: 14,
      backgroundColor: colors.background,
    },
    iconWrap: { marginBottom: 4 },
    headline: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
    emotionPill: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      backgroundColor: colors.surface,
      borderRadius: 999,
      borderWidth: 1.5,
      borderColor: colors.primaryLight,
      fontSize: 16,
      fontWeight: "600",
      color: colors.primary,
      overflow: "hidden",
    },
    body: {
      fontSize: 15,
      color: colors.textMuted,
      textAlign: "center",
      lineHeight: 22,
    },
    talkBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 24,
      marginTop: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    },
    talkBtnPressed: { opacity: 0.88 },
    talkBtnText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
    },
  });
}

export function CheckinSummary({ emotion }: { emotion: string }) {
  const router = useRouter();
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="checkmark-circle" size={64} color={colors.primaryLight} />
      </View>
      <Text style={styles.headline}>{t("checkin.saved")}</Text>
      <Text style={styles.emotionPill}>{emotion}</Text>
      <Text style={styles.body}>{t("checkin.savedBody")}</Text>

      <Pressable
        onPress={() => router.push("/conversation/default")}
        style={({ pressed }) => [styles.talkBtn, pressed && styles.talkBtnPressed]}
      >
        <Ionicons name="chatbubble-outline" size={18} color="#fff" />
        <Text style={styles.talkBtnText}>{t("checkin.talkAboutIt")}</Text>
      </Pressable>
    </View>
  );
}
