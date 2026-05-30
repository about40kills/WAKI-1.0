import type { Ionicons } from "@expo/vector-icons";
import type { CopingToolCategory } from "@/constants/copingTools";

/** Outline icons for list cards; filled for detail headers. */
export const COPING_TOOL_ICONS: Record<
  CopingToolCategory,
  { outline: keyof typeof Ionicons.glyphMap; filled: keyof typeof Ionicons.glyphMap }
> = {
  grounding: { outline: "leaf-outline", filled: "leaf" },
  breathing: { outline: "cloud-outline", filled: "cloud" },
  body: { outline: "body-outline", filled: "body" },
  comfort: { outline: "heart-outline", filled: "heart" },
};
