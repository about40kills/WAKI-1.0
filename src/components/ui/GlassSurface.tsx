import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useThemeMode } from "@/theme/ThemeProvider";

type GlassSurfaceProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Blur strength (iOS uses as-is; Android is tuned via blurReductionFactor). */
  intensity?: number;
  borderRadius?: number;
  tint?: any;
  webFallbackColor?: string;
};

function shellStyle(isDark: boolean): ViewStyle {
  return {
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(255, 255, 255, 0.55)",
    borderTopColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(255, 255, 255, 0.82)",
    borderBottomColor: isDark ? "rgba(0,0,0,0.35)" : "rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.35 : 0.09,
    shadowRadius: 10,
    elevation: 4,
  };
}

/**
 * Frosted “liquid glass” chip — BlurView on native, translucent fallback on web.
 */
export function GlassSurface({
  children,
  style,
  intensity = 48,
  borderRadius = 999,
  tint,
  webFallbackColor,
}: GlassSurfaceProps) {
  const { isDark } = useThemeMode();
  const defaultWebFallback = isDark ? "rgba(40, 40, 40, 0.72)" : "rgba(255, 255, 255, 0.72)";
  const webFallback = webFallbackColor ?? defaultWebFallback;
  const defaultTint =
    Platform.OS === "ios"
      ? isDark
        ? "systemThinMaterialDark"
        : "systemThinMaterialLight"
      : isDark
        ? "dark"
        : "light";
  
  const activeTint = tint ?? defaultTint;

  if (Platform.OS === "web") {
    return (
      <View style={[shellStyle(isDark), { borderRadius, backgroundColor: webFallback }, style]}>
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={Platform.OS === "ios" ? intensity : 78}
      tint={activeTint}
      experimentalBlurMethod={Platform.OS === "android" ? "dimezisBlurView" : undefined}
      blurReductionFactor={Platform.OS === "android" ? 3.2 : undefined}
      style={[shellStyle(isDark), { borderRadius }, style]}
    >
      {children}
    </BlurView>
  );
}
