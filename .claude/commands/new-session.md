# New Dev Session

Bootstrap your context at the start of a new development session on WAKI.

**Usage:** `/new-session`

## What to do

1. Read `CLAUDE.md` to load the project rules.
2. Run a quick audit:
   - Check `src/services/audio/recorder.ts` for top-level `import { Audio } from "expo-av"` — this is the most frequently regressed bug. If found, fix it immediately (use `getExpoAV()` inside the function body).
   - Check that `src/services/audio/expoAv.ts` exists.
3. Read `src/app/(tabs)/_layout.tsx` to confirm `LiquidChrome` and `LiquidTabBarButton` imports resolve.
4. Report to the user:
   - **Green:** files that are clean
   - **Red:** any issues found and the fix applied
   - **Ready:** confirm the project is in a runnable state and suggest `npx expo run:ios` if any native files were touched

## Why

The linter repeatedly reverts `recorder.ts` to top-level `expo-av` imports. Catching this at session start avoids "Unmatched route" crashes that waste debugging time.
