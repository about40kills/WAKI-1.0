import { create } from "zustand";
import type { RiskLevel } from "@/types/crisis";

interface ConversationState {
  currentSessionId: string | null;
  isStreaming: boolean;
  lastResponseText: string;
  currentRiskLevel: RiskLevel;
  setSessionId: (sessionId: string) => void;
  setStreaming: (streaming: boolean) => void;
  setLastResponseText: (text: string) => void;
  setCurrentRiskLevel: (risk: RiskLevel) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  currentSessionId: null,
  isStreaming: false,
  lastResponseText: "",
  currentRiskLevel: "none",
  setSessionId: (currentSessionId) => set({ currentSessionId }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  setLastResponseText: (lastResponseText) => set({ lastResponseText }),
  setCurrentRiskLevel: (currentRiskLevel) => set({ currentRiskLevel }),
}));
