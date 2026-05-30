import { Platform } from "react-native";
import Constants from "expo-constants";
import { useUserStore } from "@/store/userStore";
import {
  clearQueuedAnalyticsEvents,
  deleteQueuedAnalyticsEvents,
  enqueueAnalyticsEvent,
  listQueuedAnalyticsEvents,
  markAnalyticsUploadAttempt,
  pruneQueuedAnalyticsEvents,
} from "@/services/analytics/queueRepository";

const ANALYTICS_INSTALL_ID_KEY = "waki_analytics_install_id";

type AnalyticsPrimitive = string | number | boolean | null;

export type AnalyticsEventName =
  | "app_opened"
  | "onboarding_completed"
  | "mood_checkin_saved"
  | "conversation_session_started"
  | "conversation_turn_completed"
  | "coping_tool_opened"
  | "coping_audio_started";

type AnalyticsPayload = Record<string, AnalyticsPrimitive>;

const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
    }
    const SecureStore = await import("expo-secure-store");
    return SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
      return;
    }
    const SecureStore = await import("expo-secure-store");
    await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") localStorage.removeItem(key);
      return;
    }
    const SecureStore = await import("expo-secure-store");
    await SecureStore.deleteItemAsync(key);
  },
};

let flushPromise: Promise<void> | null = null;

function getAnalyticsEndpoint(): string {
  const extra = Constants.expoConfig?.extra as { analyticsEndpoint?: string } | undefined;
  return extra?.analyticsEndpoint?.trim() ?? "";
}

function createInstallId() {
  return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function getOrCreateInstallId() {
  const existing = await storage.getItem(ANALYTICS_INSTALL_ID_KEY);
  if (existing) return existing;
  const next = createInstallId();
  await storage.setItem(ANALYTICS_INSTALL_ID_KEY, next);
  return next;
}

export async function clearAnalyticsState() {
  await Promise.all([
    clearQueuedAnalyticsEvents(),
    storage.removeItem(ANALYTICS_INSTALL_ID_KEY),
  ]);
}

export async function syncAnalyticsConsent(enabled: boolean) {
  if (!enabled) {
    await clearAnalyticsState();
    return;
  }
  await getOrCreateInstallId();
  await flushAnalyticsQueue();
}

export async function trackAnalyticsEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {}
) {
  if (!useUserStore.getState().consentTrain) return;
  await getOrCreateInstallId();
  await enqueueAnalyticsEvent(name, JSON.stringify(payload));
  await pruneQueuedAnalyticsEvents();
  void flushAnalyticsQueue();
}

export async function bootstrapAnalytics() {
  const state = useUserStore.getState();
  if (!state.consentTrain) return;
  await trackAnalyticsEvent("app_opened", {
    languageCode: state.languageCode,
    onboardingDone: state.onboardingDone,
  });
}

export async function flushAnalyticsQueue() {
  if (flushPromise) {
    await flushPromise;
    return;
  }

  flushPromise = (async () => {
    if (!useUserStore.getState().consentTrain) return;

    const endpoint = getAnalyticsEndpoint();
    if (!endpoint) return;

    const installId = await getOrCreateInstallId();
    const appVersion = Constants.expoConfig?.version ?? "dev";

    while (true) {
      const events = await listQueuedAnalyticsEvents();
      if (events.length === 0) return;

      try {
        const body = {
          install_id: installId,
          platform: Platform.OS,
          app_version: appVersion,
          events: events.map((event) => ({
            id: event.id,
            name: event.name,
            occurred_at: event.created_at,
            payload: JSON.parse(event.payload_json) as AnalyticsPayload,
          })),
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Analytics upload failed: ${response.status}`);
        }

        await deleteQueuedAnalyticsEvents(events.map((event) => event.id));
      } catch {
        await markAnalyticsUploadAttempt(events.map((event) => event.id));
        return;
      }
    }
  })();

  try {
    await flushPromise;
  } finally {
    flushPromise = null;
  }
}
