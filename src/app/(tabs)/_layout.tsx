import { Redirect, Tabs } from "expo-router";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserStore } from "@/store/userStore";
import { useThemeColors } from "@/theme/ThemeProvider";
import { LiquidGlassTabBar } from "@/components/navigation/LiquidGlassTabBar";
import { liquidTabSceneStyleInterpolator } from "@/components/navigation/liquidTabSceneStyleInterpolator";
import { LiquidHeaderBackground } from "@/components/navigation/LiquidChrome";
import { IOS26_LIQUID_SELECTION } from "@/constants/liquidGlassSpring";

export default function TabsLayout() {
  const hydrated = useUserStore((s) => s.hydrated);
  const onboardingDone = useUserStore((s) => s.onboardingDone);
  const { t } = useLanguage();
  const colors = useThemeColors();

  if (!hydrated) return null;
  if (!onboardingDone) return <Redirect href="/(onboarding)/welcome" />;

  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <LiquidGlassTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          overflow: "visible",
          shadowOpacity: 0,
        },
        headerBackground: () => <LiquidHeaderBackground />,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700", color: colors.text },
        tabBarHideOnKeyboard: true,
        animation: "shift",
        sceneStyleInterpolator: liquidTabSceneStyleInterpolator,
        transitionSpec: {
          animation: "spring",
          config: IOS26_LIQUID_SELECTION,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="toolkit"
        options={{
          title: t("tabs.toolkit"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t("tabs.learn"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          title: t("tabs.stories"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
