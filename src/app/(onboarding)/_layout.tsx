import { Redirect, Stack } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function OnboardingLayout() {
  const hydrated = useUserStore((s) => s.hydrated);
  const onboardingDone = useUserStore((s) => s.onboardingDone);

  if (!hydrated) return null;
  if (onboardingDone) return <Redirect href="/(tabs)/home" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
