export type LanguageCode = "en" | "tw" | "gaa" | "ee" | "dag";

export interface AppLanguage {
  code: LanguageCode;
  displayName: string;
  nativeName: string;
  khayaCode: string;
}
