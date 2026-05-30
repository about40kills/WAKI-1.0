/**
 * Spring presets tuned toward iOS 26 “Liquid Glass” (WWDC 2025):
 * fluid motion, slight overshoot, soft settle — not snappy-rigid toggles.
 *
 * React Native can’t run Apple’s real-time refractive shaders; these curves
 * approximate the physics layer of the system UI.
 */
export const IOS26_LIQUID_PRESS_IN = {
  damping: 13.5,
  stiffness: 400,
  mass: 0.34,
  overshootClamping: false,
} as const;

export const IOS26_LIQUID_RELEASE = {
  damping: 11.5,
  stiffness: 310,
  mass: 0.46,
  overshootClamping: false,
} as const;

/** Active tab / selection — gentle bloom, subtle overshoot then rest. */
export const IOS26_LIQUID_SELECTION = {
  damping: 14,
  stiffness: 285,
  mass: 0.44,
  overshootClamping: false,
} as const;

/** Fast settle when Reduce Motion is on (no bounce). */
export const IOS26_LIQUID_REDUCED = {
  damping: 22,
  stiffness: 520,
  mass: 0.5,
  overshootClamping: true,
} as const;

/** @deprecated use IOS26_* names */
export const LIQUID_PRESS_IN = IOS26_LIQUID_PRESS_IN;
export const LIQUID_PRESS_OUT = IOS26_LIQUID_RELEASE;
export const LIQUID_SELECTION = IOS26_LIQUID_SELECTION;
