import { setAudioModeAsync } from "expo-audio";

/** After recording, iOS keeps `allowsRecordingIOS` on which routes playback to the earpiece. This resets it. */
export async function ensurePlaybackAudioMode(): Promise<void> {
  try {
    await setAudioModeAsync({
      allowsRecording: false,
      playsInSilentMode: true,
      interruptionMode: "duckOthers",
      shouldRouteThroughEarpiece: false,
    });
  } catch (e) {
    console.warn("[audioMode] ensurePlaybackAudioMode failed:", e);
  }
}
