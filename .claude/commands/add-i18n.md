# Add i18n Key

Add a new localization key to both `src/i18n/en.json` and `src/i18n/tw.json`.

**Usage:** `/add-i18n <dotted.key.path> "<English text>" "[Twi text or MISSING]"`  
**Example:** `/add-i18n checkin.skipButton "Skip for now" "Kɔ so"`

## What to do

The argument is `$ARGUMENTS`. Parse it as: `<key>` `"<english>"` `"<twi>"`.

1. Read `src/i18n/en.json` and `src/i18n/tw.json`.
2. Insert the key at the correct nested path in **both** files, maintaining alphabetical order within each object.
3. For the Twi value: if the user provided a translation, use it. If they wrote "MISSING" or omitted it, use `"[tw] <English text>"` as a placeholder.
4. Show the user a diff-style summary of what was added to each file.
5. Remind the user to replace any `[tw]` placeholder with a real Twi translation.

## Rules
- Key paths use dot notation mapping to nested JSON (e.g. `checkin.skipButton` → `{ "checkin": { "skipButton": "..." } }`)
- Never flatten nested keys — preserve the existing structure
- Do not add duplicate keys; if the key already exists, warn the user and show the current value
