import { StyleSheet, View } from "react-native";
import { SafeAreaWrapper } from "@/components/shared/SafeAreaWrapper";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { ChatInterface } from "@/components/conversation/ChatInterface";

export default function ConversationScreen() {
  return (
    <SafeAreaWrapper>
      <View style={styles.headerWrap}>
        <ScreenHeader title="Conversation" />
      </View>
      <ChatInterface />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
