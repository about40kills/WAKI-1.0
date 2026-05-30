import { getDatabase } from "@/services/storage/database";
import type { ConversationSession, Message } from "@/types/conversation";
import type { LanguageCode } from "@/types/language";

export async function createSession(id: string, languageCode: LanguageCode) {
  const now = new Date().toISOString();
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO conversation_sessions (id, language_code, started_at, last_active_at, message_count, crisis_flagged)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, languageCode, now, now, 0, 0]
  );
}

export async function addMessage(message: Message) {
  const db = await getDatabase();
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
  await db.runAsync(
    `UPDATE conversation_sessions
     SET last_active_at = ?, message_count = message_count + 1
     WHERE id = ?`,
    [new Date().toISOString(), message.session_id]
  );
}

export async function getSessionMessages(sessionId: string): Promise<Message[]> {
  const db = await getDatabase();
  return db.getAllAsync<Message>(
    `SELECT id, session_id, role, content, audio_uri, timestamp, risk_level
     FROM messages WHERE session_id = ? ORDER BY id ASC`,
    [sessionId]
  );
}

export async function listRecentSessions(limit = 20): Promise<ConversationSession[]> {
  const db = await getDatabase();
  return db.getAllAsync<ConversationSession>(
    `SELECT id, language_code, started_at, last_active_at, message_count, crisis_flagged
     FROM conversation_sessions
     ORDER BY last_active_at DESC
     LIMIT ?`,
    [limit]
  );
}

export async function listAllSessions(): Promise<ConversationSession[]> {
  const db = await getDatabase();
  return db.getAllAsync<ConversationSession>(
    `SELECT id, language_code, started_at, last_active_at, message_count, crisis_flagged
     FROM conversation_sessions
     ORDER BY last_active_at DESC`
  );
}

export async function deleteSession(sessionId: string) {
  const db = await getDatabase();
  // Delete messages first (FK relationship), then the session.
  await db.runAsync(`DELETE FROM messages WHERE session_id = ?`, [sessionId]);
  await db.runAsync(`DELETE FROM conversation_sessions WHERE id = ?`, [sessionId]);
}

export async function clearConversationData() {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM messages`);
  await db.runAsync(`DELETE FROM conversation_sessions`);
}
