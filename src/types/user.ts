import type { LanguageCode } from "@/types/language";

export interface UserProfile {
  id?: number;
  nickname?: string;
  language_code: LanguageCode;
  onboarding_done: number;
  consent_local: number;
  consent_train: number;
  consent_cloud: number;
  notification_time: string | null;
  streak_count: number;
  last_checkin_date: string | null;
  last_coping_tool_id: string | null;
  created_at: string;
}
