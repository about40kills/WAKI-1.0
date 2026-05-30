import { Platform } from "react-native";
import { create } from "zustand";
import type { LanguageCode } from "@/types/language";
import { isSupportedLanguageCode, normalizeLanguageCode } from "@/constants/languages";

const USER_KEY = "waki_user_store";

// Platform-safe storage: SecureStore on native, localStorage on web
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

interface UserState {
  nickname: string;
  languageCode: LanguageCode;
  theme: "light" | "dark" | "system";
  onboardingDone: boolean;
  consentLocal: boolean;
  consentTrain: boolean;
  consentCloud: boolean;
  notificationTime: string | null;
  streakCount: number;
  lastCheckinDate: string | null;
  lastCopingToolId: string | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setNickname: (nickname: string) => Promise<void>;
  /** Updates UI language immediately; persists in the background. */
  setLanguageCode: (languageCode: LanguageCode) => void;
  setTheme: (theme: "light" | "dark" | "system") => Promise<void>;
  setOnboardingDone: (done: boolean) => Promise<void>;
  setConsentLocal: (consent: boolean) => Promise<void>;
  setConsentTrain: (consent: boolean) => Promise<void>;
  setConsentCloud: (consent: boolean) => Promise<void>;
  setNotificationTime: (time: string | null) => Promise<void>;
  setStreakCount: (count: number) => Promise<void>;
  setLastCheckinDate: (date: string | null) => Promise<void>;
  setLastCopingToolId: (id: string | null) => Promise<void>;
  resetSession: () => Promise<void>;
}

async function persist(state: Partial<UserState>) {
  const current = useUserStore.getState();
  const payload = {
    nickname: state.nickname ?? current.nickname,
    languageCode: state.languageCode ?? current.languageCode,
    theme: state.theme ?? current.theme,
    onboardingDone: state.onboardingDone ?? current.onboardingDone,
    consentLocal: state.consentLocal ?? current.consentLocal,
    consentTrain: state.consentTrain ?? current.consentTrain,
    consentCloud: state.consentCloud ?? current.consentCloud,
    notificationTime: state.notificationTime !== undefined ? state.notificationTime : current.notificationTime,
    streakCount: state.streakCount ?? current.streakCount,
    lastCheckinDate: state.lastCheckinDate !== undefined ? state.lastCheckinDate : current.lastCheckinDate,
    lastCopingToolId: state.lastCopingToolId !== undefined ? state.lastCopingToolId : current.lastCopingToolId,
  };
  await storage.setItem(USER_KEY, JSON.stringify(payload));
}

export const useUserStore = create<UserState>((set) => ({
  nickname: "",
  languageCode: "en",
  theme: "system",
  onboardingDone: false,
  consentLocal: false,
  consentTrain: false,
  consentCloud: false,
  notificationTime: null,
  streakCount: 0,
  lastCheckinDate: null,
  lastCopingToolId: null,
  hydrated: false,
  hydrate: async () => {
    const raw = await storage.getItem(USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const languageCode = normalizeLanguageCode(parsed.languageCode);
      set({
        nickname: parsed.nickname ?? "",
        languageCode,
        theme: parsed.theme ?? "system",
        onboardingDone: Boolean(parsed.onboardingDone),
        consentLocal: Boolean(parsed.consentLocal),
        consentTrain: Boolean(parsed.consentTrain),
        consentCloud: Boolean(parsed.consentCloud),
        notificationTime: parsed.notificationTime ?? null,
        streakCount: parsed.streakCount ?? 0,
        lastCheckinDate: parsed.lastCheckinDate ?? null,
        lastCopingToolId: parsed.lastCopingToolId ?? null,
      });
      if (languageCode !== parsed.languageCode) {
        await persist({ languageCode });
      }
    }
    set({ hydrated: true });
  },
  setNickname: async (nickname) => {
    set({ nickname });
    await persist({ nickname });
  },
  setLanguageCode: (languageCode) => {
    if (!isSupportedLanguageCode(languageCode)) return;
    set({ languageCode });
    void persist({ languageCode });
  },
  setTheme: async (theme) => {
    set({ theme });
    await persist({ theme });
  },
  setOnboardingDone: async (onboardingDone) => {
    set({ onboardingDone });
    await persist({ onboardingDone });
  },
  setConsentLocal: async (consentLocal) => {
    set({ consentLocal });
    await persist({ consentLocal });
  },
  setConsentTrain: async (consentTrain) => {
    set({ consentTrain });
    await persist({ consentTrain });
  },
  setConsentCloud: async (consentCloud) => {
    set({ consentCloud });
    await persist({ consentCloud });
  },
  setNotificationTime: async (notificationTime) => {
    set({ notificationTime });
    await persist({ notificationTime });
  },
  setStreakCount: async (streakCount) => {
    set({ streakCount });
    await persist({ streakCount });
  },
  setLastCheckinDate: async (lastCheckinDate) => {
    set({ lastCheckinDate });
    await persist({ lastCheckinDate });
  },
  setLastCopingToolId: async (lastCopingToolId) => {
    set({ lastCopingToolId });
    await persist({ lastCopingToolId });
  },
  resetSession: async () => {
    await storage.removeItem(USER_KEY);
    set({
      nickname: "",
      languageCode: "en",
      theme: "system",
      onboardingDone: false,
      consentLocal: false,
      consentTrain: false,
      consentCloud: false,
      notificationTime: null,
      streakCount: 0,
      lastCheckinDate: null,
      lastCopingToolId: null,
      hydrated: true,
    });
  },
}));
