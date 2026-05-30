import type { LanguageCode } from "@/types/language";

/**
 * Many content bundles only define `en` + `tw`. Other app languages fall back to English.
 */
export function localizedContent<T>(
  record: { en: T; tw: T } & Partial<Record<LanguageCode, T>>,
  lang: LanguageCode
): T {
  const v = (record as Partial<Record<LanguageCode, T>>)[lang];
  if (v !== undefined && v !== null) return v;
  return record.en;
}
