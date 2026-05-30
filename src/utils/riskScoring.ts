import type { RiskLevel } from "@/types/crisis";

const windowScores: number[] = [];

export function riskLevelToScore(risk: RiskLevel): number {
  if (risk === "high") return 10;
  if (risk === "moderate") return 7;
  if (risk === "low") return 3;
  return 0;
}

export function updateRiskWindow(risk: RiskLevel): number {
  windowScores.push(riskLevelToScore(risk));
  if (windowScores.length > 5) windowScores.shift();
  return Math.max(...windowScores, 0);
}

export function shouldTriggerCrisis(risk: RiskLevel): boolean {
  return updateRiskWindow(risk) >= 10;
}
