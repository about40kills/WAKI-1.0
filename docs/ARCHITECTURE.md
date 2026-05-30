# WAKI Architecture (Hackathon MVP)

- Voice input on device -> Khaya ASR
- Transcribed text -> Claude (base + Twi prompt layers, last 10 turns)
- Claude response -> structured JSON (`response`, `risk_level`, `risk_indicators`)
- Response text displayed in chat and optionally spoken with Khaya TTS
- Crisis level controls UI escalation
- `/crisis` shows curated contacts from `crisisContacts.ts`, optional OSM-based “nearby” facilities, and opens maps with correct `ll=` coordinates on iOS (see `docs/CRISIS_PROTOCOL.md`)
- SQLite stores sessions, messages, and mood check-ins locally
- SecureStore keeps user preferences and consent state
