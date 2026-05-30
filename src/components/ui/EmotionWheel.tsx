import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EMOTIONS } from "@/constants/emotions";
import type { AppColors } from "@/constants/colors";
import { useThemeColors } from "@/theme/ThemeProvider";
import type { LanguageCode } from "@/types/language";
import { localizedContent } from "@/utils/localizedContent";

function getStyles(colors: AppColors) {
  return StyleSheet.create({
    wrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    pill: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1.5,
      borderColor: colors.textMuted,
      backgroundColor: colors.surface,
    },
    pillSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    label: {
      fontSize: 14,
      color: colors.text,
      fontWeight: "500",
    },
    labelSelected: {
      color: "#fff",
      fontWeight: "700",
    },
  });
}

export function EmotionWheel({
  languageCode,
  onPick,
}: {
  languageCode: LanguageCode;
  onPick: (id: string, label: string) => void;
}) {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const [selected, setSelected] = useState<string>("");

  return (
    <View style={styles.wrap}>
      {EMOTIONS.map((emotion) => {
        const isSelected = selected === emotion.id;
        return (
          <Pressable
            key={emotion.id}
            onPress={() => {
              setSelected(emotion.id);
              onPick(emotion.id, localizedContent(emotion.label, languageCode));
            }}
            style={[styles.pill, isSelected && styles.pillSelected]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {localizedContent(emotion.label, languageCode)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
