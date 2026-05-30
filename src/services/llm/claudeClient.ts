import Constants from "expo-constants";
import type { ClaudeStructuredResponse } from "@/types/crisis";

const CLAUDE_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-20250514";

function getApiKey() {
  const extra = Constants.expoConfig?.extra as
    | { anthropicApiKey?: string }
    | undefined;
  return extra?.anthropicApiKey ?? "";
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeStructuredOutput(rawText: string): ClaudeStructuredResponse {
  const fallback: ClaudeStructuredResponse = {
    response: rawText || "I'm here with you. Can you share a bit more?",
    risk_level: "none",
    risk_indicators: [],
  };

  const trimmed = rawText.trim();
  const jsonCandidate =
    trimmed.startsWith("{") && trimmed.endsWith("}")
      ? trimmed
      : trimmed.slice(trimmed.indexOf("{"), trimmed.lastIndexOf("}") + 1);

  try {
    const parsed = JSON.parse(jsonCandidate) as Partial<ClaudeStructuredResponse>;
    const risk_level =
      parsed.risk_level === "low" ||
      parsed.risk_level === "moderate" ||
      parsed.risk_level === "high" ||
      parsed.risk_level === "none"
        ? parsed.risk_level
        : "none";
    return {
      response:
        typeof parsed.response === "string" && parsed.response.trim()
          ? parsed.response.trim()
          : fallback.response,
      risk_level,
      risk_indicators: Array.isArray(parsed.risk_indicators)
        ? parsed.risk_indicators.filter((item): item is string => typeof item === "string")
        : [],
    };
  } catch {
    return fallback;
  }
}

export async function callClaude(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<ClaudeStructuredResponse> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");

  const body = {
    model: CLAUDE_MODEL,
    max_tokens: 300,
    temperature: 0.7,
    system: systemPrompt,
    messages,
  };

  let attempt = 0;
  while (attempt < 3) {
    let res: Response;
    try {
      res = await fetch(CLAUDE_URL, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch {
      attempt += 1;
      await wait(2 ** attempt * 500);
      continue;
    }

    if (res.status === 529 || res.status >= 500) {
      attempt += 1;
      await wait(2 ** attempt * 500);
      continue;
    }
    if (!res.ok) throw new Error(`Claude error ${res.status}`);

    const json = await res.json();
    const content = json?.content?.[0]?.text ?? "";
    return normalizeStructuredOutput(content);
  }

  throw new Error("Claude unavailable");
}
