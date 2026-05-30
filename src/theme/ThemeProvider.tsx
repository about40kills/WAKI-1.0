import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { Appearance } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  type Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useThemeResolution } from "@/hooks/useAppTheme";
import { useUserStore } from "@/store/userStore";
import type { AppColors } from "@/constants/colors";

type ThemeContextValue = { colors: AppColors; isDark: boolean };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeColors(): AppColors {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeColors must be used within AppThemeProvider");
  }
  return ctx.colors;
}

export function useThemeMode(): { isDark: boolean; colors: AppColors } {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within AppThemeProvider");
  }
  return { isDark: ctx.isDark, colors: ctx.colors };
}

function buildNavigationTheme(colors: AppColors, isDark: boolean): Theme {
  const base = isDark ? DarkTheme : DefaultTheme;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
      notification: colors.secondary,
    },
  };
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const themePreference = useUserStore((s) => s.theme);
  const { colors, isDark } = useThemeResolution();

  useEffect(() => {
    if (themePreference === "dark") {
      Appearance.setColorScheme("dark");
    } else if (themePreference === "light") {
      Appearance.setColorScheme("light");
    } else {
      // Follow device setting (null = reset; typings omit null on some RN versions).
      (Appearance as { setColorScheme: (c: "light" | "dark" | null) => void }).setColorScheme(null);
    }
  }, [themePreference]);

  const value = useMemo(() => ({ colors, isDark }), [colors, isDark]);
  const navigationTheme = useMemo(
    () => buildNavigationTheme(colors, isDark),
    [colors, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>
      <NavigationThemeProvider value={navigationTheme}>
        <StatusBar style={isDark ? "light" : "dark"} />
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
