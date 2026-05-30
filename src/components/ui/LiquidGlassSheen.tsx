import { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedView = Animated.View;

type LiquidGlassSheenProps = {
  /** 0 = idle, 1 = fully pressed — drives specular sweep + opacity. */
  progress: SharedValue<number>;
};

/**
 * Specular “environmental” highlight sweep (iOS 26 Liquid Glass–style).
 * Diagonal gradient ribbon that shifts with press depth — not a flat opacity fade.
 */
export function LiquidGlassSheen({ progress }: LiquidGlassSheenProps) {
  const gradId = useMemo(() => `lg-sheen-${Math.random().toString(36).slice(2, 11)}`, []);

  if (Platform.OS === "web") {
    return null;
  }

  const ribbonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.35, 1], [0, 0.4, 0.72], Extrapolation.CLAMP),
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [-36, 36], Extrapolation.CLAMP) },
      { translateY: interpolate(progress.value, [0, 1], [4, -4], Extrapolation.CLAMP) },
      { rotate: "-42deg" },
    ],
  }));

  return (
    <AnimatedView
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.clip, ribbonStyle]}
    >
      <Svg width="120%" height="120%" style={styles.svg}>
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <Stop offset="0.42" stopColor="#ffffff" stopOpacity="0.22" />
            <Stop offset="0.5" stopColor="#ffffff" stopOpacity="0.5" />
            <Stop offset="0.58" stopColor="#ffffff" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${gradId})`} />
      </Svg>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  clip: {
    overflow: "hidden",
  },
  svg: {
    position: "absolute",
    left: "-10%",
    top: "-10%",
  },
});
