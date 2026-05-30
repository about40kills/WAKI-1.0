import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.78)",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.error,
      marginBottom: 16,
    },
    timer: {
      fontSize: 48,
      fontWeight: "700",
      color: "#fff",
      fontVariant: ["tabular-nums"],
      marginBottom: 12,
    },
    hint: {
      fontSize: 16,
      color: "rgba(255,255,255,0.65)",
    },
  });
}

export function VoiceInputOverlay({ visible }: { visible: boolean }) {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const [seconds, setSeconds] = useState(0);
  const dotOpacity = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (!visible) {
      setSeconds(0);
      pulseLoop.current?.stop();
      return;
    }

    setSeconds(0);
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(dotOpacity, { toValue: 0.2, duration: 600, useNativeDriver: true }),
        Animated.timing(dotOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    pulseLoop.current.start();

    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(interval);
      pulseLoop.current?.stop();
    };
  }, [visible, dotOpacity]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.dot, { opacity: dotOpacity }]} />
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <Text style={styles.hint}>Release to send</Text>
    </View>
  );
}
