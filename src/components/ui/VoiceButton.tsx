import { useEffect, useMemo, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

const SIZE = 96;
const RADIUS = SIZE / 2;

function getRingStyle(colors: AppColors) {
  return StyleSheet.create({
    wrapper: {
      width: SIZE,
      height: SIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    ring: {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      borderRadius: RADIUS,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    btn: {
      width: SIZE,
      height: SIZE,
      borderRadius: RADIUS,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
  });
}

export function VoiceButton({
  isRecording,
  isProcessing,
  disabled = false,
  onPressIn,
  onPressOut,
}: {
  isRecording: boolean;
  isProcessing: boolean;
  disabled?: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
}) {
  const colors = useThemeColors();
  const styles = useMemo(() => getRingStyle(colors), [colors]);
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.5)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);
  const spinLoop = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    pulseLoop.current?.stop();
    spinLoop.current?.stop();
    pulseScale.setValue(1);
    pulseOpacity.setValue(0.5);
    spinAnim.setValue(0);

    if (!isRecording && !isProcessing && !disabled) {
      pulseLoop.current = Animated.loop(
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1.5,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.current.start();
    } else if (isProcessing) {
      spinLoop.current = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        })
      );
      spinLoop.current.start();
    }

    return () => {
      pulseLoop.current?.stop();
      spinLoop.current?.stop();
    };
  }, [disabled, isRecording, isProcessing, pulseScale, pulseOpacity, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const bgColor = disabled ? colors.textMuted : isRecording ? colors.error : colors.primary;

  const iconName: keyof typeof Ionicons.glyphMap = isProcessing
    ? "sync"
    : isRecording
    ? "stop"
    : "mic";

  return (
    <View style={styles.wrapper}>
      {!isRecording && !isProcessing && (
        <Animated.View
          style={[
            styles.ring,
            { transform: [{ scale: pulseScale }], opacity: pulseOpacity },
          ]}
        />
      )}

      <Pressable
        disabled={disabled}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.btn, { backgroundColor: bgColor }]}
      >
        <Animated.View style={isProcessing ? { transform: [{ rotate: spin }] } : undefined}>
          <Ionicons name={iconName} size={32} color="#fff" />
        </Animated.View>
      </Pressable>
    </View>
  );
}
