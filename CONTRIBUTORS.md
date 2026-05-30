# WAKI 1.0 — Hackathon Contribution Guide

> **5 contributors · Conventional Commits · File ownership below**

---

## Team & File Ownership

Each person owns the files listed under their name. Only edit your files unless you coordinate with the owner first.

---

### Member 1 · Yaw — LLM & AI Services

| File |
|------|
| `src/services/llm/claudeClient.ts` |
| `src/services/llm/conversationService.ts` |
| `src/services/llm/crisisDetectionService.ts` |
| `src/services/llm/modeClassifier.ts` |
| `src/services/llm/systemPrompts/base.ts` |
| `src/services/llm/systemPrompts/twi.ts` |
| `src/services/llm/systemPrompts/dagbani.ts` |
| `src/services/llm/systemPrompts/ewe.ts` |
| `src/services/llm/systemPrompts/ga.ts` |

**Pre-written commits (copy-paste on the day):**

```bash
git add src/services/llm/claudeClient.ts
git commit -m "feat(llm): add retry logic for 529 overload with exponential backoff"

git add src/services/llm/systemPrompts/base.ts
git commit -m "feat(llm): define clinical safety rules and JSON response schema in base prompt"

git add src/services/llm/systemPrompts/twi.ts src/services/llm/systemPrompts/ga.ts \
        src/services/llm/systemPrompts/dagbani.ts src/services/llm/systemPrompts/ewe.ts
git commit -m "feat(llm): add Twi, Ga, Dagbani and Ewe cultural addenda to system prompts"

git add src/services/llm/crisisDetectionService.ts src/services/llm/modeClassifier.ts
git commit -m "feat(llm): implement crisis detection service and conversation mode classifier"

git add src/services/llm/conversationService.ts
git commit -m "refactor(llm): extract conversation orchestration into dedicated service"
```

---

### Member 2 · Davis — App Shell, Navigation & State

| File |
|------|
| `src/app/_layout.tsx` |
| `src/app/index.tsx` |
| `src/app/(tabs)/_layout.tsx` |
| `src/app/(tabs)/home.tsx` |
| `src/store/userStore.ts` |
| `src/store/conversationStore.ts` |
| `app.config.js` |
| `babel.config.js` |
| `tsconfig.json` |

**Pre-written commits:**

```bash
git add src/app/_layout.tsx src/app/index.tsx src/store/userStore.ts
git commit -m "feat(app): initialise root layout with SQLite and auth routing"

git add src/app/(tabs)/_layout.tsx src/app/(tabs)/home.tsx
git commit -m "feat(tabs): wire up home tab with user greeting and daily prompt"

git add src/store/conversationStore.ts
git commit -m "feat(store): add active session and risk level state to conversation store"

git add app.config.js babel.config.js tsconfig.json
git commit -m "chore(config): update path aliases and env variable injection"
```

---

### Member 3 · Kwadwo — Voice, Audio & Khaya Integration

| File |
|------|
| `src/services/khaya/khayaClient.ts` |
| `src/services/khaya/asr.ts` |
| `src/services/khaya/tts.ts` |
| `src/services/audio/audioMode.ts` |
| `src/services/audio/player.ts` |
| `src/services/audio/copingPlayer.ts` |
| `src/services/audio/permissions.ts` |
| `src/hooks/useVoiceInput.ts` |
| `src/hooks/useAudioPlayback.ts` |
| `src/hooks/useAudioPlayback.web.ts` |

**Pre-written commits:**

```bash
git add src/services/khaya/khayaClient.ts
git commit -m "feat(khaya): configure Khaya base client with 429 retry and exponential backoff"

git add src/services/khaya/asr.ts
git commit -m "feat(khaya): implement Twi ASR — audio → text transcription"

git add src/services/khaya/tts.ts
git commit -m "feat(khaya): implement Twi TTS with in-memory audio caching"

git add src/services/audio/audioMode.ts src/services/audio/permissions.ts \
        src/services/audio/player.ts src/services/audio/copingPlayer.ts
git commit -m "feat(audio): set up AVAudioSession, permissions handling and coping audio player"

git add src/hooks/useVoiceInput.ts src/hooks/useAudioPlayback.ts src/hooks/useAudioPlayback.web.ts
git commit -m "feat(hooks): add useVoiceInput and useAudioPlayback hooks for recording and playback"
```

---

### Member 5 · Isaac — Conversation UI, Crisis Flow, Onboarding, i18n & Shared UI

| File |
|------|
| `src/app/conversation/[sessionId].tsx` |
| `src/app/conversation/_layout.tsx` |
| `src/app/crisis/index.tsx` |
| `src/components/conversation/ChatInterface.tsx` |
| `src/components/conversation/CrisisModal.tsx` |
| `src/components/conversation/StreamingText.tsx` |
| `src/components/conversation/TranscriptDisplay.tsx` |
| `src/components/conversation/VoiceInputOverlay.tsx` |
| `src/components/ui/CrisisBar.tsx` |
| `src/components/ui/MessageBubble.tsx` |
| `src/components/ui/VoiceButton.tsx` |
| `src/constants/crisisContacts.ts` |
| `src/services/location/nearbyFacilities.ts` |
| `src/services/location/phoneLookup.ts` |
| `src/app/(onboarding)/_layout.tsx` |
| `src/app/(onboarding)/welcome.tsx` |
| `src/app/(onboarding)/language-select.tsx` |
| `src/app/(onboarding)/nickname.tsx` |
| `src/app/(onboarding)/consent.tsx` |
| `src/app/(onboarding)/first-checkin.tsx` |
| `src/app/(tabs)/profile.tsx` |
| `src/app/(tabs)/toolkit.tsx` |
| `src/app/(tabs)/learn.tsx` |
| `src/app/(tabs)/stories.tsx` |
| `src/app/learn/[moduleId].tsx` |
| `src/app/stories/[storyId].tsx` |
| `src/app/toolkit/[toolId].tsx` |
| `src/app/settings.tsx` |
| `src/i18n/index.ts` |
| `src/i18n/en.json` |
| `src/i18n/tw.json` |
| `src/i18n/ee.json` |
| `src/i18n/gaa.json` |
| `src/i18n/dag.json` |
| `src/constants/colors.ts` |
| `src/constants/typography.ts` |
| `src/constants/emotions.ts` |
| `src/constants/languages.ts` |
| `src/constants/copingTools.ts` |
| `src/constants/copingToolIcons.ts` |
| `src/constants/psychoedModules.ts` |
| `src/constants/stories.ts` |
| `src/constants/liquidGlassSpring.ts` |
| `src/components/shared/AppBackground.tsx` |
| `src/components/shared/ErrorBoundary.tsx` |
| `src/components/shared/LanguageText.tsx` |
| `src/components/shared/OfflineBanner.tsx` |
| `src/components/shared/PermissionGate.tsx` |
| `src/components/shared/SafeAreaWrapper.tsx` |
| `src/components/shared/ScreenHeader.tsx` |
| `src/components/navigation/LiquidChrome.tsx` |
| `src/components/navigation/LiquidGlassTabBar.tsx` |
| `src/components/navigation/LiquidTabBarButton.tsx` |
| `src/components/navigation/liquidTabSceneStyleInterpolator.ts` |
| `src/components/ui/AudioPlayer.tsx` |
| `src/components/ui/CopingCard.tsx` |
| `src/components/ui/GlassSurface.tsx` |
| `src/components/ui/LanguagePill.tsx` |
| `src/components/ui/LearnModuleCard.tsx` |
| `src/components/ui/LiquidGlassPressable.tsx` |
| `src/components/ui/LiquidGlassSheen.tsx` |
| `src/components/ui/LoadingWave.tsx` |
| `src/components/ui/SafetyCheckModal.tsx` |
| `src/components/ui/StoryCard.tsx` |
| `src/theme/ThemeProvider.tsx` |
| `src/services/analytics/client.ts` |
| `src/services/analytics/queueRepository.ts` |
| `src/utils/audioUtils.ts` |
| `src/utils/dateUtils.ts` |
| `src/utils/localizedContent.ts` |
| `src/utils/riskScoring.ts` |
| `src/types/` *(all type files)* |

**Pre-written commits:**

```bash
git add src/app/conversation/[sessionId].tsx src/app/conversation/_layout.tsx
git commit -m "feat(conversation): scaffold session screen with voice and text input modes"

git add src/components/conversation/ChatInterface.tsx \
        src/components/conversation/StreamingText.tsx \
        src/components/conversation/TranscriptDisplay.tsx \
        src/components/conversation/VoiceInputOverlay.tsx
git commit -m "feat(conversation): build chat interface with streaming text and voice overlay"

git add src/components/ui/MessageBubble.tsx src/components/ui/VoiceButton.tsx
git commit -m "feat(ui): add MessageBubble and VoiceButton components"

git add src/app/crisis/index.tsx src/components/conversation/CrisisModal.tsx \
        src/components/ui/CrisisBar.tsx
git commit -m "feat(crisis): implement non-dismissible crisis screen and moderate-risk banner"

git add src/constants/crisisContacts.ts src/services/location/nearbyFacilities.ts \
        src/services/location/phoneLookup.ts
git commit -m "feat(crisis): embed Ghana emergency contacts and add nearby facilities lookup via OSM"

git add src/app/(onboarding)/
git commit -m "feat(onboarding): build welcome → language → nickname → consent → first check-in flow"

git add src/i18n/index.ts src/i18n/en.json src/i18n/tw.json \
        src/i18n/ee.json src/i18n/gaa.json src/i18n/dag.json
git commit -m "feat(i18n): add English, Twi, Ewe, Ga and Dagbani locale files with interpolation"

git add src/constants/colors.ts src/constants/typography.ts \
        src/constants/languages.ts src/constants/emotions.ts \
        src/constants/liquidGlassSpring.ts
git commit -m "feat(constants): define colour palette, typography, language registry and animation springs"

git add src/constants/copingTools.ts src/constants/copingToolIcons.ts \
        src/constants/psychoedModules.ts src/constants/stories.ts
git commit -m "feat(constants): add coping tools, psychoeducation modules and community stories data"

git add src/components/shared/ src/components/navigation/ src/theme/ThemeProvider.tsx
git commit -m "feat(ui): add shared layout components, liquid glass navigation and ThemeProvider"

git add src/components/ui/CopingCard.tsx src/components/ui/GlassSurface.tsx \
        src/components/ui/LiquidGlassPressable.tsx src/components/ui/LiquidGlassSheen.tsx \
        src/components/ui/LoadingWave.tsx src/components/ui/StoryCard.tsx \
        src/components/ui/LearnModuleCard.tsx src/components/ui/AudioPlayer.tsx \
        src/components/ui/LanguagePill.tsx src/components/ui/SafetyCheckModal.tsx
git commit -m "feat(ui): build coping, story, learn, audio and glass surface UI components"

git add src/app/(tabs)/toolkit.tsx src/app/(tabs)/learn.tsx \
        src/app/(tabs)/stories.tsx src/app/(tabs)/profile.tsx \
        src/app/toolkit/[toolId].tsx src/app/learn/[moduleId].tsx \
        src/app/stories/[storyId].tsx src/app/settings.tsx
git commit -m "feat(tabs): implement Toolkit, Learn, Stories, Profile screens and detail routes"

git add src/utils/ src/types/ src/services/analytics/
git commit -m "feat(utils): add date, audio, risk scoring utilities, TypeScript types and analytics client"
```

---

### Member 4 · Paul — Mood Check-ins, Storage & Data

| File |
|------|
| `src/app/checkin/index.tsx` |
| `src/store/moodStore.ts` |
| `src/hooks/useMoodData.ts` |
| `src/components/checkin/CheckinSummary.tsx` |
| `src/components/checkin/EmotionWheelPicker.tsx` |
| `src/components/checkin/MoodFollowUp.tsx` |
| `src/components/ui/MoodChart.tsx` |
| `src/components/ui/EmotionWheel.tsx` |
| `src/services/storage/database.ts` |
| `src/services/storage/conversationRepository.ts` |
| `src/services/storage/moodRepository.ts` |
| `src/services/storage/userRepository.ts` |
| `src/services/storage/exportData.ts` |
| `src/services/storage/migrations/001_initial.ts` |
| `src/services/storage/migrations/002_consent_and_settings.ts` |
| `src/services/storage/migrations/003_analytics_queue.ts` |
| `src/services/storage/migrations/index.ts` |
| `src/services/notifications/checkinScheduler.ts` |

**Pre-written commits:**

```bash
git add src/services/storage/database.ts src/services/storage/migrations/
git commit -m "feat(storage): initialise SQLite with WAL mode and run schema migrations"

git add src/services/storage/userRepository.ts \
        src/services/storage/conversationRepository.ts \
        src/services/storage/moodRepository.ts
git commit -m "feat(storage): add user, conversation and mood repositories"

git add src/store/moodStore.ts src/hooks/useMoodData.ts
git commit -m "feat(store): create mood Zustand store and useMoodData hook"

git add src/app/checkin/index.tsx src/components/checkin/
git commit -m "feat(checkin): build mood check-in flow with emotion wheel and follow-up"

git add src/components/ui/MoodChart.tsx src/components/ui/EmotionWheel.tsx
git commit -m "feat(ui): add MoodChart and EmotionWheel visualisation components"

git add src/services/storage/exportData.ts src/services/notifications/checkinScheduler.ts
git commit -m "feat(storage): add data export utility and daily check-in notification scheduler"
```

---

## Conventional Commit Reference

```
<type>(<scope>): <short description>

Types:
  feat      — new feature
  fix       — bug fix
  refactor  — code restructure, no behaviour change
  style     — formatting, no logic change
  chore     — build, config, dependencies
  docs      — documentation only
  test      — tests only

Scopes (use the ones relevant to your files):
  app · tabs · onboarding · conversation · crisis
  llm · khaya · audio · storage · store
  ui · hooks · i18n · constants · utils · config
```

---

## GitHub Repo Setup

The repo lives at **`https://github.com/about40kills/WAKI-1.0`** (create it first — steps below).

**One-time setup for each contributor:**

```bash
# Clone the repo
git clone https://github.com/about40ills/WAKI-1.0.git
cd "WAKI-1.0"

# Install dependencies
npm install

# Create your feature branch (use your name)
git checkout -b feat/yaw-llm-services       # Yaw
git checkout -b feat/davis-app-shell         # Davis
git checkout -b feat/kwadwo-voice-audio      # Kwadwo
git checkout -b feat/isaac-conversation-ui   # Isaac
git checkout -b feat/paul-storage-checkin    # Paul

# Copy .env.example → .env and fill in your API keys
cp .env.example .env
```

**On hackathon day:**

```bash
# 1. Make sure you're on your branch
git checkout feat/YOUR-branch-name

# 2. Edit your allocated files
# 3. Stage and commit using the pre-written commits above
# 4. Push
git push origin feat/YOUR-branch-name

# 5. Open a Pull Request on GitHub → merge into main
```

---

## Creating the Repo (Davis — do this once)

```bash
# Go to https://github.com/new
# Name: WAKI-1.0
# Visibility: Public (or Private)
# Do NOT initialise with README — the code already exists

# Then in the project directory:
git remote rename origin old-waki
git remote add origin https://github.com/about40kills/WAKI-1.0.git
git push -u origin main
```

> **.env is already in .gitignore** — API keys are safe.
