import type { LanguageCode } from "@/types/language";

export interface MoodCheckin {
  id?: number;
  emotion_id: string;
  emotion_label: string;
  follow_up_text?: string;
  language_code: LanguageCode;
  timestamp: string;
  session_id?: string | null;
}
