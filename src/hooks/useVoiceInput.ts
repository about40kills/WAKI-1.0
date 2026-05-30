import { useState } from "react";
import {
  AudioQuality,
  IOSOutputFormat,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import { ensureMicrophonePermission } from "@/services/audio/permissions";
import { transcribeAudio } from "@/services/khaya/asr";
import { useUserStore } from "@/store/userStore";

const KHAYA_RECORDING_OPTIONS = {
  extension: ".m4a",
  sampleRate: 16000,
  numberOfChannels: 1,
  bitRate: 128000,
  android: {
    outputFormat: "mpeg4" as const,
    audioEncoder: "aac" as const,
  },
  ios: {
    extension: ".m4a",
    outputFormat: IOSOutputFormat.MPEG4AAC,
    audioQuality: AudioQuality.MEDIUM,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {},
};

export function useVoiceInput() {
  const languageCode = useUserStore((s) => s.languageCode);
  const recorder = useAudioRecorder(KHAYA_RECORDING_OPTIONS);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    const granted = await ensureMicrophonePermission();
    setHasPermission(granted);
    if (!granted) {
      setError("Microphone permission denied");
    } else {
      setError(null);
    }
    return granted;
  };

  const begin = async () => {
    setError(null);
    const granted = await requestPermission();
    if (!granted) {
      return;
    }
    if (Platform.OS === "ios") {
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
        interruptionMode: "duckOthers",
        shouldRouteThroughEarpiece: false,
      });
    }
    await recorder.prepareToRecordAsync();
    recorder.record();
    setIsRecording(true);
  };

  const end = async () => {
    if (!isRecording) return "";
    setIsRecording(false);
    setIsTranscribing(true);
    await recorder.stop();
    if (Platform.OS === "ios") {
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: false,
        interruptionMode: "duckOthers",
        shouldRouteThroughEarpiece: false,
      });
    }
    const uri = recorder.uri ?? "";
    const text = uri ? await transcribeAudio(uri, languageCode) : "";
    setTranscript(text);
    setIsTranscribing(false);
    return text;
  };

  return {
    isRecording,
    isTranscribing,
    hasPermission,
    transcript,
    error,
    requestPermission,
    startRecording: begin,
    stopRecording: end,
    clearTranscript: () => setTranscript(""),
  };
}
