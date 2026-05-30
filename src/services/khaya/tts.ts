import { Platform } from "react-native";
import khayaApi from "@/services/khaya/khayaClient";
import type { LanguageCode } from "@/types/language";

const cache = new Map<string, string>();

/**
 * On-device TTS for languages Khaya does not synthesise well (Ga, Ewe, Dagbani).
 * BCP-47 tags are best-effort; iOS/Android may approximate.
 */
const DEVICE_TTS_LOCALE: Record<LanguageCode, string> = {
  en: "en-US",
  tw: "en-GH",
  gaa: "en-GH",
  ee: "ee-GH",
  dag: "en-GH",
};

function speakOnDevice(text: string, locale: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Speech = require("expo-speech") as typeof import("expo-speech");
    Speech.speak(text, { language: locale });
  } catch {
    try {
      const Speech = require("expo-speech") as typeof import("expo-speech");
      Speech.speak(text);
    } catch {
      // Web / no speech — silent.
    }
  }
}

export async function speakText(text: string, language: LanguageCode) {
  if (Platform.OS === "web") {
    speakOnDevice(text, "en-US");
    return null;
  }

  if (language === "en") {
    speakOnDevice(text, DEVICE_TTS_LOCALE.en);
    return null;
  }

  // Khaya TTS is tuned for Twi; other app languages use on-device speech.
  if (language !== "tw") {
    speakOnDevice(text, DEVICE_TTS_LOCALE[language] ?? "en-GH");
    return null;
  }

  const cacheKey = `${language}:${text}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  try {
    const res = await khayaApi.post(
      "/tts",
      { text, language: "tw" },
      { responseType: "arraybuffer", timeout: 15000 }
    );

    const bytes = new Uint8Array(res.data);
    const binary = Array.from(bytes)
      .map((b) => String.fromCharCode(b))
      .join("");
    const encoder = (globalThis as { btoa?: (value: string) => string }).btoa;
    if (!encoder) {
      speakOnDevice(text, DEVICE_TTS_LOCALE.tw);
      return null;
    }

    const base64 = encoder(binary);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FileSystem = require("expo-file-system/legacy") as typeof import("expo-file-system/legacy");
    const uri = `${FileSystem.cacheDirectory}tts-${Date.now()}.mp3`;
    await FileSystem.writeAsStringAsync(uri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    cache.set(cacheKey, uri);
    return uri;
  } catch {
    speakOnDevice(text, DEVICE_TTS_LOCALE.tw);
    return null;
  }
}
