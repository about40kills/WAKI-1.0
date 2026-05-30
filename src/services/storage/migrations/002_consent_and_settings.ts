export const CONSENT_SETTINGS_MIGRATION_SQL = `
ALTER TABLE user_profile ADD COLUMN consent_train INTEGER DEFAULT 0;
ALTER TABLE user_profile ADD COLUMN consent_cloud INTEGER DEFAULT 0;
ALTER TABLE user_profile ADD COLUMN notification_time TEXT DEFAULT NULL;
ALTER TABLE user_profile ADD COLUMN streak_count INTEGER DEFAULT 0;
ALTER TABLE user_profile ADD COLUMN last_checkin_date TEXT DEFAULT NULL;
ALTER TABLE user_profile ADD COLUMN last_coping_tool_id TEXT DEFAULT NULL;
`;
