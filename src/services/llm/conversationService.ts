import { addMessage, getSessionMessages } from "@/services/storage/conversationRepository";
import { callClaude } from "@/services/llm/claudeClient";
import { BASE_SYSTEM_PROMPT } from "@/services/llm/systemPrompts/base";
import { TWI_SYSTEM_ADDENDUM } from "@/services/llm/systemPrompts/twi";
import { GA_SYSTEM_ADDENDUM } from "@/services/llm/systemPrompts/ga";
import { EWE_SYSTEM_ADDENDUM } from "@/services/llm/systemPrompts/ewe";
import { DAGBANI_SYSTEM_ADDENDUM } from "@/services/llm/systemPrompts/dagbani";
import { detectCrisisFromMessages, reconcileRiskLevels } from "@/services/llm/crisisDetectionService";
import { classifyMode, type ConversationMode } from "@/services/llm/modeClassifier";
import type { LanguageCode } from "@/types/language";
import type { ClaudeStructuredResponse } from "@/types/crisis";

export interface ConversationResult extends ClaudeStructuredResponse {
  mode: ConversationMode;
}

const LANGUAGE_ADDENDA: Partial<Record<LanguageCode, string>> = {
  tw: TWI_SYSTEM_ADDENDUM,
  gaa: GA_SYSTEM_ADDENDUM,
  ee: EWE_SYSTEM_ADDENDUM,
  dag: DAGBANI_SYSTEM_ADDENDUM,
};

/** Ensures Claude writes `response` in the same register as the user's app language (not default English). */
function responseLanguageFooter(code: LanguageCode): string {
  const instruction: Record<LanguageCode, string> = {
    en:
      'The user\'s app language is English. Write the JSON "response" field in warm, simple, voice-friendly English.',
    tw: 'The user\'s app language is Twi. Write the JSON "response" field in Twi per the Twi addendum above. Mirror English only if the user mixes.',
    gaa: 'The user\'s app language is Ga. Write the JSON "response" field in Ga (Gã) per the Ga addendum.',
    ee: 'The user\'s app language is Ewe. Write the JSON "response" field in Ewe per the Ewe addendum.',
    dag: 'The user\'s app language is Dagbani. Write the JSON "response" field in Dagbani per the Dagbani addendum.',
  };

  return `
═══════════════════════════════════════
MANDATORY — LANGUAGE OF THE "response" FIELD
═══════════════════════════════════════
${instruction[code]}
Keep it short (voice playback).`;
}

export async function sendConversationMessage(args: {
  sessionId: string;
  message: string;
  languageCode: LanguageCode;
}): Promise<ConversationResult> {
  const { sessionId, message, languageCode } = args;
  const now = new Date().toISOString();

  await addMessage({
    session_id: sessionId,
    role: "user",
    content: message,
    timestamp: now,
  });

  const history = await getSessionMessages(sessionId);
  const last10 = history.slice(-10).map((m) => ({
    role: m.role,
    content: m.content,
  }));
  const addendum = LANGUAGE_ADDENDA[languageCode];
  const core = addendum ? `${BASE_SYSTEM_PROMPT}\n${addendum}` : BASE_SYSTEM_PROMPT;
  const systemPrompt = `${core}\n${responseLanguageFooter(languageCode)}`;

  // Run client-side crisis detection in parallel with LLM call
  const clientCrisis = detectCrisisFromMessages(last10);
  const result = await callClaude(systemPrompt, last10);

  // Take the higher risk level between client-side and LLM
  const reconciledRisk = reconcileRiskLevels(clientCrisis.riskLevel, result.risk_level);
  const allIndicators = [
    ...result.risk_indicators,
    ...clientCrisis.indicators.filter((i) => !result.risk_indicators.includes(i)),
  ];

  // Classify conversation mode from user's message
  const mode = classifyMode(message);

  await addMessage({
    session_id: sessionId,
    role: "assistant",
    content: result.response,
    timestamp: new Date().toISOString(),
    risk_level: reconciledRisk,
  });

  return {
    response: result.response,
    risk_level: reconciledRisk,
    risk_indicators: allIndicators,
    mode,
  };
}
