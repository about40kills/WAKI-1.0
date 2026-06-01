# Audit Audio Imports

Scan all TypeScript files for unsafe top-level `expo-av` imports that will crash route registration.

**Usage:** `/audit-audio`  
No arguments needed.

## What to do

1. Search the entire `src/` directory for any of these patterns:
   - `import { Audio } from "expo-av"`
   - `import { Audio,` (partial import including Audio)
   - `import * as ExpoAV from "expo-av"` at top level (not inside a function)
   - `const { AndroidOutputFormat` or `const { IOSAudioQuality` at module scope (outside any function)

2. Also search for **correct** usage to confirm:
   - `getExpoAV()` calls
   - `import { getExpoAV }` from `@/services/audio/expoAv`

3. Report:
   - **UNSAFE** files (top-level expo-av imports) — these will crash Expo Router route registration
   - **SAFE** files (using getExpoAV correctly)
   - Any file that imports from `expo-av` but is NOT in `src/services/audio/expoAv.ts` is suspect

4. For each unsafe file found, show the exact line(s) and fix them by moving the import inside the relevant async function, using `getExpoAV()?.Audio` instead.

## Why this matters

Expo Router evaluates module trees during route registration. Any top-level `require('ExponentAV')` call that throws (because the native module isn't ready) prevents the route from being registered, showing "Unmatched route" errors at runtime. The only safe entry point is `getExpoAV()` in `src/services/audio/expoAv.ts`, which lazy-loads via `require()` inside a try/catch.
