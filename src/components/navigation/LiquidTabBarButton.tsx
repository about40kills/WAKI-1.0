import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { PlatformPressable } from "@react-navigation/elements";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
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
  IOS26_LIQUID_SELECTION,
} from "@/constants/liquidGlassSpring";

const AnimatedView = Animated.View;

/**
 * Tab bar control with iOS 26 Liquid Glass–style layered motion:
 * press compression, selection bloom, environmental gloss on the cell.
 */
export function LiquidTabBarButton(props: BottomTabBarButtonProps) {
  const { style, onPressIn, onPressOut, ...rest } = props;
  const reduceMotion = useReducedMotion();
  const pressPhase = useSharedValue(0);
  const selectionPhase = useSharedValue(1);
  const selected = props.accessibilityState?.selected === true;

  const springIn = reduceMotion ? IOS26_LIQUID_REDUCED : IOS26_LIQUID_PRESS_IN;
  const springOut = reduceMotion ? IOS26_LIQUID_REDUCED : IOS26_LIQUID_RELEASE;
  const springSel = reduceMotion ? IOS26_LIQUID_REDUCED : IOS26_LIQUID_SELECTION;

  useEffect(() => {
    if (reduceMotion) {
      selectionPhase.value = withTiming(selected ? 1.04 : 1, { duration: 180 });
    } else {
      selectionPhase.value = withSpring(selected ? 1.055 : 1, springSel);
    }
  }, [selected, selectionPhase, reduceMotion, springSel]);

  const shellStyle = useAnimatedStyle(() => {
    const pressScale = interpolate(pressPhase.value, [0, 1], [1, 0.9]);
    return {
      transform: [{ scale: pressScale * selectionPhase.value }],
    };
  });

  const glossStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pressPhase.value, [0, 1], [0, 0.22]),
  }));

  return (
    <AnimatedView style={[shellStyle, { flex: 1 }]}>
      <View style={styles.cell}>
        {Platform.OS !== "web" ? (
          <AnimatedView pointerEvents="none" style={[StyleSheet.absoluteFill, styles.gloss, glossStyle]} />
        ) : null}
        <PlatformPressable
          {...rest}
          style={style}
          onPressIn={(e) => {
            if (reduceMotion) {
              pressPhase.value = withTiming(1, { duration: 120 });
            } else {
              pressPhase.value = withSpring(1, springIn);
            }
            void Haptics.selectionAsync();
            onPressIn?.(e);
          }}
          onPressOut={(e) => {
            if (reduceMotion) {
              pressPhase.value = withTiming(0, { duration: 180 });
            } else {
              pressPhase.value = withSpring(0, springOut);
            }
            onPressOut?.(e);
          }}
        />
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 14,
  },
  gloss: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 14,
  },
});
