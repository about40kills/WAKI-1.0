import { Platform } from "react-native";
import Constants from "expo-constants";

const DAILY_CHECKIN_CHANNEL_ID = "daily-checkin";

// expo-notifications push support was removed from Expo Go on Android (SDK 53+).
// Calling setNotificationHandler in Expo Go logs an ERROR even for local notifications,
// so skip all notification setup when running inside Expo Go.
const isExpoGo = Constants.executionEnvironment === "storeClient";

function getNotifications() {
  if (isExpoGo) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("expo-notifications") as typeof import("expo-notifications");
  } catch {
    return null;
  }
}

async function ensureNotificationChannel() {
  if (Platform.OS !== "android") return;

  const Notifications = getNotifications();
  if (!Notifications) return;

  await Notifications.setNotificationChannelAsync(DAILY_CHECKIN_CHANNEL_ID, {
    name: "Daily check-in reminders",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "default",
    vibrationPattern: [0, 250, 250, 250],
  });
}

/**
 * Schedules a daily check-in reminder at the given time (HH:MM format).
 * Cancels any existing reminder before scheduling a new one.
 */
export async function scheduleDailyCheckinReminder(
  time: string,
  title: string,
  body: string
): Promise<void> {
  const Notifications = getNotifications();
  if (!Notifications) return;

  await ensureNotificationChannel();
  await cancelCheckinReminder();

  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      ...(Platform.OS === "android" ? { channelId: DAILY_CHECKIN_CHANNEL_ID } : {}),
    },
  });
}

/**
 * Cancels all scheduled check-in reminders.
 */
export async function cancelCheckinReminder(): Promise<void> {
  const Notifications = getNotifications();
  if (!Notifications) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Requests notification permissions. Returns true if granted.
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === "web") return false;

  const Notifications = getNotifications();
  if (!Notifications) return false;

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();
  if (existingStatus === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

/**
 * Configures the notification handler for foreground notifications.
 * Call once at app startup.
 */
export function configureNotifications(): void {
  const Notifications = getNotifications();
  if (!Notifications) return;

  void ensureNotificationChannel();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function syncStoredCheckinReminder(
  time: string | null,
  title: string,
  body: string
): Promise<void> {
  if (!time) return;

  const Notifications = getNotifications();
  if (!Notifications) return;

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") return;

  await scheduleDailyCheckinReminder(time, title, body);
}
