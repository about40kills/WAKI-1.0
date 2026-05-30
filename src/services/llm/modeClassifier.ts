/**
 * Classifies the current conversation mode based on the user's last message.
 * This is used to display a mode label in the ChatInterface (Listening / Guiding)
 * and to subtly adjust the LLM's approach.
 */

export type ConversationMode = "listening" | "guiding";

const GUIDING_SIGNALS: RegExp[] = [
  /\b(what\s+(should|can|do)\s+i|how\s+(do|can|should)\s+i|help\s+me|suggest|advice|recommend|tip)\b/i,
  /\b(i\s+(need|want)\s+(help|advice|suggestion|tips?))\b/i,
  /\b(what\s+to\s+do|any\s+(idea|suggestion)s?)\b/i,
  // Twi
  /\b(ɛdeɛn\s+na\s+menyɛ|boa\s+me|kyerɛ\s+me\s+kwan)\b/i,
  // Pidgin
  /\b(wetin\s+(i\s+go|make\s+i)\s+do|help\s+me|abeg)\b/i,
  // General question markers
  /\?\s*$/,
];

/**
 * Determines the conversation mode from the user's latest message.
 * Defaults to "listening" — the app validates before it guides.
 */
export function classifyMode(userMessage: string): ConversationMode {
  for (const pattern of GUIDING_SIGNALS) {
    if (pattern.test(userMessage)) {
      return "guiding";
    }
  }
  return "listening";
}
