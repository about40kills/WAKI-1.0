import { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserStore } from "@/store/userStore";
import { useLanguage } from "@/hooks/useLanguage";
import { LANGUAGES } from "@/constants/languages";
import type { AppColors } from "@/constants/colors";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";
import type { LanguageCode } from "@/types/language";

function getStyles(colors: AppColors, isDark: boolean) {
  return StyleSheet.create({
    pill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.5)",
      alignSelf: "flex-start",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.25 : 0.04,
      shadowRadius: 4,
      elevation: 1,
    },
    pillPressed: { opacity: 0.88 },
    text: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "600",
    },
    modalRoot: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    dim: {
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.55)" : "rgba(0, 0, 0, 0.22)",
    },
    sheetOuter: {
      maxHeight: "72%",
    },
    sheetShell: {
      maxHeight: 440,
      paddingTop: 16,
      paddingHorizontal: 8,
      paddingBottom: 10,
      borderRadius: 20,
      overflow: "hidden",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.55)",
    },
    sheetWeb: {
      backgroundColor: isDark ? "rgba(38, 38, 38, 0.88)" : "rgba(255, 255, 255, 0.78)",
    },
    sheetTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 0.7,
      paddingHorizontal: 12,
      marginBottom: 8,
    },
    scroll: {
      maxHeight: 360,
    },
    scrollContent: {
      paddingBottom: 6,
      gap: 4,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 14,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.14)",
    },
    rowPressed: {
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.28)",
    },
    rowActive: {
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(255, 255, 255, 0.32)",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)",
    },
    rowText: {
      flex: 1,
      gap: 2,
    },
    rowLabel: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    rowLabelActive: {
      fontWeight: "800",
    },
    rowSub: {
      fontSize: 13,
      color: colors.textMuted,
    },
    rowSpacer: {
      width: 22,
      height: 22,
    },
  });
}

export function LanguagePill() {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const languageCode = useUserStore((s) => s.languageCode);
  const setLanguageCode = useUserStore((s) => s.setLanguageCode);
  const { t } = useLanguage();
  const colors = useThemeColors();
  const { isDark } = useThemeMode();
  const styles = useMemo(() => getStyles(colors, isDark), [colors, isDark]);

  const blurTint = isDark ? "dark" : "light";

  const current = LANGUAGES.find((l) => l.code === languageCode);

  const pick = (code: LanguageCode) => {
    void Haptics.selectionAsync();
    setLanguageCode(code);
    setOpen(false);
  };

  const sheetBody = (
    <>
      <Text style={styles.sheetTitle}>{t("settings.language")}</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const active = lang.code === languageCode;
          return (
            <Pressable
              key={lang.code}
              onPress={() => pick(lang.code)}
              style={({ pressed }) => [
                styles.row,
                pressed && styles.rowPressed,
                active && styles.rowActive,
              ]}
            >
              <View style={styles.rowText}>
                <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>
                  {lang.displayName}
                </Text>
                <Text style={styles.rowSub}>{lang.nativeName}</Text>
              </View>
              {active ? (
                <Ionicons name="checkmark-circle-outline" size={22} color={colors.textMuted} />
              ) : (
                <View style={styles.rowSpacer} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => [styles.pill, pressed && styles.pillPressed]}
      >
        <Ionicons name="language-outline" size={14} color={colors.textMuted} />
        <Text style={styles.text}>{current?.nativeName ?? languageCode}</Text>
        <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
            {Platform.OS === "web" ? (
              <View style={[StyleSheet.absoluteFill, styles.dim]} />
            ) : (
              <BlurView intensity={isDark ? 28 : 18} tint={blurTint} style={StyleSheet.absoluteFill} />
            )}
          </Pressable>

          <View
            style={[styles.sheetOuter, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}
            pointerEvents="box-none"
          >
            {Platform.OS === "web" ? (
              <View style={[styles.sheetShell, styles.sheetWeb]}>{sheetBody}</View>
            ) : (
              <BlurView intensity={isDark ? 72 : 64} tint={blurTint} style={styles.sheetShell}>
                {sheetBody}
              </BlurView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
