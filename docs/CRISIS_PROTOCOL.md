# Crisis Protocol

## Risk Levels

- none: casual or stable conversation
- low: stress, mild sadness, academic pressure
- moderate: strong hopelessness, withdrawal, severe distress signals
- high: self-harm intent, suicidal ideation, harm to others

## Escalation Rules

1. Parse risk level from Claude structured output.
2. low: show dismissible CrisisBar.
3. moderate: show intervention modal and support prompt.
4. high: interrupt flow and route to `/crisis` immediately.

## Crisis Screen Requirements

- Not dismissible via back button.
- Show safety check options (Yes / Not sure — get help).
- Show static emergency contacts from `src/constants/crisisContacts.ts` (bundled at build time; **not** fetched over the network).

## Static crisis contacts (curated)

- **Source of truth:** `src/constants/crisisContacts.ts` (see inline comment for verification notes).
- **April 2026 revision:** Numbers were corrected against official or government-backed listings where possible:
  - Mental Health Authority toll-free helpline **0800678678** ([mha-ghana.com/contact](https://mha-ghana.com/contact/))
  - Accra Psychiatric Hospital **+233302228688** (published main line 0302 228688)
  - Pantang Psychiatric Hospital **+233551585830** (GHANEPS organisation directory)
  - National short codes **193** (ambulance), **191** (police), **112** (toll-free national emergency line)
- **Removed / replaced:** Prior entries that did not match published numbers (e.g. incorrect Accra Psychiatric line, non-public MHA landline, unverified regional hospital as default, and a combined `999 / 112` string that also broke the in-app Call action on iOS).
- **Maintenance:** Re-verify contacts before major releases; update the constant and this section together.

## Nearby facilities and maps deep links

- **Nearby help** uses `expo-location` plus OpenStreetMap Overpass (see `src/services/location/nearbyFacilities.ts`) for facilities within 10 km. Optional phone enrichment uses best-effort lookup and is **not** clinically verified.
- **Opening maps:** Tapping a facility must pass real coordinates into the maps app.
  - **iOS:** `maps://maps.apple.com/?ll=<lat>,<lon>&q=<label>` (centre + query pin).
  - **Android:** `geo:<lat>,<lon>?q=...`
- **Regression guard:** Do **not** use `maps:0,0?q=...` on iOS — the `0,0` segment is interpreted as the map centre (0°N, 0°E, Gulf of Guinea), not a placeholder.

---

*If you maintain a separate Word/PDF report (e.g. `WAKI_Final_Year_Project_Documentation.docx`), copy the “Static crisis contacts” and “Nearby facilities and maps deep links” bullets into the crisis / implementation chapter so the written report matches the shipped app.*
