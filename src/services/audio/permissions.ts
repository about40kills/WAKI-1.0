import { requestRecordingPermissionsAsync } from "expo-audio";

export async function ensureMicrophonePermission(): Promise<boolean> {
  try {
    const { granted } = await requestRecordingPermissionsAsync();
    return granted;
  } catch {
    return false;
  }
}
