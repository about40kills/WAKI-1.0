export const LIGHT_COLORS = {
  primary: "#1B5E20",
  primaryLight: "#4CAF50",
  secondary: "#E65100",
  background: "#FAFAF5",
  surface: "#FFFFFF",
  surfaceWarm: "#FFF8E1",
  text: "#212121",
  textMuted: "#616161",
  userBubble: "#E8F5E9",
  error: "#D32F2F",
  crisis: "#B71C1C",
  crisisBg: "#FFEBEE",
};

export const DARK_COLORS: Record<keyof typeof LIGHT_COLORS, string> = {
  primary: "#4CAF50",
  primaryLight: "#81C784",
  secondary: "#FF9800",
  background: "#121212",
  surface: "#1E1E1E",
  surfaceWarm: "#2C2A24",
  text: "#E0E0E0",
  textMuted: "#9E9E9E",
  userBubble: "#1B3020",
  error: "#EF5350",
  crisis: "#EF5350",
  crisisBg: "#3E1616",
};

export type AppColors = typeof LIGHT_COLORS | typeof DARK_COLORS | Record<keyof typeof LIGHT_COLORS, string>;

// Export default LIGHT_COLORS as backwards compat
export const COLORS = LIGHT_COLORS;
