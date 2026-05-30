import { create } from "zustand";

interface MoodState {
  checkedInToday: boolean;
  weeklySummary: number[];
  setCheckedInToday: (checked: boolean) => void;
  setWeeklySummary: (summary: number[]) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  checkedInToday: false,
  weeklySummary: [],
  setCheckedInToday: (checkedInToday) => set({ checkedInToday }),
  setWeeklySummary: (weeklySummary) => set({ weeklySummary }),
}));
