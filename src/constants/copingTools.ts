import type { AudioSource } from "expo-audio";

export type CopingToolCategory = "grounding" | "breathing" | "body" | "comfort";

export type CopingTool = {
  id: string;
  title: { tw: string; en: string };
  description: { tw: string; en: string };
  category: CopingToolCategory;
  audioSource: { tw: AudioSource; en: AudioSource };
};

export const COPING_TOOLS: CopingTool[] = [
  {
    id: "grounding-54321",
    title: { tw: "Fa wo ho sie 5-4-3-2-1", en: "Grounding 5-4-3-2-1" },
    description: {
      tw: "Fa wo adwene si nnee a wowo wo ho so.",
      en: "A short grounding exercise to settle your mind.",
    },
    category: "grounding",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/grounding-54321.mp3"),
      en: require("../../assets/audio/coping/en/grounding-54321.mp3"),
    },
  },
  {
    id: "breathing-478",
    title: { tw: "Home mframa 4-7-8", en: "Breathing 4-7-8" },
    description: {
      tw: "Home mframa brɛoo na ma wo bo dwo.",
      en: "A guided breathing exercise to calm the body.",
    },
    category: "breathing",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/breathing-478.mp3"),
      en: require("../../assets/audio/coping/en/breathing-478.mp3"),
    },
  },
  {
    id: "box-breathing",
    title: { tw: "Mframa box 4-4-4-4", en: "Box breathing 4-4-4-4" },
    description: {
      tw: "Mframa a ɛdɔɔso no na ɛma adwene no dwo.",
      en: "Even inhales and exhales to steady your nervous system.",
    },
    category: "breathing",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/box-breathing.mp3"),
      en: require("../../assets/audio/coping/en/box-breathing.mp3"),
    },
  },
  {
    id: "body-scan",
    title: { tw: "Honam no hwɛ", en: "Body scan" },
    description: {
      tw: "Fa wo adwene si honam no so faako faako.",
      en: "Notice sensations from head to toe with gentle attention.",
    },
    category: "body",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/body-scan.mp3"),
      en: require("../../assets/audio/coping/en/body-scan.mp3"),
    },
  },
  {
    id: "safe-place",
    title: { tw: "Beae a ɛyɛ dwo", en: "Safe place visualization" },
    description: {
      tw: "Si beae a wo feel dwo no so wɔ wo adwene mu.",
      en: "Picture a calm place in your mind and rest there for a moment.",
    },
    category: "grounding",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/safe-place.mp3"),
      en: require("../../assets/audio/coping/en/safe-place.mp3"),
    },
  },
  {
    id: "self-hug",
    title: { tw: "Koma butterfly hug", en: "Butterfly hug" },
    description: {
      tw: "Fa wo nsa no si wo koma so na ma wo ho dwo.",
      en: "Cross your arms on your chest and tap gently to soothe.",
    },
    category: "comfort",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/self-hug.mp3"),
      en: require("../../assets/audio/coping/en/self-hug.mp3"),
    },
  },
  {
    id: "anger-walk",
    title: { tw: "Abufuo nantew", en: "Anger walk" },
    description: {
      tw: "Nante brɛoo na fa wo adwene si wo nan ase ne mframa a wohome so.",
      en: "Walk slowly and focus on each step and breath to release tension.",
    },
    category: "body",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/anger-walk.mp3"),
      en: require("../../assets/audio/coping/en/anger-walk.mp3"),
    },
  },
  {
    id: "sleep-pmr",
    title: { tw: "Da mu PMR", en: "Sleep relaxation (PMR)" },
    description: {
      tw: "Kyekyere na gyae wo honam mu baabiara ansa na woada.",
      en: "Tense and release each muscle group to prepare your body for sleep.",
    },
    category: "body",
    audioSource: {
      tw: require("../../assets/audio/coping/tw/sleep-pmr.mp3"),
      en: require("../../assets/audio/coping/en/sleep-pmr.mp3"),
    },
  },
];
