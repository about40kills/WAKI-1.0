import { Redirect } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function Index() {
  const done = useUserStore((s) => s.onboardingDone);
  return <Redirect href={done ? "/(tabs)/home" : "/(onboarding)/welcome"} />;
}
