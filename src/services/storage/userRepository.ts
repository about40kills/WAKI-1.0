import { getDatabase } from "@/services/storage/database";
import type { UserProfile } from "@/types/user";

export async function getProfile(): Promise<UserProfile | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<UserProfile>(
    `SELECT * FROM user_profile ORDER BY id ASC LIMIT 1`
  );
  return row ?? null;
}

export async function upsertProfile(profile: UserProfile) {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM user_profile`);
  await db.runAsync(
    `INSERT INTO user_profile (nickname, language_code, onboarding_done, consent_local, consent_train, consent_cloud, notification_time, streak_count, last_checkin_date, last_coping_tool_id, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      profile.nickname ?? "",
      profile.language_code,
      profile.onboarding_done,
      profile.consent_local,
      profile.consent_train ?? 0,
      profile.consent_cloud ?? 0,
      profile.notification_time ?? null,
      profile.streak_count ?? 0,
      profile.last_checkin_date ?? null,
      profile.last_coping_tool_id ?? null,
      profile.created_at,
    ]
  );
}

export async function deleteProfile() {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM user_profile`);
}
