export type RiskLevel = "none" | "low" | "moderate" | "high";

export interface ClaudeStructuredResponse {
  response: string;
  risk_level: RiskLevel;
  risk_indicators: string[];
}
