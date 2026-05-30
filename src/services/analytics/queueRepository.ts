import { getDatabase } from "@/services/storage/database";

export type QueuedAnalyticsEvent = {
  id: number;
  name: string;
  payload_json: string;
  created_at: string;
  attempts: number;
  last_attempt_at: string | null;
};

export async function enqueueAnalyticsEvent(name: string, payloadJson: string) {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO analytics_events (name, payload_json, created_at)
     VALUES (?, ?, ?)`,
    [name, payloadJson, new Date().toISOString()]
  );
}

export async function listQueuedAnalyticsEvents(limit = 25): Promise<QueuedAnalyticsEvent[]> {
  const db = await getDatabase();
  return db.getAllAsync<QueuedAnalyticsEvent>(
    `SELECT id, name, payload_json, created_at, attempts, last_attempt_at
     FROM analytics_events
     ORDER BY id ASC
     LIMIT ?`,
    [limit]
  );
}

export async function deleteQueuedAnalyticsEvents(ids: number[]) {
  if (ids.length === 0) return;
  const db = await getDatabase();
  const placeholders = ids.map(() => "?").join(", ");
  await db.runAsync(
    `DELETE FROM analytics_events WHERE id IN (${placeholders})`,
    ids
  );
}

export async function markAnalyticsUploadAttempt(ids: number[]) {
  if (ids.length === 0) return;
  const db = await getDatabase();
  const placeholders = ids.map(() => "?").join(", ");
  await db.runAsync(
    `UPDATE analytics_events
     SET attempts = attempts + 1, last_attempt_at = ?
     WHERE id IN (${placeholders})`,
    [new Date().toISOString(), ...ids]
  );
}

export async function clearQueuedAnalyticsEvents() {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM analytics_events`);
}

export async function pruneQueuedAnalyticsEvents(maxEvents = 200) {
  const db = await getDatabase();
  await db.runAsync(
    `DELETE FROM analytics_events
     WHERE id NOT IN (
       SELECT id FROM analytics_events
       ORDER BY id DESC
       LIMIT ?
     )`,
    [maxEvents]
  );
}
