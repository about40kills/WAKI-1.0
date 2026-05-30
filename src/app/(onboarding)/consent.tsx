import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { syncAnalyticsConsent } from "@/services/analytics/client";
import { useUserStore } from "@/store/userStore";
import { useLanguage } from "@/hooks/useLanguage";
import type { TranslationKey } from "@/i18n";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

const NOTICES: ReadonlyArray<{
  icon: keyof typeof Ionicons.glyphMap;
  key: TranslationKey;
}> = [
  {
    icon: "chatbubble-ellipses-outline" as const,
    key: "consent.noticeCompanion",
  },
  {
    icon: "shield-checkmark-outline" as const,
    key: "consent.noticePrivacy",
  },
  {
    icon: "call-outline" as const,
    key: "consent.noticeCrisis",
  },
];

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingTop: 40,
      paddingBottom: 40,
      flexGrow: 1,
    },
    topIcon: { alignSelf: "center", marginBottom: 16 },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 28,
    },
    notices: { gap: 14, marginBottom: 28 },
    noticeRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
    },
    noticeIcon: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    noticeText: {
      flex: 1,
      fontSize: 14,
      color: colors.textMuted,
      lineHeight: 20,
    },
    toggleCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 12,
    },
    toggleTextWrap: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    toggleLabelWrap: { flex: 1, gap: 2 },
    toggleLabel: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    toggleHint: {
      fontSize: 12,
      color: colors.textMuted,
      lineHeight: 16,
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      marginTop: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    btnDisabled: { backgroundColor: colors.textMuted, shadowOpacity: 0 },
    btnPressed: { opacity: 0.88 },
    btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  });
}

export default function ConsentScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const [consentLocal, setLocal] = useState(true);
  const [consentTrain, setTrain] = useState(false);

  const setConsentLocalStore = useUserStore((s) => s.setConsentLocal);
  const setConsentTrainStore = useUserStore((s) => s.setConsentTrain);

  const thumbOff = colors.surface;

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons name="document-text-outline" size={48} color={colors.primary} style={styles.topIcon} />
        <Text style={styles.title}>{t("consent.title")}</Text>

        <View style={styles.notices}>
          {NOTICES.map((n, i) => (
            <View key={i} style={styles.noticeRow}>
              <View style={styles.noticeIcon}>
                <Ionicons name={n.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.noticeText}>{t(n.key)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.toggleCard}>
          <View style={styles.toggleTextWrap}>
            <Ionicons name="phone-portrait-outline" size={18} color={colors.text} />
            <View style={styles.toggleLabelWrap}>
              <Text style={styles.toggleLabel}>{t("consent.toggleLocal")}</Text>
              <Text style={styles.toggleHint}>{t("consent.toggleLocalHint")}</Text>
            </View>
          </View>
          <Switch
            value={consentLocal}
            onValueChange={setLocal}
            trackColor={{ true: colors.primaryLight, false: colors.textMuted }}
            thumbColor={consentLocal ? colors.primary : thumbOff}
          />
        </View>

        <View style={styles.toggleCard}>
          <View style={styles.toggleTextWrap}>
            <Ionicons name="analytics-outline" size={18} color={colors.text} />
            <View style={styles.toggleLabelWrap}>
              <Text style={styles.toggleLabel}>{t("consent.toggleTrain")}</Text>
              <Text style={styles.toggleHint}>{t("consent.toggleTrainHint")}</Text>
            </View>
          </View>
          <Switch
            value={consentTrain}
            onValueChange={setTrain}
            trackColor={{ true: colors.primaryLight, false: colors.textMuted }}
            thumbColor={consentTrain ? colors.primary : thumbOff}
          />
        </View>

        <Pressable
          onPress={async () => {
            await setConsentLocalStore(consentLocal);
            await setConsentTrainStore(consentTrain);
            await syncAnalyticsConsent(consentTrain);
            router.push("/(onboarding)/first-checkin");
          }}
          style={({ pressed }) => [
            styles.btn,
            !consentLocal && styles.btnDisabled,
            pressed && consentLocal && styles.btnPressed,
          ]}
          disabled={!consentLocal}
        >
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={styles.btnText}>{t("consent.cta")}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
