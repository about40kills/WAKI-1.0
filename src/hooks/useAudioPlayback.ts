import { useEffect, useState } from "react";
import { useAudioPlayer, useAudioPlayerStatus, type AudioSource } from "expo-audio";
import { ensurePlaybackAudioMode } from "@/services/audio/audioMode";

export function useAudioPlayback(source: AudioSource) {
  const player = useAudioPlayer(source, {
    updateInterval: 150,
    downloadFirst: true,
    keepAudioSessionActive: true,
  });
  const status = useAudioPlayerStatus(player);
  const [pendingPlay, setPendingPlay] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingPlay || !status.isLoaded) return;

    try {
      player.play();
      setPendingPlay(false);
      setHasStarted(true);
    } catch (e) {
      console.error("Failed to start loaded audio:", e);
      setPendingPlay(false);
      setHasStarted(false);
      setError("playback_failed");
    }
  }, [pendingPlay, player, status.isLoaded]);

  useEffect(() => {
    if (!status.didJustFinish) return;
    setPendingPlay(false);
    setHasStarted(false);
    setError(null);
    void player.seekTo(0);
  }, [player, status.didJustFinish]);

  const play = async () => {
    setError(null);
    try {
      await ensurePlaybackAudioMode();
      player.volume = 1;
      if (status.isLoaded) {
        player.play();
        setHasStarted(true);
        setPendingPlay(false);
        return;
      }

      setPendingPlay(true);
      setHasStarted(true);
    } catch (e) {
      console.error("Failed to play audio:", e);
      setPendingPlay(false);
      setHasStarted(false);
      setError("playback_failed");
    }
  };

  const pause = async () => {
    try {
      player.pause();
      setPendingPlay(false);
    } catch (e) {
      console.error("Failed to pause audio:", e);
      setError("playback_failed");
    }
  };

  const resume = async () => {
    setError(null);
    try {
      await ensurePlaybackAudioMode();
      player.volume = 1;
      player.play();
      setHasStarted(true);
      setPendingPlay(false);
    } catch (e) {
      console.error("Failed to resume audio:", e);
      setError("playback_failed");
    }
  };

  const stop = async () => {
    try {
      player.pause();
      await player.seekTo(0);
    } catch (e) {
      console.error("Failed to stop audio:", e);
      setError("playback_failed");
    } finally {
      setPendingPlay(false);
      setHasStarted(false);
    }
  };

  const isPlaying = status.playing;
  const isLoading = hasStarted && (pendingPlay || (!status.isLoaded && status.isBuffering));
  const isPaused =
    hasStarted &&
    !isLoading &&
    !status.playing &&
    status.currentTime > 0 &&
    !status.didJustFinish;

  return {
    isPlaying,
    isPaused,
    isLoading,
    error,
    play,
    pause,
    resume,
    stop,
  };
}
