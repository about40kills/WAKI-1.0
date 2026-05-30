import { normalizeLanguageCode } from "@/constants/languages";
import { getDatabase } from "@/services/storage/database";
import { getAllCheckins } from "@/services/storage/moodRepository";
import { getSessionMessages, listAllSessions } from "@/services/storage/conversationRepository";
import type { ConversationSession, Message } from "@/types/conversation";
import type { LanguageCode } from "@/types/language";
import type { MoodCheckin } from "@/types/mood";

export interface ExportProfileSnapshot {
  nickname: string;
  languageCode: LanguageCode;
  theme: "light" | "dark" | "system";
  onboardingDone: boolean;
  consentLocal: boolean;
  consentTrain: boolean;
  consentCloud: boolean;
  notificationTime: string | null;
  streakCount: number;
  lastCheckinDate: string | null;
  lastCopingToolId: string | null;
}

export interface ExportBundle {
  exported_at: string;
  profile: ExportProfileSnapshot;
  mood_checkins: MoodCheckin[];
  conversation_sessions: Array<ConversationSession & { messages: Message[] }>;
}

export async function exportUserData(profile: ExportProfileSnapshot) {
  const [moodCheckins, sessions] = await Promise.all([
    getAllCheckins(),
    listAllSessions(),
  ]);

  const sessionsWithMessages = await Promise.all(
    sessions.map(async (session) => ({
      ...session,
      messages: await getSessionMessages(session.id),
    }))
  );

  const payload: ExportBundle = {
    exported_at: new Date().toISOString(),
    profile,
    mood_checkins: moodCheckins,
    conversation_sessions: sessionsWithMessages,
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const FileSystem = require("expo-file-system/legacy") as typeof import("expo-file-system/legacy");
  const directory = FileSystem.documentDirectory ?? FileSystem.cacheDirectory;
  if (!directory) {
    throw new Error("No writable directory available");
  }

  const uri = `${directory}waki-export-${Date.now()}.json`;
  await FileSystem.writeAsStringAsync(uri, JSON.stringify(payload, null, 2), {
    encoding: FileSystem.EncodingType.UTF8,
  });

  let shared = false;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sharing = require("expo-sharing") as {
      isAvailableAsync?: () => Promise<boolean>;
      shareAsync?: (url: string) => Promise<void>;
    };

    if (Sharing.isAvailableAsync && Sharing.shareAsync && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(uri);
      shared = true;
    }
  } catch {
    shared = false;
  }

  return { uri, shared };
}

function sanitizeProfile(raw: unknown): ExportProfileSnapshot {
  const profile = (raw ?? {}) as Partial<ExportProfileSnapshot>;
  return {
    nickname: typeof profile.nickname === "string" ? profile.nickname : "",
    languageCode: normalizeLanguageCode(profile.languageCode),
    theme:
      profile.theme === "light" || profile.theme === "dark" || profile.theme === "system"
        ? profile.theme
        : "system",
    onboardingDone: Boolean(profile.onboardingDone),
    consentLocal: profile.consentLocal !== false,
    consentTrain: Boolean(profile.consentTrain),
    consentCloud: Boolean(profile.consentCloud),
    notificationTime: typeof profile.notificationTime === "string" ? profile.notificationTime : null,
    streakCount: typeof profile.streakCount === "number" ? profile.streakCount : 0,
    lastCheckinDate: typeof profile.lastCheckinDate === "string" ? profile.lastCheckinDate : null,
    lastCopingToolId: typeof profile.lastCopingToolId === "string" ? profile.lastCopingToolId : null,
  };
}

function sanitizeCheckins(raw: unknown): MoodCheckin[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const checkin = item as Partial<MoodCheckin>;
    if (typeof checkin.emotion_id !== "string") return [];
    if (typeof checkin.emotion_label !== "string") return [];
    if (typeof checkin.timestamp !== "string") return [];
    return [{
      emotion_id: checkin.emotion_id,
      emotion_label: checkin.emotion_label,
      follow_up_text: typeof checkin.follow_up_text === "string" ? checkin.follow_up_text : "",
      language_code: normalizeLanguageCode(checkin.language_code),
      timestamp: checkin.timestamp,
      session_id: typeof checkin.session_id === "string" ? checkin.session_id : null,
    }];
  });
}

function sanitizeMessages(raw: unknown, sessionId: string): Message[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const message = item as Partial<Message>;
    if (message.role !== "user" && message.role !== "assistant") return [];
    if (typeof message.content !== "string") return [];
    if (typeof message.timestamp !== "string") return [];
    return [{
      session_id: sessionId,
      role: message.role,
      content: message.content,
      audio_uri: typeof message.audio_uri === "string" ? message.audio_uri : null,
      timestamp: message.timestamp,
      risk_level: typeof message.risk_level === "string" ? message.risk_level : null,
    }];
  });
}

function sanitizeSessions(raw: unknown): Array<ConversationSession & { messages: Message[] }> {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const session = item as Partial<ConversationSession> & { messages?: unknown };
    if (typeof session.id !== "string") return [];
    const messages = sanitizeMessages(session.messages, session.id);
    return [{
      id: session.id,
      language_code: normalizeLanguageCode(session.language_code),
      started_at: typeof session.started_at === "string" ? session.started_at : new Date().toISOString(),
      last_active_at: typeof session.last_active_at === "string" ? session.last_active_at : new Date().toISOString(),
      message_count:
        typeof session.message_count === "number" ? session.message_count : messages.length,
      crisis_flagged: typeof session.crisis_flagged === "number" ? session.crisis_flagged : 0,
      messages,
    }];
  });
}

export async function importUserDataFromPicker(): Promise<ExportProfileSnapshot> {
  const { File } = await import("expo-file-system");
  const picked = await File.pickFileAsync(undefined, "application/json");
  const file = Array.isArray(picked) ? picked[0] : picked;
  const raw = await file.text();
  return importUserDataFromJson(raw);
}

export async function importUserDataFromJson(raw: string): Promise<ExportProfileSnapshot> {
  let parsed: ExportBundle;
  try {
    parsed = JSON.parse(raw) as ExportBundle;
  } catch {
    throw new Error("Invalid backup file");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid backup file");
  }

  const profile = sanitizeProfile(parsed.profile);
  const moodCheckins = sanitizeCheckins(parsed.mood_checkins);
  const sessions = sanitizeSessions(parsed.conversation_sessions);
  const db = await getDatabase();
  const createdAt = typeof parsed.exported_at === "string" ? parsed.exported_at : new Date().toISOString();

  await db.execAsync("BEGIN TRANSACTION;");
  try {
    await db.runAsync(`DELETE FROM messages`);
    await db.runAsync(`DELETE FROM conversation_sessions`);
    await db.runAsync(`DELETE FROM mood_checkins`);
    await db.runAsync(`DELETE FROM user_profile`);

    await db.runAsync(
      `INSERT INTO user_profile (nickname, language_code, onboarding_done, consent_local, consent_train, consent_cloud, notification_time, streak_count, last_checkin_date, last_coping_tool_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profile.nickname,
        profile.languageCode,
        1,
        profile.consentLocal ? 1 : 0,
        profile.consentTrain ? 1 : 0,
        profile.consentCloud ? 1 : 0,
        profile.notificationTime,
        profile.streakCount,
        profile.lastCheckinDate,
        profile.lastCopingToolId,
        createdAt,
      ]
    );

    for (const session of sessions) {
      await db.runAsync(
        `INSERT INTO conversation_sessions (id, language_code, started_at, last_active_at, message_count, crisis_flagged)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          session.id,
          session.language_code,
          session.started_at,
          session.last_active_at,
          session.messages.length,
          session.crisis_flagged,
        ]
      );

      for (const message of session.messages) {
        await db.runAsync(
          `INSERT INTO messages (session_id, role, content, audio_uri, timestamp, risk_level)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            message.session_id,
            message.role,
            message.content,
            message.audio_uri ?? null,
            message.timestamp,
            message.risk_level ?? null,
          ]
        );
      }
    }

    for (const checkin of moodCheckins) {
      await db.runAsync(
        `INSERT INTO mood_checkins (emotion_id, emotion_label, follow_up_text, language_code, timestamp, session_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          checkin.emotion_id,
          checkin.emotion_label,
          checkin.follow_up_text ?? "",
          checkin.language_code,
          checkin.timestamp,
          checkin.session_id ?? null,
        ]
      );
    }

    await db.execAsync("COMMIT;");
  } catch (error) {
    await db.execAsync("ROLLBACK;");
    throw error;
  }

  return {
    ...profile,
    onboardingDone: true,
  };
}
