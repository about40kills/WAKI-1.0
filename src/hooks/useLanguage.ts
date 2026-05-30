import { useCallback, useMemo } from "react";
import { isSupportedLanguageCode } from "@/constants/languages";
import { t, type TranslationKey } from "@/i18n";
import { useUserStore } from "@/store/userStore";
import type { LanguageCode } from "@/types/language";

/**
 * @param localeOverride — e.g. from onboarding route params so copy matches the language
 *   just chosen before the global store subscription updates on the next screen.
 */
export function useLanguage(localeOverride?: string | null) {
  const storeLanguageCode = useUserStore((s) => s.languageCode);
  const languageCode: LanguageCode =
    localeOverride != null &&
    typeof localeOverride === "string" &&
    isSupportedLanguageCode(localeOverride)
      ? localeOverride
      : storeLanguageCode;
  const tFunc = useCallback(
    (key: TranslationKey, params?: Record<string, string>) => t(languageCode, key, params),
    [languageCode]
  );

  return useMemo(() => ({
    languageCode,
    t: tFunc,
  }), [languageCode, tFunc]);
}
