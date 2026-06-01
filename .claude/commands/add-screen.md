# Add Screen

Create a new Expo Router screen for this project.

**Usage:** `/add-screen <route-path> <ScreenTitle>`  
**Example:** `/add-screen checkin/summary CheckinSummary`

## What to do

The argument is `$ARGUMENTS`. Parse it as `<route-path> <ScreenTitle>`.

1. Create the file at `src/app/<route-path>.tsx` using this template:

```tsx
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { useLanguage } from "@/hooks/useLanguage";
import { COLORS } from "@/constants/colors";

export default function <ScreenTitle>Screen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title={t("<i18n.key.title>")} />
        {/* TODO: screen content */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
  },
});
```

2. Add the title string to **both** `src/i18n/en.json` and `src/i18n/tw.json` under the appropriate namespace. For the Twi translation, use the same English string with a `[tw]` prefix as a placeholder (e.g. `"[tw] My Screen"`).

3. Tell the user:
   - The file path created
   - The i18n key added
   - That they must fill in the Twi translation in `tw.json` with a real translation

## Rules
- Never hardcode UI strings — always use `t("key")`
- Use `SafeAreaView` with `edges={["top", "left", "right"]}` (not `flex: 1` edges)
- Use `COLORS` constants, never raw hex strings
- Do NOT add the screen to `_layout.tsx` tab bar unless the route is under `(tabs)/`
