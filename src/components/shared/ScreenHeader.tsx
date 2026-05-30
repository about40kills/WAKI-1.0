import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Href, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { LiquidGlassPressable } from "@/components/ui/LiquidGlassPressable";

interface ScreenHeaderProps {
  title?: string;
  homeHref?: Href;
}

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    wrap: {
      width: "100%",
      gap: 14,
    },
    glassChip: {
      alignSelf: "flex-start",
    },
    navButtonInner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    navText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
    },
  });
}

export function ScreenHeader({
  title,
  homeHref = "/(tabs)/home",
}: ScreenHeaderProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const canGoBack = typeof router.canGoBack === "function" && router.canGoBack();

  const handleBack = () => {
    if (canGoBack) {
      router.back();
      return;
    }
    router.replace(homeHref);
  };

  return (
    <View style={styles.wrap}>
      <LiquidGlassPressable
        onPress={handleBack}
        pressDepth={0.92}
        clipRadius={999}
        accessibilityRole="button"
        accessibilityLabel={t("nav.back")}
        wrapperStyle={styles.glassChip}
      >
        <GlassSurface intensity={46} borderRadius={999}>
          <View style={styles.navButtonInner}>
            <Ionicons name="chevron-back" size={18} color={colors.text} />
            <Text style={styles.navText}>{t("nav.back")}</Text>
          </View>
        </GlassSurface>
      </LiquidGlassPressable>
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
}
