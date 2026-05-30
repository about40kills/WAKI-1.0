import { SceneStyleInterpolators } from "@react-navigation/bottom-tabs";

type TabSceneInterpolator = typeof SceneStyleInterpolators.forShift;

/**
 * Tuned to feel closer to a liquid toggle glide:
 * short lateral travel, a small floating settle, and soft glass compression.
 */
export const liquidTabSceneStyleInterpolator: TabSceneInterpolator = ({
  current,
}) => ({
  sceneStyle: {
    opacity: current.progress.interpolate({
      inputRange: [-1, -0.18, 0, 0.18, 1],
      outputRange: [0, 0.16, 1, 0.16, 0],
    }),
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-14, 0, 14],
        }),
      },
      {
        translateY: current.progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [6, 0, 6],
        }),
      },
      {
        scale: current.progress.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [0.984, 1, 0.984],
        }),
      },
    ],
  },
});
