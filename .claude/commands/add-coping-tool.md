# Add Coping Tool

Add a new coping tool to the WAKI toolkit.

**Usage:** `/add-coping-tool`

## What to do

Ask the user for:
1. **Tool ID** — unique snake_case string (e.g. `box_breathing`)
2. **Title (English)** — display name
3. **Title (Twi)** — Twi translation (or "MISSING" for placeholder)
4. **Description (English)** — 1-2 sentence description
5. **Description (Twi)** — Twi translation (or "MISSING")
6. **Type** — one of: `breathing`, `grounding`, `journaling`, `audio`, `exercise`
7. **Audio files** — if type is `audio`, ask for the asset filenames (place them in `src/assets/audio/`)

Then:

1. Read `src/constants/copingTools.ts` and add the new tool entry to the array following the existing structure. For audio sources, use `require("@/assets/audio/<filename>")`.

2. Add i18n keys to `src/i18n/en.json` and `src/i18n/tw.json`:
   - `toolkit.tools.<id>.title`
   - `toolkit.tools.<id>.description`

3. If type is `audio`, remind the user to place the audio files in `src/assets/audio/` before running the app.

## Tool data shape (reference from copingTools.ts)

```ts
{
  id: string;
  title: string;           // i18n key
  description: string;     // i18n key
  type: "breathing" | "grounding" | "journaling" | "audio" | "exercise";
  audioSource?: {
    en: AVPlaybackSource;
    tw: AVPlaybackSource;
  };
}
```

## Rules
- Tool IDs must be unique — check the existing list before adding
- `title` and `description` fields hold i18n **keys**, not raw strings
- Audio assets must use `require()` (static import), never dynamic URIs, so Metro can bundle them
