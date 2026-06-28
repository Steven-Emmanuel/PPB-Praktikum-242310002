import { useRouter } from "expo-router";
import { Button, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThirdScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Third Screen</Text>
        <Button
          title="Go to the first screen"
          onPress={() => router.push("/")}
        />
      </View>
    </SafeAreaView>
  );
}
