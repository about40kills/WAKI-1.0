# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Approach

-Think before acting. Read existing files before writing code.
-Be concise in output but thorough in reasoning.
-Prefer editing over rewriting whole files.
-Do not re-read files you have already read unless file may have been changed.
-Test your code before declaring done.
-No syncopathic openers or closing fluff
-Keep solutions simple and direct.
-Use instructions always overrride this file.

## Commands

```bash
npm install          # Install dependencies
npx expo start       # Start dev server (scan QR or press i/a for simulator)
npx expo start --ios     # iOS simulator
npx expo start --android # Android emulator
```

No test runner or linter is configured. TypeScript strict mode is on (`tsconfig.json`).

## Environment Setup

Create a `.env` file with:
```
ANTHROPIC_API_KEY=...   # https://console.anthropic.com
KHAYA_API_KEY=...       # https://ghananlp.org (Twi ASR/TTS)
```

These are injected at build time via `app.config.js` as `process.env.EXPO_PUBLIC_*`.

## Architecture

**WAKI** is a voice-first, bilingual (English/Twi) mental health companion app for Ghana, built with React Native + Expo. All user data is stored on-device only (SQLite, no cloud sync).

### Navigation (Expo Router — file-based)
```
src/app/
├── (onboarding)/     # Welcome → language → nickname → consent
├── (tabs)/           # Home, Toolkit, Profile (main experience)
├── conversation/[sessionId].tsx  # Chat/voice session
├── crisis/index.tsx  # Non-dismissible fullscreen crisis screen
└── checkin/          # Mood check-in flow
```

The root `_layout.tsx` initializes SQLite, loads the user profile, and routes to onboarding or tabs.

### Data Flow for a Conversation Turn
1. **Voice input** — `useVoiceInput` hook records audio via `expo-av`
2. **Transcription** — Khaya ASR (`src/services/khaya/asr.ts`) converts Twi audio → text
3. **LLM** — `claudeClient.ts` sends last 10 turns to Codex (`Codex-sonnet-4-20250514`), receiving a JSON response: `{ response, risk_level, risk_indicators }`
4. **Crisis routing** — If `risk_level === "high"`, the app navigates to `/crisis`; "moderate" shows a `CrisisBar` banner
5. **TTS** — Khaya TTS (`src/services/khaya/tts.ts`) converts response text → Twi audio (cached in-memory); English uses `expo-speech`
6. **Persistence** — Messages and sessions saved to SQLite via `src/services/storage/`

### State Management (Zustand)
- `useUserStore` — nickname, language preference, onboarding/consent flags
- `useConversationStore` — active session, messages, risk level
- `useMoodStore` — mood check-in history

### Service Layer
- `src/services/llm/claudeClient.ts` — Codex API calls, retry on 529 (up to 2x with backoff)
- `src/services/llm/systemPrompts/base.ts` — **Clinical safety rules** (140+ lines; defines risk levels, forbidden actions, JSON response format)
- `src/services/llm/systemPrompts/twi.ts` — Twi cultural/linguistic addendum
- `src/services/khaya/khayaClient.ts` — Khaya base client with 429 retry (3x exponential backoff)
- `src/services/storage/database.ts` — SQLite init with WAL mode, 4 tables: `user_profile`, `conversation_sessions`, `messages`, `mood_checkins`

### Internationalization
Custom i18n at `src/i18n/index.ts`. Supported locales: `en`, `tw` (Twi). Uses `{{variableName}}` interpolation. Falls back to English if a Twi key is missing.

## Clinical Safety — Non-Negotiable Rules

The system prompt in `src/services/llm/systemPrompts/base.ts` defines hard rules that must never be undermined:
- Codex always responds as JSON: `{ response, risk_level, risk_indicators }`
- `risk_level` values: `none | low | moderate | high`
- **HIGH risk** (suicidal ideation, self-harm intent) → always navigate to `/crisis`; this screen is non-dismissible until the user confirms they are safe
- The app never diagnoses, prescribes, or acts as a therapist — it is a supportive companion only
- Crisis contacts (Ghana emergency numbers) are embedded in `src/constants/crisisContacts.ts` — never fetched at runtime; see `docs/CRISIS_PROTOCOL.md` for the April 2026 contact refresh and maps deep-link behaviour (`maps.apple.com/?ll=` on iOS, not `maps:0,0`)

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json` and `babel.config.js`).
