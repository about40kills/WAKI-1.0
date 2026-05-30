import en from "@/i18n/en.json";
import tw from "@/i18n/tw.json";
import gaa from "@/i18n/gaa.json";
import ee from "@/i18n/ee.json";
import dag from "@/i18n/dag.json";
import type { LanguageCode } from "@/types/language";

const translations: Record<LanguageCode, Record<string, string>> = {
  en,
  tw,
  gaa,
  ee,
  dag,
};
export type TranslationKey = keyof typeof en;

export function t(
  language: LanguageCode,
  key: TranslationKey,
  params?: Record<string, string>
): string {
  const table = translations[language] ?? translations.en;
  // Fallback to English if key is missing in the selected language
  const template = table[key as string] ?? en[key] ?? key;
  if (!params) return template;
  return Object.entries(params).reduce(
    (acc, [paramKey, value]) => acc.replace(`{{${paramKey}}}`, value),
    template
  );
}
