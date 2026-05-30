# waki

ai-powered mental health companion for ghana. twi & english. voice-first. offline-ready.
---

## how it works

```
voice input → khaya asr (twi speech to text) → claude (reasoning + crisis detection) → khaya tts (text to twi speech) → audio playback
```

all conversations are stored locally with sqlite. if a crisis is detected, the app escalates immediately with emergency contacts and nearby facilities.

## tech stack

- **react native** (expo)
- **khaya api** — twi speech recognition & text-to-speech
- **claude api** — conversational ai with crisis detection
- **sqlite** — local encrypted storage
- **expo av** — audio recording & playback

## clinical safety

- never diagnoses or prescribes
- always escalates crisis signals
- never delays professional referrals
- safeguard statement on every session

---

*"you can't heal in a language that doesn't feel like home."*
