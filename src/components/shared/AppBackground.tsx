import { useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeMode } from "@/theme/ThemeProvider";
/** Outline icons only — soft tints, no sharp contrast. */
const GRID_ICONS = [
  "leaf-outline",
  "flower-outline",
  "moon-outline",
  "body-outline",
  "sparkles-outline",
  "happy-outline",
  "water-outline",
  "heart-outline",
  "sunny-outline",
  "cloud-outline",
  "rose-outline",
  "planet-outline",
  "nutrition-outline",
  "bandage-outline",
  "hand-left-outline",
] as const;

function mixColor(isDark: boolean, hash: number, baseOpacity: number): string {
  const o = baseOpacity + (hash % 5) * 0.006;
  if (isDark) {
    if (hash % 3 === 0) return `rgba(255, 152, 0, ${Math.min(0.11, o + 0.035)})`;
    if (hash % 3 === 1) return `rgba(129, 199, 132, ${Math.min(0.11, o + 0.035)})`;
    return `rgba(224, 224, 224, ${Math.min(0.09, o + 0.028)})`;
  }
  if (hash % 3 === 0) return `rgba(230, 81, 0, ${Math.min(0.14, o + 0.02)})`;
  if (hash % 3 === 1) return `rgba(76, 175, 80, ${Math.min(0.14, o + 0.02)})`;
  return `rgba(27, 94, 32, ${Math.min(0.14, o + 0.03)})`;
}

export function AppBackground() {
  const { width, height } = useWindowDimensions();
  const { colors, isDark } = useThemeMode();

  const edgeAccents = useMemo((): {
    name: (typeof GRID_ICONS)[number];
    size: number;
    top: number;
    left: number;
    opacity: number;
    rotate: string;
  }[] => {
    const w = width;
    const h = height;
    const edgeOpacity = isDark ? 0.07 : 0.045;
    return [
      { name: "leaf-outline", size: 140, top: h * 0.04, left: -w * 0.06, opacity: edgeOpacity, rotate: "-12deg" },
      { name: "flower-outline", size: 110, top: h * 0.18, left: w * 0.78, opacity: edgeOpacity + 0.008, rotate: "10deg" },
      { name: "water-outline", size: 100, top: h * 0.52, left: -w * 0.04, opacity: edgeOpacity - 0.005, rotate: "-6deg" },
      { name: "sparkles-outline", size: 90, top: h * 0.68, left: w * 0.82, opacity: edgeOpacity + 0.012, rotate: "14deg" },
      { name: "moon-outline", size: 75, top: h * 0.38, left: w * 0.08, opacity: edgeOpacity - 0.005, rotate: "18deg" },
      { name: "heart-outline", size: 85, top: h * 0.86, left: w * 0.12, opacity: edgeOpacity, rotate: "-10deg" },
      { name: "body-outline", size: 95, top: h * 0.08, left: w * 0.58, opacity: edgeOpacity - 0.01, rotate: "8deg" },
      { name: "cloud-outline", size: 120, top: h * 0.44, left: w * 0.72, opacity: edgeOpacity - 0.005, rotate: "-4deg" },
    ];
  }, [width, height, isDark]);

  const gridItems = useMemo(() => {
    const step = 28;
    const items: {
      key: string;
      name: (typeof GRID_ICONS)[number];
      left: number;
      top: number;
      size: number;
      color: string;
      rotate: string;
    }[] = [];

    const maxW = width + 60;
    const maxH = height + 120;
    let row = 0;
    const baseOp = isDark ? 0.055 : 0.045;
    for (let top = -24; top < maxH; top += step, row++) {
      let col = 0;
      for (let left = -20; left < maxW; left += step, col++) {
        if ((row + col) % 2 !== 0) continue;

        const hash = row * 7919 + col * 104729;
        const name = GRID_ICONS[Math.abs(hash) % GRID_ICONS.length];
        const size = 16 + (Math.abs(hash >> 2) % 6) * 3;
        const rotate = `${((hash % 27) - 13)}deg`;
        const jitterX = (hash % 9) - 4;
        const jitterY = ((hash >> 4) % 9) - 4;

        items.push({
          key: `g-${row}-${col}`,
          name,
          left: left + jitterX,
          top: top + jitterY,
          size,
          color: mixColor(isDark, Math.abs(hash), baseOp),
          rotate,
        });

        if (items.length >= 400) return items;
      }
    }
    return items;
  }, [width, height, isDark]);

  const edgeIconColor = isDark ? colors.textMuted : colors.primary;

  return (
    <View pointerEvents="none" style={styles.wrap} accessible={false}>
      {edgeAccents.map((a, i) => (
        <View
          key={`edge-${i}`}
          style={[
            styles.edgeWrap,
            {
              top: a.top,
              left: a.left,
              opacity: a.opacity,
              transform: [{ rotate: a.rotate }],
            },
          ]}
        >
          <Ionicons name={a.name} size={a.size} color={edgeIconColor} />
        </View>
      ))}
      {gridItems.map((item) => (
        <Ionicons
          key={item.key}
          name={item.name}
          size={item.size}
          color={item.color}
          style={[
            styles.gridIcon,
            {
              left: item.left,
              top: item.top,
              transform: [{ rotate: item.rotate }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  edgeWrap: {
    position: "absolute",
  },
  gridIcon: {
    position: "absolute",
  },
});
