import { useColorScheme } from "react-native";
import { useUserStore } from "@/store/userStore";
import { LIGHT_COLORS, DARK_COLORS, type AppColors } from "@/constants/colors";

export function useThemeResolution(): { colors: AppColors; isDark: boolean } {
  const systemTheme = useColorScheme();
  const themePreference = useUserStore((s) => s.theme);
  const isDark =
    themePreference === "dark"
      ? true
      : themePreference === "light"
        ? false
        : systemTheme === "dark";
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
  return { colors, isDark };
}

/** Prefer `useThemeColors` from `@/theme/ThemeProvider` inside the app tree. */
export function useAppTheme(): AppColors {
  return useThemeResolution().colors;
}
