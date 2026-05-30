# WAKI — Developer Setup

**AI-powered mental health companion for Ghana. Twi & English. Voice-first. Offline-ready.**

---

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo@latest`
- iOS Simulator or Android Emulator (or Expo Go on physical device)

### 2. Install dependencies
```bash
# From the repository root
npm install
```

### 3. Configure API keys
```bash
cp .env.example .env
```
Edit `.env` and add your keys:
- `KHAYA_API_KEY` — Apply at [ghananlp.org](https://ghananlp.org)
- `ANTHROPIC_API_KEY` — Get at [console.anthropic.com](https://console.anthropic.com)

### 4. Run
```bash
npx expo start
# Press 'i' for iOS, 'a' for Android, scan QR for Expo Go
```

---

## Architecture Overview

```
Voice input (Expo AV)
    ↓
Khaya ASR (Twi speech → text)
    ↓
Claude API (reasoning + crisis detection)
    ↓
Khaya TTS (text → Twi speech)
    ↓
Audio playback (Expo AV)
    ↓
SQLite (local encrypted storage)

Crisis screen (high risk)
    ↓
Static contacts (crisisContacts.ts) + optional “nearby” list
    ↓
Device geolocation (expo-location)
    ↓
OpenStreetMap Overpass API (nearby hospitals/clinics)
    ↓
DuckDuckGo scraping (phone number enrichment, best-effort)
    ↓
Maps app (iOS: maps.apple.com ?ll=lat,lon — not maps:0,0)
```

## Key Files

| File | Purpose |
|------|---------|
| `src/services/llm/systemPrompts/base.ts` | Master system prompt — clinical rules, crisis detection |
| `src/services/llm/systemPrompts/twi.ts` | Twi language + cultural addendum |
| `src/services/llm/claudeClient.ts` | Anthropic API integration |
| `src/services/khaya/asr.ts` | Khaya speech recognition |
| `src/services/khaya/tts.ts` | Khaya text-to-speech |
| `src/app/conversation/[sessionId].tsx` | Main conversation screen |
| `src/app/crisis/index.tsx` | Crisis pathway (full-screen, non-dismissible) + nearby facilities |
| `src/constants/crisisContacts.ts` | Verified Ghana mental health & emergency contacts (see `docs/CRISIS_PROTOCOL.md`) |
| `src/services/location/nearbyFacilities.ts` | Geolocation-based hospital/clinic finder (Overpass API) |
| `src/services/location/phoneLookup.ts` | Web-scraped phone number enrichment |

## Demo Flow (90 Seconds)

1. Language select → tap **Twi**
2. Home screen → tap **"Kasa me ho"** (Talk to me)
3. Tap mic → speak in Twi → watch ASR transcribe → Claude responds → Khaya TTS plays
4. Notice CrisisBar appear on mild risk signal
5. Navigate to Toolkit → play 15s of grounding audio in Twi
6. Navigate to Profile → show 7-day mood chart + privacy settings

## Build Priority Order

1. ✅ System prompts (`base.ts` + `twi.ts`)
2. ✅ Conversation screen + Claude API
3. ✅ Khaya ASR integration
4. ✅ Khaya TTS integration
5. ✅ Crisis detection + crisis screen + nearby facilities finder
6. ✅ Grounding tool with audio
7. ✅ Mood check-in + 7-day chart
8. ✅ Onboarding flow
9. ✅ Home screen + profile

## Clinical Non-Negotiables

- Never diagnose
- Never prescribe
- Always escalate crisis (risk_level: "high" → crisis screen, always)
- Never delay a professional referral
- Safeguard statement visible on every session header

---

*"You can't heal in a language that doesn't feel like home."*
