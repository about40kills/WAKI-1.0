import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useUserStore } from "@/store/userStore";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { t as translate } from "@/i18n";
import { AppThemeProvider } from "@/theme/ThemeProvider";
import { bootstrapAnalytics } from "@/services/analytics/client";
import {
  configureNotifications,
  syncStoredCheckinReminder,
} from "@/services/notifications/checkinScheduler";

export default function RootLayout() {
  const hydrate = useUserStore((s) => s.hydrate);
  const hydrated = useUserStore((s) => s.hydrated);
  const languageCode = useUserStore((s) => s.languageCode);
  const notificationTime = useUserStore((s) => s.notificationTime);
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    hydrate();
    configureNotifications();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    void bootstrapAnalytics();
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    void syncStoredCheckinReminder(
      notificationTime,
      translate(languageCode, "app.name"),
      translate(languageCode, "home.nudge")
    );
  }, [hydrated, languageCode, notificationTime]);

  if (!hydrated || !fontsLoaded) return null;

  return (
    <ErrorBoundary>
      <AppThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AppThemeProvider>
    </ErrorBoundary>
  );
}
