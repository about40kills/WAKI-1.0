import { useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    card: {
      backgroundColor: colors.surfaceWarm,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 28,
      paddingBottom: 40,
    },
    heading: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    body: {
      fontSize: 14,
      color: colors.textMuted,
      lineHeight: 20,
      marginBottom: 24,
    },
    actions: {
      flexDirection: "row",
      gap: 12,
    },
    btn: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    btnOutline: {
      borderWidth: 1.5,
      borderColor: colors.primary,
      backgroundColor: "transparent",
    },
    btnCrisis: {
      backgroundColor: colors.crisis,
    },
    btnText: {
      fontSize: 15,
      fontWeight: "600",
    },
    btnOutlineText: {
      color: colors.primary,
    },
    btnCrisisText: {
      color: "#fff",
    },
  });
}

export function CrisisModal({
  visible,
  onClose,
  onGetSupport,
}: {
  visible: boolean;
  onClose: () => void;
  onGetSupport: () => void;
}) {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.heading}>
            I hear that things feel hard right now.
          </Text>
          <Text style={styles.body}>
            You don't have to face this alone. Support is available.
          </Text>

          <View style={styles.actions}>
            <Pressable
              onPress={onClose}
              style={[styles.btn, styles.btnOutline]}
              android_ripple={{ color: "rgba(255,255,255,0.08)" }}
            >
              <Text style={[styles.btnText, styles.btnOutlineText]}>
                I'm okay
              </Text>
            </Pressable>

            <Pressable
              onPress={onGetSupport}
              style={[styles.btn, styles.btnCrisis]}
              android_ripple={{ color: "rgba(255,255,255,0.2)" }}
            >
              <Text style={[styles.btnText, styles.btnCrisisText]}>
                Get support
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
