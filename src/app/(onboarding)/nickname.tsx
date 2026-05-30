import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "@/store/userStore";
import { useLanguage } from "@/hooks/useLanguage";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 52,
      gap: 20,
    },
    header: { alignItems: "center", gap: 10, marginBottom: 8 },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: colors.textMuted,
      textAlign: "center",
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1.5,
      borderColor: colors.primaryLight,
      borderRadius: 14,
      paddingHorizontal: 18,
      paddingVertical: 16,
      fontSize: 17,
      color: colors.text,
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 17,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    },
    btnDisabled: { backgroundColor: colors.textMuted, shadowOpacity: 0 },
    btnPressed: { opacity: 0.88 },
    btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  });
}

export default function NicknameScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const { lang: langParam } = useLocalSearchParams<{ lang?: string | string[] }>();
  const fromRoute =
    typeof langParam === "string"
      ? langParam
      : Array.isArray(langParam)
        ? langParam[0]
        : undefined;
  const { t, languageCode: effectiveLang } = useLanguage(fromRoute);
  const setNickname = useUserStore((s) => s.setNickname);
  const [value, setValue] = useState("");
  const canContinue = value.trim().length > 0;

  const goNext = async () => {
    if (!canContinue) return;
    await setNickname(value.trim());
    router.push("/(onboarding)/consent");
  };

  return (
    <SafeAreaWrapper key={effectiveLang}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={52} color={colors.primary} />
          <Text style={styles.title}>{t("onboarding.nicknameTitle")}</Text>
          <Text style={styles.subtitle}>{t("onboarding.nicknameSubtitle")}</Text>
        </View>

        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={t("onboarding.nicknamePlaceholder")}
          placeholderTextColor={colors.textMuted}
          autoFocus
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={() => void goNext()}
          style={styles.input}
        />

        <Pressable
          onPress={() => void goNext()}
          style={({ pressed }) => [
            styles.btn,
            !canContinue && styles.btnDisabled,
            pressed && canContinue && styles.btnPressed,
          ]}
          disabled={!canContinue}
        >
          <Text style={styles.btnText}>{t("onboarding.continue")}</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
}
