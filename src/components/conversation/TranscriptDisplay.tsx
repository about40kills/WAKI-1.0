import { ScrollView } from "react-native";
import { MessageBubble } from "@/components/ui/MessageBubble";

export function TranscriptDisplay({
  messages,
}: {
  messages: { role: "user" | "assistant"; content: string }[];
}) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {messages.map((msg, idx) => (
        <MessageBubble key={`${msg.role}-${idx}`} role={msg.role} text={msg.content} />
      ))}
    </ScrollView>
  );
}
