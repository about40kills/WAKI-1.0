import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";
import { runMigrations } from "@/services/storage/migrations";

let dbPromise: Promise<SQLiteDatabase> | null = null;

export function getDatabase() {
  if (!dbPromise) {
    dbPromise = openDatabaseAsync("waki.db").then(async (db) => {
      await runMigrations(db);
      return db;
    });
  }
  return dbPromise;
}
