import { useCallback } from "react";
import { Platform, Pressable, type PressableProps, type StyleProp, View, type ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import {
  IOS26_LIQUID_PRESS_IN,
  IOS26_LIQUID_REDUCED,
  IOS26_LIQUID_RELEASE,
} from "@/constants/liquidGlassSpring";
import { LiquidGlassSheen } from "@/components/ui/LiquidGlassSheen";

const AnimatedView = Animated.View;

type LiquidGlassPressableProps = Omit<PressableProps, "children"> & {
  children: React.ReactNode;
  /** Max scale-down at full press (iOS 26 glass “compression”). */
  pressDepth?: number;
  /** Clip sheen to this radius (match GlassSurface). */
  clipRadius?: number;
  /** Styles for the outer spring layer only (not the inner Pressable). */
  wrapperStyle?: StyleProp<ViewStyle>;
};

/**
 * iOS 26 Liquid Glass–style interaction: unified press phase → scale + specular sheen,
 * fluid springs, Soft impact haptic. Respects Reduce Motion.
 */
export function LiquidGlassPressable({
  children,
  onPressIn,
  onPressOut,
  pressDepth = 0.925,
  clipRadius = 999,
  wrapperStyle,
  style,
  ...rest
}: LiquidGlassPressableProps) {
  const reduceMotion = useReducedMotion();
  const pressPhase = useSharedValue(0);

  const springIn = reduceMotion ? IOS26_LIQUID_REDUCED : IOS26_LIQUID_PRESS_IN;
  const springOut = reduceMotion ? IOS26_LIQUID_REDUCED : IOS26_LIQUID_RELEASE;

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(pressPhase.value, [0, 1], [1, pressDepth]),
      },
    ],
  }));

  const handlePressIn = useCallback(
    (e: Parameters<NonNullable<PressableProps["onPressIn"]>>[0]) => {
      if (reduceMotion) {
        pressPhase.value = withTiming(1, { duration: 140 });
      } else {
        pressPhase.value = withSpring(1, springIn);
      }
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      onPressIn?.(e);
    },
    [onPressIn, pressPhase, reduceMotion, springIn]
  );

  const handlePressOut = useCallback(
    (e: Parameters<NonNullable<PressableProps["onPressOut"]>>[0]) => {
      if (reduceMotion) {
        pressPhase.value = withTiming(0, { duration: 200 });
      } else {
        pressPhase.value = withSpring(0, springOut);
      }
      onPressOut?.(e);
    },
    [onPressOut, pressPhase, reduceMotion, springOut]
  );

  return (
    <AnimatedView style={[rStyle, wrapperStyle]}>
      <View style={{ overflow: "hidden", borderRadius: clipRadius, alignSelf: "flex-start" }}>
        {Platform.OS !== "web" && !reduceMotion ? (
          <LiquidGlassSheen progress={pressPhase} />
        ) : null}
        <Pressable {...rest} style={style} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          {children}
        </Pressable>
      </View>
    </AnimatedView>
  );
}
