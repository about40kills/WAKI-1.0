import { Fragment, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Polygon, Polyline, Text as SvgText } from "react-native-svg";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";

const CHART_HEIGHT = 160;
/** Room for localized y-axis labels (e.g. Twi “Mfinimfini”). */
const PADDING_LEFT = 56;
const PADDING_BOTTOM = 24;
const PADDING_TOP = 12;
const GRAPH_HEIGHT = CHART_HEIGHT - PADDING_BOTTOM - PADDING_TOP;

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    empty: {
      height: CHART_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyText: {
      color: colors.textMuted,
      fontSize: 14,
    },
  });
}

export function MoodChart({
  labels,
  points,
  emptyMessage,
  yAxisHigh,
  yAxisMid,
  yAxisLow,
}: {
  labels: string[];
  points: number[];
  emptyMessage: string;
  yAxisHigh: string;
  yAxisMid: string;
  yAxisLow: string;
}) {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  if (points.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 64;
  const graphWidth = chartWidth - PADDING_LEFT;

  const xStep = points.length > 1 ? graphWidth / (points.length - 1) : 0;

  const toX = (i: number) =>
    points.length === 1 ? PADDING_LEFT + graphWidth / 2 : PADDING_LEFT + i * xStep;

  const toY = (val: number) =>
    PADDING_TOP + GRAPH_HEIGHT - ((val - 1) / 9) * GRAPH_HEIGHT;

  const linePts = points.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

  const firstX = toX(0);
  const lastX = toX(points.length - 1);
  const bottomY = PADDING_TOP + GRAPH_HEIGHT;
  const fillPts = `${linePts} ${lastX},${bottomY} ${firstX},${bottomY}`;

  const yAxisRows: { val: number; text: string }[] = [
    { val: 10, text: yAxisHigh },
    { val: 5, text: yAxisMid },
    { val: 1, text: yAxisLow },
  ];

  return (
    <View>
      <Svg width={chartWidth} height={CHART_HEIGHT}>
        {yAxisRows.map(({ val }) => (
          <Line
            key={val}
            x1={PADDING_LEFT}
            y1={toY(val)}
            x2={chartWidth}
            y2={toY(val)}
            stroke={colors.background}
            strokeWidth={1}
          />
        ))}

        {yAxisRows.map(({ val, text }) => (
          <SvgText
            key={`label-${val}`}
            x={PADDING_LEFT - 6}
            y={toY(val) + 4}
            fontSize={10}
            fill={colors.textMuted}
            textAnchor="end"
          >
            {text}
          </SvgText>
        ))}

        {points.length > 1 && (
          <Polygon
            points={fillPts}
            fill={colors.primaryLight}
            fillOpacity={0.15}
          />
        )}

        {points.length > 1 && (
          <Polyline
            points={linePts}
            fill="none"
            stroke={colors.primary}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {points.map((v, i) => (
          <Fragment key={i}>
            <Circle
              cx={toX(i)}
              cy={toY(v)}
              r={4}
              fill={colors.primary}
            />
            <SvgText
              x={toX(i)}
              y={CHART_HEIGHT - 4}
              fontSize={10}
              fill={colors.textMuted}
              textAnchor="middle"
            >
              {labels[i] ?? ""}
            </SvgText>
          </Fragment>
        ))}
      </Svg>
    </View>
  );
}
