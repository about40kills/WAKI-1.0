import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AudioSource } from "expo-audio";
import { Asset } from "expo-asset";

import { ensurePlaybackAudioMode } from "@/services/audio/audioMode";

function sourceToWebUri(source: AudioSource): string | null {
  if (source == null) return null;
  if (typeof source === "string") return source;
  if (typeof source === "number") {
    return Asset.fromModule(source).uri ?? null;
  }
  if (typeof source === "object") {
    if (typeof source.uri === "string") return source.uri;
    if (typeof source.assetId === "number") {
      return Asset.fromModule(source.assetId).uri ?? null;
    }
  }
  return null;
}

export function useAudioPlayback(source: AudioSource) {
  const uri = useMemo(() => sourceToWebUri(source), [source]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setHasStarted(false);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setError(null);
    setIsLoading(false);

    if (!uri) {
      audioRef.current = null;
      return;
    }

    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = 1;
    audio.src = uri;
    audioRef.current = audio;

    const syncTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const onPlaying = () => {
      setPlaying(true);
      setIsLoading(false);
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setHasStarted(false);
      setIsLoading(false);
      setError(null);
      audio.currentTime = 0;
      syncTime();
    };
    const onTimeUpdate = () => syncTime();
    const onLoadedMetadata = () => syncTime();
    const onError = () => {
      setError("playback_failed");
      setPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [uri]);

  const runPlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) {
      setError("playback_failed");
      setHasStarted(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const result = a.play();
    if (result !== undefined) {
      void result.catch((e) => {
        console.warn("useAudioPlayback (web): play() failed:", e);
        setError("playback_failed");
        setHasStarted(false);
        setIsLoading(false);
      });
    }
  }, []);

  const play = useCallback(() => {
    setError(null);
    setHasStarted(true);
    runPlay();
    void ensurePlaybackAudioMode();
  }, [runPlay]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsLoading(false);
  }, []);

  const resume = useCallback(() => {
    setError(null);
    setHasStarted(true);
    runPlay();
    void ensurePlaybackAudioMode();
  }, [runPlay]);

  const stop = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setCurrentTime(0);
    setHasStarted(false);
    setIsLoading(false);
  }, []);

  const isPlaying = playing;
  const isPaused =
    hasStarted && !isLoading && !playing && currentTime > 0;

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
