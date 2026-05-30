import { getDatabase } from "@/services/storage/database";
import type { MoodCheckin } from "@/types/mood";

export async function saveCheckin(checkin: MoodCheckin) {
  const db = await getDatabase();
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

export async function getLatest7Checkins(): Promise<MoodCheckin[]> {
  const db = await getDatabase();
  return db.getAllAsync<MoodCheckin>(
    `SELECT * FROM mood_checkins ORDER BY timestamp DESC LIMIT 7`
  );
}

export async function getAllCheckins(): Promise<MoodCheckin[]> {
  const db = await getDatabase();
  return db.getAllAsync<MoodCheckin>(
    `SELECT * FROM mood_checkins ORDER BY timestamp ASC`
  );
}

export async function getCheckins(
  fromIso: string,
  toIso: string
): Promise<MoodCheckin[]> {
  const db = await getDatabase();
  return db.getAllAsync<MoodCheckin>(
    `SELECT * FROM mood_checkins
     WHERE timestamp >= ? AND timestamp <= ?
     ORDER BY timestamp ASC`,
    [fromIso, toIso]
  );
}

export async function getWeeklyTrend(): Promise<{ date: string; count: number }[]> {
  const db = await getDatabase();
  // Returns one row per calendar day in the last 7 days, with checkin count.
  return db.getAllAsync<{ date: string; count: number }>(
    `SELECT date(timestamp) as date, COUNT(*) as count
     FROM mood_checkins
     WHERE timestamp >= date('now', '-6 days')
     GROUP BY date(timestamp)
     ORDER BY date ASC`
  );
}

export async function clearCheckins() {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM mood_checkins`);
}
