import { SQLiteDatabase } from "expo-sqlite";
import { INITIAL_MIGRATION_SQL } from "@/services/storage/migrations/001_initial";
import { CONSENT_SETTINGS_MIGRATION_SQL } from "@/services/storage/migrations/002_consent_and_settings";
import { ANALYTICS_QUEUE_MIGRATION_SQL } from "@/services/storage/migrations/003_analytics_queue";

export async function runMigrations(db: SQLiteDatabase) {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(INITIAL_MIGRATION_SQL);
  await db.execAsync(ANALYTICS_QUEUE_MIGRATION_SQL);

  // Migration 002: add consent_train, consent_cloud, notification, streak columns.
  // ALTER TABLE ... IF NOT EXISTS is not supported in SQLite, so we check the schema.
  const cols = await db.getAllAsync<{ name: string }>(
    "PRAGMA table_info(user_profile)"
  );
  const colNames = new Set(cols.map((c) => c.name));
  if (!colNames.has("consent_train")) {
    // Run each ALTER separately — SQLite doesn't support multi-ALTER in one statement.
    const statements = CONSENT_SETTINGS_MIGRATION_SQL
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const stmt of statements) {
      await db.execAsync(stmt + ";");
    }
  }
}
