import { EmotionWheel } from "@/components/ui/EmotionWheel";
import type { LanguageCode } from "@/types/language";

export function EmotionWheelPicker({
  languageCode,
  onPick,
}: {
  languageCode: LanguageCode;
  onPick: (id: string, label: string) => void;
}) {
  return <EmotionWheel languageCode={languageCode} onPick={onPick} />;
}
