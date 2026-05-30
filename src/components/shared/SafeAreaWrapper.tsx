import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackground } from "@/components/shared/AppBackground";
import { OfflineBanner } from "@/components/shared/OfflineBanner";
import { useThemeColors } from "@/theme/ThemeProvider";

export function SafeAreaWrapper({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <AppBackground />
      <View style={styles.foreground}>
        <OfflineBanner />
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
  foreground: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
