import { useEffect, useState } from "react";
import { t } from "@/i18n";
import { getLatest7Checkins } from "@/services/storage/moodRepository";
import { useMoodStore } from "@/store/moodStore";
import { useUserStore } from "@/store/userStore";
import type { LanguageCode } from "@/types/language";

const EMOTION_VALENCE: Record<string, number> = {
  happy: 9,
  grateful: 8,
  numb: 4,
  confused: 4,
  anxious: 3,
  overwhelmed: 3,
  lonely: 3,
  exhausted: 2,
  sad: 2,
  angry: 2,
};

const MOOD_WEEKDAY_KEYS = [
  "profile.moodWeekday.sun",
  "profile.moodWeekday.mon",
  "profile.moodWeekday.tue",
  "profile.moodWeekday.wed",
  "profile.moodWeekday.thu",
  "profile.moodWeekday.fri",
  "profile.moodWeekday.sat",
] as const;

function weekdayLabel(iso: string, languageCode: LanguageCode): string {
  const d = new Date(iso).getDay();
  const key = MOOD_WEEKDAY_KEYS[d];
  return t(languageCode, key);
}

export function useMoodData() {
  const [labels, setLabels] = useState<string[]>([]);
  const [points, setPoints] = useState<number[]>([]);
  const { setWeeklySummary } = useMoodStore();
  const languageCode = useUserStore((s) => s.languageCode);

  useEffect(() => {
    (async () => {
      const data = await getLatest7Checkins();
      const chronological = data.reverse();
      const scores = chronological.map(
        (item) => EMOTION_VALENCE[item.emotion_id] ?? 5
      );
      const dayLabels = chronological.map((item) =>
        weekdayLabel(item.timestamp, languageCode)
      );
      setLabels(dayLabels);
      setPoints(scores);
      setWeeklySummary(scores);
    })();
  }, [setWeeklySummary, languageCode]);

  return { labels, points };
}
