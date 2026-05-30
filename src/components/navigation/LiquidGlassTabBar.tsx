import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type PanResponderGestureState,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import {
  BottomTabBarHeightCallbackContext,
  type BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { getLabel } from "@react-navigation/elements";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { LiquidGlassSheen } from "@/components/ui/LiquidGlassSheen";
import { LiquidTabBarBackground } from "@/components/navigation/LiquidChrome";
import {
  IOS26_LIQUID_PRESS_IN,
  IOS26_LIQUID_REDUCED,
  IOS26_LIQUID_SELECTION,
} from "@/constants/liquidGlassSpring";
import { useThemeColors, useThemeMode } from "@/theme/ThemeProvider";

const AnimatedView = Animated.View;

const TAB_ICON_SIZE = 24;
const CAPSULE_INSET_X = 3;
const CAPSULE_INSET_Y = 3;
const CAPSULE_HIT_SLOP = 12;
const CAPSULE_STRETCH = 18;

type Rect = { x: number; y: number; width: number; height: number };
type CapsuleFrame = { left: number; top: number; width: number; height: number };
type TabGeom = Partial<{ tab: Rect }>;
type IndexedFrame = { index: number; frame: CapsuleFrame };

function rect(e: LayoutChangeEvent): Rect {
  const { x, y, width, height } = e.nativeEvent.layout;
  return { x, y, width, height };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function frameCenter(frame: CapsuleFrame): number {
  return frame.left + frame.width / 2;
}

function capsuleFrame(geom: TabGeom): CapsuleFrame | null {
  const { tab } = geom;
  if (!tab) return null;

  return {
    left: tab.x + CAPSULE_INSET_X,
    top: tab.y + CAPSULE_INSET_Y,
    width: Math.max(0, tab.width - CAPSULE_INSET_X * 2),
    height: Math.max(0, tab.height - CAPSULE_INSET_Y * 2),
  };
}

function nearestFrameIndex(frames: IndexedFrame[], center: number): number | null {
  if (!frames.length) return null;

  let winner = frames[0];
  let bestDistance = Math.abs(frameCenter(winner.frame) - center);

  for (const candidate of frames.slice(1)) {
    const distance = Math.abs(frameCenter(candidate.frame) - center);
    if (distance < bestDistance) {
      winner = candidate;
      bestDistance = distance;
    }
  }

  return winner.index;
}

function interpolateFrame(frames: IndexedFrame[], center: number): CapsuleFrame | null {
  if (!frames.length) return null;
  if (frames.length === 1) return frames[0].frame;

  const first = frames[0].frame;
  const last = frames[frames.length - 1].frame;
  const minLeft = first.left;
  const maxRight = last.left + last.width;

  if (center <= frameCenter(first)) {
    return { ...first };
  }

  if (center >= frameCenter(last)) {
    return { ...last };
  }

  for (let index = 0; index < frames.length - 1; index += 1) {
    const leftFrame = frames[index].frame;
    const rightFrame = frames[index + 1].frame;
    const leftCenter = frameCenter(leftFrame);
    const rightCenter = frameCenter(rightFrame);

    if (center <= rightCenter) {
      const progress = clamp((center - leftCenter) / (rightCenter - leftCenter), 0, 1);
      const stretch = Math.sin(progress * Math.PI) * CAPSULE_STRETCH;
      const width = lerp(leftFrame.width, rightFrame.width, progress) + stretch;
      const height = lerp(leftFrame.height, rightFrame.height, progress);
      const top = lerp(leftFrame.top, rightFrame.top, progress);
      const left = clamp(center - width / 2, minLeft, maxRight - width);

      return { left, top, width, height };
    }
  }

  return { ...last };
}

function useKeyboardShown(): boolean {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const show = Keyboard.addListener(showEvt, () => setShown(true));
    const hide = Keyboard.addListener(hideEvt, () => setShown(false));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return shown;
}

export function LiquidGlassTabBar({
  state,
  navigation,
  descriptors,
  insets,
}: BottomTabBarProps) {
  const themeColors = useThemeColors();
  const { isDark } = useThemeMode();
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext);
  const reduceMotion = useReducedMotion();
  const keyboardShown = useKeyboardShown();

  const focusedRoute = state.routes[state.index];
  const focusedOptions = descriptors[focusedRoute.key].options;
  const {
    tabBarActiveTintColor = themeColors.primary,
    tabBarInactiveTintColor = themeColors.textMuted,
    tabBarHideOnKeyboard = false,
  } = focusedOptions;

  const shouldShowTabBar = !(tabBarHideOnKeyboard && keyboardShown);

  const [geom, setGeom] = useState<TabGeom[]>(() => state.routes.map(() => ({})));
  const [dragPreviewIndex, setDragPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    setGeom((prev) => {
      if (prev.length === state.routes.length) return prev;
      return state.routes.map((_, index) => prev[index] ?? {});
    });
  }, [state.routes.length]);

  const setGeomPart = useCallback((index: number, r: Rect) => {
    setGeom((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], tab: r };
      return next;
    });
  }, []);

  const frames = useMemo<IndexedFrame[]>(
    () =>
      geom
        .map((entry, index) => {
          const frame = capsuleFrame(entry);
          return frame ? { index, frame } : null;
        })
        .filter((value): value is IndexedFrame => value !== null),
    [geom]
  );

  const frameMap = useMemo(() => {
    const map = new Map<number, CapsuleFrame>();
    for (const entry of frames) {
      map.set(entry.index, entry.frame);
    }
    return map;
  }, [frames]);

  const currentFrameRef = useRef<CapsuleFrame | null>(null);
  const activeIndexRef = useRef(state.index);
  const framesRef = useRef(frames);
  const dragRef = useRef<{
    startCenter: number;
    previewIndex: number;
    dragging: boolean;
  } | null>(null);

  useEffect(() => {
    activeIndexRef.current = state.index;
  }, [state.index]);

  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);

  const capsuleLeft = useSharedValue(0);
  const capsuleTop = useSharedValue(0);
  const capsuleWidth = useSharedValue(0);
  const capsuleHeight = useSharedValue(0);
  const capsuleOpacity = useSharedValue(0);
  const capsuleScaleX = useSharedValue(1);
  const capsuleScaleY = useSharedValue(1);
  const sheenPulse = useSharedValue(0);

  const springSel = reduceMotion ? IOS26_LIQUID_REDUCED : IOS26_LIQUID_SELECTION;

  const animateCapsuleTo = useCallback(
    (frame: CapsuleFrame, immediate = false) => {
      const previous = currentFrameRef.current;
      currentFrameRef.current = frame;

      const distance = previous ? Math.abs(frameCenter(frame) - frameCenter(previous)) : 0;
      const stretchBoost = Math.min(0.08, distance / 560);
      const squashBoost = Math.min(0.06, distance / 700);

      if (immediate) {
        capsuleLeft.value = frame.left;
        capsuleTop.value = frame.top;
        capsuleWidth.value = frame.width;
        capsuleHeight.value = frame.height;
        capsuleOpacity.value = 1;
        capsuleScaleX.value = 1;
        capsuleScaleY.value = 1;
        return;
      }

      if (reduceMotion) {
        capsuleLeft.value = withTiming(frame.left, { duration: 180 });
        capsuleTop.value = withTiming(frame.top, { duration: 180 });
        capsuleWidth.value = withTiming(frame.width, { duration: 180 });
        capsuleHeight.value = withTiming(frame.height, { duration: 180 });
        capsuleOpacity.value = withTiming(1, { duration: 150 });
        capsuleScaleX.value = withTiming(1, { duration: 160 });
        capsuleScaleY.value = withTiming(1, { duration: 160 });
        return;
      }

      capsuleLeft.value = withSpring(frame.left, springSel);
      capsuleTop.value = withSpring(frame.top, springSel);
      capsuleWidth.value = withSpring(frame.width, springSel);
      capsuleHeight.value = withSpring(frame.height, springSel);
      capsuleOpacity.value = withSpring(1, springSel);

      if (previous) {
        capsuleScaleX.value = withSequence(
          withSpring(1.03 + stretchBoost, IOS26_LIQUID_PRESS_IN),
          withSpring(1, IOS26_LIQUID_SELECTION)
        );
        capsuleScaleY.value = withSequence(
          withSpring(0.985 - squashBoost, IOS26_LIQUID_PRESS_IN),
          withSpring(1, IOS26_LIQUID_SELECTION)
        );
      } else {
        capsuleScaleX.value = 1;
        capsuleScaleY.value = 1;
      }
    },
    [
      capsuleHeight,
      capsuleLeft,
      capsuleOpacity,
      capsuleScaleX,
      capsuleScaleY,
      capsuleTop,
      capsuleWidth,
      reduceMotion,
      springSel,
    ]
  );

  useEffect(() => {
    const nextFrame = frameMap.get(state.index);
    if (!nextFrame || dragRef.current?.dragging) return;
    animateCapsuleTo(nextFrame, currentFrameRef.current == null);
  }, [animateCapsuleTo, frameMap, state.index]);

  useEffect(() => {
    if (reduceMotion) {
      sheenPulse.value = 0;
      return;
    }

    if (dragRef.current?.dragging) {
      sheenPulse.value = withTiming(0.82, { duration: 110 });
      return;
    }

    sheenPulse.value = withSequence(
      withTiming(0.62, { duration: 160 }),
      withSpring(0, IOS26_LIQUID_SELECTION)
    );
  }, [reduceMotion, sheenPulse, state.index]);

  const capsuleStyle = useAnimatedStyle(() => ({
    opacity: capsuleOpacity.value,
    left: capsuleLeft.value,
    top: capsuleTop.value,
    width: capsuleWidth.value,
    height: capsuleHeight.value,
    transform: [{ scaleX: capsuleScaleX.value }, { scaleY: capsuleScaleY.value }],
  }));

  const navigateToIndex = useCallback(
    (index: number) => {
      const route = state.routes[index];
      const focused = activeIndexRef.current === index;
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        void Haptics.selectionAsync();
        navigation.dispatch({
          ...CommonActions.navigate(route),
          target: state.key,
        });
      }
    },
    [navigation, state.key, state.routes]
  );

  const settleDrag = useCallback(
    (cancelled: boolean) => {
      const drag = dragRef.current;
      dragRef.current = null;

      const targetIndex = cancelled ? activeIndexRef.current : drag?.previewIndex ?? activeIndexRef.current;
      const targetFrame = framesRef.current.find((entry) => entry.index === targetIndex)?.frame;

      setDragPreviewIndex(null);
      sheenPulse.value = reduceMotion
        ? 0
        : withSequence(
            withTiming(0.34, { duration: 110 }),
            withSpring(0, IOS26_LIQUID_SELECTION)
          );

      if (targetFrame) {
        animateCapsuleTo(targetFrame);
      }

      if (!cancelled && targetIndex !== activeIndexRef.current) {
        navigateToIndex(targetIndex);
      }
    },
    [animateCapsuleTo, navigateToIndex, reduceMotion, sheenPulse]
  );

  const handleDragMove = useCallback(
    (_event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const drag = dragRef.current;
      if (!drag) return;

      const center = drag.startCenter + gestureState.dx;
      const nextFrame = interpolateFrame(framesRef.current, center);
      if (!nextFrame) return;

      currentFrameRef.current = nextFrame;
      capsuleLeft.value = nextFrame.left;
      capsuleTop.value = nextFrame.top;
      capsuleWidth.value = nextFrame.width;
      capsuleHeight.value = nextFrame.height;
      capsuleOpacity.value = 1;

      if (!reduceMotion) {
        const speed = Math.min(1, Math.abs(gestureState.vx));
        capsuleScaleX.value = 1.01 + speed * 0.05;
        capsuleScaleY.value = 0.99 - speed * 0.04;
        sheenPulse.value = clamp(0.38 + speed * 0.34, 0, 0.92);
      }

      const nextIndex = nearestFrameIndex(framesRef.current, frameCenter(nextFrame));
      if (nextIndex != null && nextIndex !== drag.previewIndex) {
        drag.previewIndex = nextIndex;
        setDragPreviewIndex(nextIndex);
        void Haptics.selectionAsync();
      }
    },
    [
      capsuleHeight,
      capsuleLeft,
      capsuleOpacity,
      capsuleScaleX,
      capsuleScaleY,
      capsuleTop,
      capsuleWidth,
      reduceMotion,
      sheenPulse,
    ]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (event) => {
          if (!shouldShowTabBar) return false;

          const frame = currentFrameRef.current;
          if (!frame) return false;

          const { locationX, locationY } = event.nativeEvent;
          return (
            locationX >= frame.left - CAPSULE_HIT_SLOP &&
            locationX <= frame.left + frame.width + CAPSULE_HIT_SLOP &&
            locationY >= frame.top - CAPSULE_HIT_SLOP &&
            locationY <= frame.top + frame.height + CAPSULE_HIT_SLOP
          );
        },
        onMoveShouldSetPanResponder: () => Boolean(dragRef.current),
        onPanResponderGrant: () => {
          const frame = currentFrameRef.current ?? frameMap.get(activeIndexRef.current);
          if (!frame) return;

          dragRef.current = {
            startCenter: frameCenter(frame),
            previewIndex: activeIndexRef.current,
            dragging: true,
          };
          setDragPreviewIndex(activeIndexRef.current);

          if (reduceMotion) return;

          capsuleScaleX.value = withSpring(1.02, IOS26_LIQUID_PRESS_IN);
          capsuleScaleY.value = withSpring(0.985, IOS26_LIQUID_PRESS_IN);
          sheenPulse.value = withTiming(0.82, { duration: 110 });
        },
        onPanResponderMove: handleDragMove,
        onPanResponderRelease: () => settleDrag(false),
        onPanResponderTerminate: () => settleDrag(true),
        onPanResponderTerminationRequest: () => true,
      }),
    [
      capsuleScaleX,
      capsuleScaleY,
      frameMap,
      handleDragMove,
      reduceMotion,
      settleDrag,
      sheenPulse,
      shouldShowTabBar,
    ]
  );

  const onBarLayout = useCallback(
    (e: LayoutChangeEvent) => {
      onHeightChange?.(e.nativeEvent.layout.height);
    },
    [onHeightChange]
  );

  const visualIndex = dragPreviewIndex ?? state.index;

  return (
    <View
      style={[
        styles.barRoot,
        {
          paddingBottom: insets.bottom,
          opacity: shouldShowTabBar ? 1 : 0,
          height: shouldShowTabBar ? undefined : 0,
          overflow: shouldShowTabBar ? "visible" : "hidden",
          borderTopColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.48)",
        },
      ]}
      onLayout={onBarLayout}
      pointerEvents={shouldShowTabBar ? "auto" : "none"}
    >
      <View
        style={[
          styles.trackShell,
          {
            borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.66)",
            shadowOpacity: isDark ? 0.24 : 0.1,
          },
        ]}
      >
        <View style={styles.barBackground} pointerEvents="none">
          <LiquidTabBarBackground />
        </View>

        <View style={styles.track} role="tablist" {...panResponder.panHandlers}>
          <AnimatedView style={[styles.capsuleWrap, capsuleStyle]} pointerEvents="none">
            <View style={styles.capsuleClip}>
              <GlassSurface
                intensity={22}
                tint={isDark ? "systemUltraThinMaterialDark" : "systemUltraThinMaterialLight"}
                webFallbackColor={isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)"}
                borderRadius={999}
                style={[
                  styles.capsuleGlass,
                  {
                    borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.48)",
                    borderTopColor: isDark ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.72)",
                    borderBottomColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(96,109,131,0.08)",
                    shadowOpacity: isDark ? 0.12 : 0.06,
                  },
                ]}
              >
                <View
                  style={[
                    styles.capsuleFill,
                    {
                      backgroundColor: "transparent",
                    },
                  ]}
                />
                <View
                  style={[
                    styles.capsuleBloomLeft,
                    {
                      backgroundColor: tabBarActiveTintColor,
                      opacity: isDark ? 0.04 : 0.02,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.capsuleBloomRight,
                    {
                      backgroundColor: themeColors.secondary,
                      opacity: isDark ? 0.03 : 0.015,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.capsuleEdgeTop,
                    {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.34)",
                    },
                  ]}
                />
                <View
                  style={[
                    styles.capsuleEdgeBottom,
                    {
                      backgroundColor: isDark
                        ? "rgba(0,0,0,0.08)"
                        : "rgba(123,140,170,0.04)",
                    },
                  ]}
                />
              </GlassSurface>
              {Platform.OS !== "web" && !reduceMotion ? (
                <LiquidGlassSheen progress={sheenPulse} />
              ) : null}
            </View>
          </AnimatedView>

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const focused = visualIndex === index;
            const labelString = getLabel(
              {
                label: typeof options.tabBarLabel === "string" ? options.tabBarLabel : undefined,
                title: options.title,
              },
              route.name
            );
            const color = focused ? tabBarActiveTintColor : tabBarInactiveTintColor;
            const iconEl = options.tabBarIcon?.({
              focused,
              color,
              size: TAB_ICON_SIZE,
            });

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: state.index === index }}
                onPress={() => navigateToIndex(index)}
                onLongPress={() =>
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                  })
                }
                style={styles.tabSlot}
                onLayout={(e) => setGeomPart(index, rect(e))}
              >
                <View style={styles.tabInner}>
                  <View style={styles.iconWrap}>{iconEl}</View>
                  <Text style={[styles.label, { color }]} numberOfLines={1} allowFontScaling>
                    {labelString}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barRoot: {
    backgroundColor: "transparent",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  trackShell: {
    borderRadius: 34,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 8,
  },
  barBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  track: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "stretch",
    position: "relative",
    padding: 2,
  },
  capsuleWrap: {
    position: "absolute",
    zIndex: 0,
  },
  capsuleClip: {
    flex: 1,
    borderRadius: 999,
    overflow: "hidden",
  },
  capsuleGlass: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 22,
  },
  capsuleFill: {
    ...StyleSheet.absoluteFillObject,
  },
  capsuleBloomLeft: {
    position: "absolute",
    width: 84,
    height: 84,
    borderRadius: 42,
    left: -14,
    top: -24,
  },
  capsuleBloomRight: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    right: -18,
    bottom: -28,
  },
  capsuleEdgeTop: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 4,
    height: 1,
    borderRadius: 1,
  },
  capsuleEdgeBottom: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 4,
    height: 1,
    borderRadius: 1,
  },
  tabSlot: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabInner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    gap: 4,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: TAB_ICON_SIZE,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.15,
  },
});
