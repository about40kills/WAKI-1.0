import { createAudioPlayer } from "expo-audio";
import { ensurePlaybackAudioMode } from "@/services/audio/audioMode";

// Fire-and-forget playback used for TTS responses.
export async function playAudioUri(uri: string) {
  await ensurePlaybackAudioMode();
  const player = createAudioPlayer(uri, { updateInterval: 150 });
  const subscription = player.addListener("playbackStatusUpdate", (status) => {
    const reachedEnd = status.duration > 0 && status.currentTime >= status.duration - 0.05;
    if (!status.playing && reachedEnd) {
      subscription.remove();
      player.remove();
    }
  });
  player.play();
  return player;
}

export type { AudioPlayerHandle } from "@/services/audio/copingPlayer";
export { createAudioPlayer } from "@/services/audio/copingPlayer";
