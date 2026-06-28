import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOne() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Tab 1 – Home</Text>
    </SafeAreaView>
  );
}
