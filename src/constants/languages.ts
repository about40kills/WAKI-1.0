import type { AppLanguage, LanguageCode } from "@/types/language";

export const LANGUAGES: AppLanguage[] = [
  { code: "en", displayName: "English", nativeName: "English", khayaCode: "en" },
  { code: "tw", displayName: "Twi", nativeName: "Twi", khayaCode: "tw" },
  { code: "gaa", displayName: "Ga", nativeName: "Gã", khayaCode: "gaa" },
  { code: "ee", displayName: "Ewe", nativeName: "Eʋegbe", khayaCode: "ee" },
  { code: "dag", displayName: "Dagbani", nativeName: "Dagbanli", khayaCode: "dag" },
];

const SUPPORTED_CODES = new Set(LANGUAGES.map((l) => l.code));

export function isSupportedLanguageCode(code: unknown): code is LanguageCode {
  return typeof code === "string" && SUPPORTED_CODES.has(code as LanguageCode);
}

/** Maps legacy or unknown codes (e.g. removed languages) to English. */
export function normalizeLanguageCode(code: unknown): LanguageCode {
  return isSupportedLanguageCode(code) ? code : "en";
}
