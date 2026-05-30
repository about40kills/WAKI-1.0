import { Text, type TextProps } from "react-native";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageText({
  i18nKey,
  params,
  ...rest
}: TextProps & { i18nKey: Parameters<ReturnType<typeof useLanguage>["t"]>[0]; params?: Record<string, string> }) {
  const { t } = useLanguage();
  return <Text {...rest}>{t(i18nKey, params)}</Text>;
}
