export const INITIAL_MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS user_profile (
  id INTEGER PRIMARY KEY,
  nickname TEXT,
  language_code TEXT,
  onboarding_done INTEGER,
  consent_local INTEGER,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS conversation_sessions (
  id TEXT PRIMARY KEY,
  language_code TEXT,
  started_at TEXT,
  last_active_at TEXT,
  message_count INTEGER,
  crisis_flagged INTEGER
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY,
  session_id TEXT,
  role TEXT,
  content TEXT,
  audio_uri TEXT,
  timestamp TEXT,
  risk_level TEXT
);

CREATE TABLE IF NOT EXISTS mood_checkins (
  id INTEGER PRIMARY KEY,
  emotion_id TEXT,
  emotion_label TEXT,
  follow_up_text TEXT,
  language_code TEXT,
  timestamp TEXT,
  session_id TEXT
);
`;
