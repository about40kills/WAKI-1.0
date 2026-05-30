import {
  createAudioPlayer as createExpoAudioPlayer,
  type AudioSource,
} from "expo-audio";
import { Asset } from "expo-asset";
import { ensurePlaybackAudioMode } from "@/services/audio/audioMode";

export interface AudioPlayerHandle {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  stop: () => Promise<void>;
}

/**
 * Resolves a bundled require() source to a local URI by downloading the asset first.
 * iOS AVPlayer can fail to play assets that haven't been downloaded to disk.
 */
async function resolveAudioSource(source: AudioSource): Promise<AudioSource> {
  if (typeof source === "number") {
    const asset = Asset.fromModule(source);
    await asset.downloadAsync();
    return { uri: asset.localUri ?? asset.uri };
  }
  return source;
}

/** Coping toolkit playback only; TTS uses `playAudioUri` in `player.ts`. */
export async function createAudioPlayer(
  source: AudioSource,
  onFinished?: () => void
): Promise<AudioPlayerHandle> {
  await ensurePlaybackAudioMode();
  const resolved = await resolveAudioSource(source);
  const player = createExpoAudioPlayer(resolved, { updateInterval: 150 });
  let active = true;

  const subscription = player.addListener("playbackStatusUpdate", (status) => {
    const reachedEnd = status.duration > 0 && status.currentTime >= status.duration - 0.05;
    if (active && !status.playing && reachedEnd) {
      active = false;
      subscription.remove();
      player.remove();
      onFinished?.();
    }
  });

  const cleanup = async () => {
    if (!active) return;
    active = false;
    subscription.remove();
    player.pause();
    player.remove();
  };

  return {
    play: async () => {
      player.play();
    },
    pause: async () => {
      player.pause();
    },
    stop: async () => {
      await cleanup();
    },
  };
}
