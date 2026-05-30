import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";
import { useThemeMode } from "@/theme/ThemeProvider";

/** Tab bar: system chrome material tuned for light / dark appearance. */
export function LiquidTabBarBackground() {
  const { isDark } = useThemeMode();

  if (Platform.OS === "android") {
    const bg = isDark ? "rgba(18, 18, 18, 0.97)" : "rgba(245, 245, 245, 0.97)";
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: bg }]} />;
  }

  if (Platform.OS === "web") {
    const bg = isDark ? "rgba(30, 30, 30, 0.82)" : "rgba(255, 255, 255, 0.78)";
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: bg }]} />;
  }

  const tint = isDark ? "systemChromeMaterialDark" : "systemChromeMaterialLight";

  return (
    <BlurView
      intensity={48}
      tint={tint}
      style={StyleSheet.absoluteFill}
    />
  );
}

/** Navigation header: ultra-thin material stack behind title. */
export function LiquidHeaderBackground() {
  const { isDark, colors } = useThemeMode();

  if (Platform.OS === "android") {
    const bg = isDark ? "rgba(18, 18, 18, 0.97)" : "rgba(250, 250, 250, 0.97)";
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: bg }]} />;
  }

  if (Platform.OS === "web") {
    const hex = colors.background.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const bg = isDark
      ? `rgba(${r},${g},${b},0.92)`
      : `rgba(${Math.min(255, r + 8)},${Math.min(255, g + 8)},${Math.min(255, b + 8)},0.88)`;
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: bg }]} />;
  }

  const tint = isDark ? "systemUltraThinMaterialDark" : "systemUltraThinMaterialLight";

  return (
    <BlurView
      intensity={38}
      tint={tint}
      style={StyleSheet.absoluteFill}
    />
  );
}
