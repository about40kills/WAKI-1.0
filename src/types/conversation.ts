import type { LanguageCode } from "@/types/language";
import type { RiskLevel } from "@/types/crisis";

export interface ConversationSession {
  id: string;
  language_code: LanguageCode;
  started_at: string;
  last_active_at: string;
  message_count: number;
  crisis_flagged: number;
}

export interface Message {
  id?: number;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  audio_uri?: string | null;
  timestamp: string;
  risk_level?: RiskLevel | null;
}
