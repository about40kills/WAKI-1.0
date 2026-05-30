import type { RiskLevel } from "@/types/crisis";

/**
 * Crisis keywords / phrases mapped to risk levels.
 * This runs client-side as a fast pre-check before or parallel to LLM analysis.
 * The LLM response is authoritative — this service is a safety net.
 */

const HIGH_RISK_PATTERNS: RegExp[] = [
  // English
  /\b(i\s+want\s+to\s+die|kill\s+myself|end\s+(my\s+life|it\s+all)|suicide|hang\s+myself)\b/i,
  /\b(i\s+don'?t\s+want\s+to\s+(live|be\s+here|be\s+alive))\b/i,
  /\b(everyone\s+(would\s+be\s+)?better\s+off\s+without\s+me)\b/i,
  /\b(i('?ve?|have)\s+(cut|hurt|harmed)\s+(myself|my\s+(wrist|arm|leg)))\b/i,
  /\b(took\s+(too\s+many\s+)?pills|overdose)\b/i,
  // Twi
  /mempɛ\s+nkwa\s+bio/i,
  /mekɔ\s+na\s+mesan\s+mmɛba/i,
  /me\s+kra\s+apue/i,
  /ɛnyɛ\s+hwee\s+sɛ\s+mewu/i,
  // Pidgin
  /i\s+no\s+wan\s+live\s+again/i,
  /make\s+i\s+just\s+end\s+am/i,
  /i\s+no\s+see\s+reason\s+to\s+dey/i,
  // Ewe
  /medi\s+agbe\s+gake\s+o/i,
  /ne\s+meku\s+la.*enyo/i,
  // Dagbani
  /m\s+bi\s+bɔɣim\s+nyɛvuri/i,
  /m\s+ni\s+che\s+ka\s+m\s+kuli/i,
  // Ga
  /mɛi\s+ni\s+pɛɛ\s+nkwa\s+bɛ/i,
];

const MODERATE_RISK_PATTERNS: RegExp[] = [
  // English
  /\b(what'?s\s+the\s+point|give\s+up|no\s+hope|no\s+reason\s+to)\b/i,
  /\b(wish\s+i\s+(hadn'?t|never)\s+(woken\s+up|been\s+born))\b/i,
  /\b(nobody\s+(cares|loves|wants)\s+me)\b/i,
  /\b(i\s+can'?t\s+(go\s+on|take\s+(it|this)\s+(anymore|any\s+more)))\b/i,
  /\b(abuse|molest|assault|rape)\b/i,
  // Twi
  /obiara\s+mpɛ\s+me/i,
  /ewiase\s+yi\s+nyɛ\s+me/i,
  /me\s+kra\s+mu\s+nni\s+hɔ/i,
  // Pidgin
  /life\s+no\s+get\s+meaning/i,
  /i\s+wish\s+say\s+i\s+no\s+born/i,
  /i\s+don\s+give\s+up/i,
  // Ewe
  /mekpɔ\s+mɔ\s+aɖeke\s+o/i,
  /agbe\s+nye\s+fu/i,
  // Dagbani
  /nyɛvuri\s+bi\s+mali\s+anfaani/i,
  /m\s+ti\s+paɣa/i,
];

/**
 * Analyses the last N messages for crisis signals.
 * Returns the highest risk level detected across all messages.
 */
export function detectCrisisFromMessages(
  messages: { role: string; content: string }[],
  windowSize = 3
): { riskLevel: RiskLevel; indicators: string[] } {
  const recent = messages
    .filter((m) => m.role === "user")
    .slice(-windowSize);

  const indicators: string[] = [];
  let maxRisk: RiskLevel = "none";

  for (const msg of recent) {
    const text = msg.content;

    for (const pattern of HIGH_RISK_PATTERNS) {
      const match = text.match(pattern);
      if (match) {
        maxRisk = "high";
        indicators.push(match[0]);
      }
    }

    if (maxRisk !== "high") {
      for (const pattern of MODERATE_RISK_PATTERNS) {
        const match = text.match(pattern);
        if (match) {
          if (maxRisk !== "moderate") {
            maxRisk = "moderate";
          }
          indicators.push(match[0]);
        }
      }
    }
  }

  return { riskLevel: maxRisk, indicators };
}

/**
 * Reconciles the client-side detection with the LLM's risk assessment.
 * Always takes the HIGHER of the two — safety over comfort.
 */
export function reconcileRiskLevels(
  clientRisk: RiskLevel,
  llmRisk: RiskLevel
): RiskLevel {
  const RISK_ORDER: Record<RiskLevel, number> = {
    none: 0,
    low: 1,
    moderate: 2,
    high: 3,
  };
  return RISK_ORDER[clientRisk] >= RISK_ORDER[llmRisk]
    ? clientRisk
    : llmRisk;
}
