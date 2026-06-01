# Add UI Component

Scaffold a new reusable UI component for this project.

**Usage:** `/add-component <ComponentName> [ui|conversation|shared|navigation]`  
**Example:** `/add-component RatingSlider ui`

## What to do

The argument is `$ARGUMENTS`. Parse it as `<ComponentName>` and optional `<folder>` (default: `ui`).

Create `src/components/<folder>/<ComponentName>.tsx` using this template:

```tsx
import { StyleSheet, View } from "react-native";
import { COLORS } from "@/constants/colors";

interface <ComponentName>Props {
  // TODO: define props
}

export function <ComponentName>({ }: <ComponentName>Props) {
  return (
    <View style={styles.container}>
      {/* TODO */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // TODO
  },
});
```

Then:
1. Ask the user what props the component needs and what it should render, if not already clear from `$ARGUMENTS`.
2. Fill in the implementation based on their answer.

## Rules
- Named exports only (no `export default`)
- Use `COLORS` constants, never raw hex
- For any animated component, use `react-native-reanimated` with `useNativeDriver`-equivalent shared values — never the legacy `Animated` API
- If the component plays audio, use `getExpoAV()` from `@/services/audio/expoAv` — **never** `import { Audio } from "expo-av"` at the top level
- Text strings shown to users must use `useLanguage()` + `t("key")`, never hardcoded
