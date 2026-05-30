import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    bubble: { maxWidth: "82%", padding: 10, borderRadius: 12, marginVertical: 6 },
    user: { alignSelf: "flex-end", backgroundColor: colors.userBubble },
    assistant: { alignSelf: "flex-start", backgroundColor: colors.surfaceWarm },
    body: { color: colors.text, fontSize: 15, lineHeight: 22 },
  });
}

export function MessageBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const isUser = role === "user";
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.assistant]}>
      <Text style={styles.body}>{text}</Text>
    </View>
  );
}
