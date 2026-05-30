import { useMemo, useState } from "react";
import { trackAnalyticsEvent } from "@/services/analytics/client";
import { sendConversationMessage } from "@/services/llm/conversationService";
import type { ConversationMode } from "@/services/llm/modeClassifier";
import { createSession, getSessionMessages } from "@/services/storage/conversationRepository";
import { useConversationStore } from "@/store/conversationStore";
import { useUserStore } from "@/store/userStore";
import { shouldTriggerCrisis } from "@/utils/riskScoring";

function randomSessionId() {
  return `sess-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}

export function useConversation() {
  const { languageCode } = useUserStore();
  const store = useConversationStore();
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; risk?: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ConversationMode>("listening");

  const sessionId = useMemo(() => store.currentSessionId ?? randomSessionId(), [store.currentSessionId]);

  const init = async () => {
    if (!store.currentSessionId) {
      await createSession(sessionId, languageCode);
      store.setSessionId(sessionId);
      await trackAnalyticsEvent("conversation_session_started", {
        languageCode,
      });
    }
    const history = await getSessionMessages(sessionId);
    setMessages(history.map((m) => ({ role: m.role, content: m.content, risk: m.risk_level ?? undefined })));
  };

  const send = async (text: string, inputMethod: "text" | "voice" = "text") => {
    store.setStreaming(true);
    setError(null);
    try {
      const result = await sendConversationMessage({
        sessionId,
        message: text,
        languageCode,
      });
      store.setLastResponseText(result.response);
      store.setCurrentRiskLevel(result.risk_level);
      if (result.mode) setMode(result.mode);
      await trackAnalyticsEvent("conversation_turn_completed", {
        inputMethod,
        mode: result.mode ?? mode,
      });
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text },
        { role: "assistant", content: result.response, risk: result.risk_level },
      ]);
      return { ...result, crisis: shouldTriggerCrisis(result.risk_level) };
    } catch {
      const fallbackResponse = "I am having trouble connecting right now. You can keep typing and I will continue to support you.";
      setError("Conversation service unavailable");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text },
        { role: "assistant", content: fallbackResponse, risk: "none" },
      ]);
      store.setLastResponseText(fallbackResponse);
      store.setCurrentRiskLevel("none");
      return { response: fallbackResponse, risk_level: "none" as const, risk_indicators: [], crisis: false, mode: "listening" as const };
    } finally {
      store.setStreaming(false);
    }
  };

  return {
    sessionId,
    messages,
    init,
    send,
    error,
    riskLevel: store.currentRiskLevel,
    isStreaming: store.isStreaming,
    mode,
  };
}
