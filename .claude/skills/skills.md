# WAKI (ADPA) Architecture & Context (Claude Code Skills)

This document provides system instructions, architectural context, and specific project skills for Claude Code when working in the WAKI repository.

## Project Overview
**WAKI** is a voice-first, bilingual (English/Twi) mental health companion app for Ghana, built with React Native + Expo. All user data is stored on-device only (SQLite, no cloud sync).

## Tech Stack & Core Libraries
- **Framework:** React Native (0.83.4) + Expo (SDK 55)
- **Language:** TypeScript (Strict mode enabled)
- **Routing:** Expo Router (File-based routing)
- **State Management:** Zustand (Stores: `useUserStore`, `useConversationStore`, `useMoodStore`)
- **Persistence:** Expo SQLite (`expo-sqlite`) with WAL mode
- **Audio (CRITICAL):** Uses **`expo-audio`** (~55.0.11). **DO NOT USE `expo-av`.** The project was explicitly migrated to `expo-audio` to resolve Expo SDK 55 linking issues and provide a modern audio foundation.
- **LLM/AI Engine:** `claude-sonnet-4-20250514` via Anthropic API (custom client wrapper).
- **Speech-to-Text (ASR):** Khaya API for processing Twi voice input.
- **Text-to-Speech (TTS):** Khaya API for generating Twi speech audio. Uses `expo-speech` for English.

## App Architecture

### Directory Structure & Path Aliases
- **`@/*`** aliases to `./src/*` (configured in tsconfig/babel).
- **`src/app/`** - Expo Router screens.
  - `(onboarding)/` - Welcome, language selection, nickname, consent.
  - `(tabs)/` - Main experience routes (Home, Toolkit, Profile).
  - `conversation/[sessionId].tsx` - Chat/voice conversation screen.
  - `crisis/index.tsx` - Non-dismissible fullscreen crisis UI.
  - `checkin/` - Mood check-in feature flow.
- **`src/services/`** - Core business logic.
  - `khaya/` - REST API clients for the Khaya API (ASR and TTS) incorporating retry logic with exponential backoff for 429 errors.
  - `llm/` - Anthropic API integration (`claudeClient.ts`) and AI system prompts (`base.ts`, `twi.ts`).
  - `storage/` - SQLite database initialization, schemas, and queries (`database.ts`).
- **`src/store/`** - Global state definitions via Zustand hooks.
- **`src/i18n/`** - Custom lightweight i18n implementation with fallback mechanics focused on English and Twi string dictionaries.

### Conversation Data Flow
1. **Audio Recording:** `useVoiceInput` hook utilizes `expo-audio` to capture microphone input.
2. **Transcription:** Khaya ASR service processes the Twi audio recording to a text string.
3. **LLM Evaluation:** `claudeClient.ts` formats the most recent interaction history and context, and issues an Anthropic completion request. 
   - *Requirement:* System prompts enforce that responses are strictly valid JSON: `{ "response": "...", "risk_level": "...", "risk_indicators": "..." }`.
4. **Crisis Intervention Logic:** App handles `risk_level` triggers ("none", "low", "moderate", "high").
   - **High Risk:** Pauses standard flow and forces navigation to `/crisis` screen.
   - **Moderate Risk:** Injects a visual `CrisisBar` warning component.
5. **Speech Playback:** Text chunks (Twi) are routed back to Khaya TTS, generating audio buffers that are instantly played using `expo-audio` native capabilities. English uses `expo-speech`.
6. **Data Persistence:** Raw messages, sentiment scores, and session metadata are committed to local SQLite tracking tables.

## Clinical Safety Rules (Non-Negotiable)
Whenever evaluating, modifying, or creating features touching the LLM or chat flow:
1. **No Diagnostics/Prescriptions:** The AI is an empathetic companion, not a doctor. It must never diagnose mental health conditions or suggest medical treatment.
2. **Elicit Escapes for High Risk:** The companion must recognize self-harm or severe risks (`risk_level: "high"`) and the application layer must trigger emergency protocols (Ghana emergency resources in `src/constants/crisisContacts.ts`). The `/crisis` view is mandatory and un-dismissible.
3. **JSON Structure Integrity:** The schema enforcing the output parsing from the Claude AI model cannot be broken or altered lightly. Changes could cripple the safety extraction metrics.

## Development & Execution Workflows
- **Running Locally:** `npx expo start` (Given custom native modules, launching via `i` for iOS uses the custom development client, not standard Expo Go).
- **Environment Context:** Variables (`ANTHROPIC_API_KEY`, `KHAYA_API_KEY`) live in `.env` and map globally as `process.env.EXPO_PUBLIC_*` via `app.config.js`. Do not expose keys in codebase.

## Code generation boundaries for Agents (Agent "Skills")
1. **Audio Interoperability:** Whenever dealing with sound playing, recording, or audio permissions, strictly write code using the `expo-audio` library API (`useAudioPlayer`, `useAudioRecorder`, etc). Never write implementations using `expo-av`.
2. **Native Dependency Management:** Because standard SDK 55 components rely on an existing set of custom native dependencies, refrain from suggesting new binary dependencies without clear instructions for prebuilding a new dev profile (e.g. `npx expo run:ios`).
3. **Localization Enforcement:** Never hardcode UI text strings natively inside the React tree. Add new strings cleanly to the respective dictionaries under `src/i18n/`.
