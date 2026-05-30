import { useMemo } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";
import { CRISIS_CONTACTS } from "@/constants/crisisContacts";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.crisisBg,
    },
    container: {
      padding: 28,
      paddingTop: 64,
      alignItems: "center",
    },
    heading: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.crisis,
      textAlign: "center",
      marginBottom: 12,
    },
    subheading: {
      fontSize: 15,
      color: colors.textMuted,
      textAlign: "center",
      marginBottom: 36,
      lineHeight: 22,
    },
    btn: {
      width: "100%",
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      marginBottom: 14,
    },
    btnSafe: {
      backgroundColor: colors.primary,
    },
    btnHelp: {
      backgroundColor: colors.crisis,
    },
    btnText: {
      fontSize: 16,
      fontWeight: "700",
    },
    contactsHeader: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginTop: 24,
      marginBottom: 12,
      alignSelf: "flex-start",
    },
    contactRow: {
      width: "100%",
      backgroundColor: colors.surface,
      borderRadius: 10,
      padding: 14,
      marginBottom: 8,
    },
    contactName: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 2,
    },
    contactNumber: {
      fontSize: 13,
      color: colors.textMuted,
    },
  });
}

export function SafetyCheckModal({
  visible,
  onSafe,
  onGetHelp,
}: {
  visible: boolean;
  onSafe: () => void;
  onGetHelp: () => void;
}) {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={() => {/* non-dismissible */}}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.screen}
      >
        <Text style={styles.heading}>Are you safe right now?</Text>
        <Text style={styles.subheading}>
          It's okay if you're not. We want to help.
        </Text>

        <Pressable
          onPress={onSafe}
          style={[styles.btn, styles.btnSafe]}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text style={[styles.btnText, { color: "#fff" }]}>
            Yes, I'm safe
          </Text>
        </Pressable>

        <Pressable
          onPress={onGetHelp}
          style={[styles.btn, styles.btnHelp]}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text style={[styles.btnText, { color: "#fff" }]}>
            No / Not sure — get help
          </Text>
        </Pressable>

        <Text style={styles.contactsHeader}>Crisis contacts</Text>
        {CRISIS_CONTACTS.map((c) => (
          <View key={c.name} style={styles.contactRow}>
            <Text style={styles.contactName}>{c.name}</Text>
            <Text style={styles.contactNumber}>{c.number}</Text>
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
}
