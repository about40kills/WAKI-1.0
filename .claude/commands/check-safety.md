# Check Clinical Safety

Review a code change or file for violations of WAKI's non-negotiable clinical safety rules.

**Usage:** `/check-safety [file-path or description of change]`  
**Example:** `/check-safety src/services/llm/claudeClient.ts`

## What to do

The argument is `$ARGUMENTS`. Read the file(s) or review the described change.

Check for violations of these rules:

### 1. LLM Response Schema
The Claude API response must always be parsed as `{ response, risk_level, risk_indicators }`. Verify:
- [ ] No code strips or ignores `risk_level` from the LLM response
- [ ] `risk_level` is always propagated to the UI layer
- [ ] The system prompt in `src/services/llm/systemPrompts/base.ts` is not weakened

### 2. Crisis Routing
- [ ] `risk_level === "high"` **always** navigates to `/crisis` — no exceptions, no dismissal
- [ ] The `/crisis` screen (`src/app/crisis/index.tsx`) has back-button blocked
- [ ] `risk_level === "moderate"` shows `CrisisBar` (warning banner), not a dismissible modal

### 3. No Diagnosis / Prescription
- [ ] No UI text or AI prompt instructs the model to diagnose conditions or suggest medication
- [ ] The companion is described as a "supportive companion", not a therapist or doctor

### 4. Crisis Contacts & crisis maps
- [ ] Ghana emergency and mental-health numbers are sourced from `src/constants/crisisContacts.ts` only — never hardcoded inline or fetched from network
- [ ] Each entry uses a single dialable `number` string (no ` / ` in one field) so the crisis screen can offer **Call** via `tel:` where appropriate
- [ ] Nearby facility → maps uses real coordinates on iOS (`maps://maps.apple.com/?ll=lat,lon`), not `maps:0,0` (which centres on 0°N 0°E)

### 5. Data Privacy
- [ ] No conversation data, mood data, or user PII is sent to any third party except the Anthropic API (LLM) and Khaya API (ASR/TTS)
- [ ] All storage goes through `src/services/storage/` (SQLite, on-device only)

Report each violation with the file path, line number, and a suggested fix. If no violations are found, confirm the file is safe.
