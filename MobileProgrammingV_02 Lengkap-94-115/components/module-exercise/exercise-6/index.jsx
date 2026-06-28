import { Link, useRouter } from "expo-router";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FirstScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>First Screen</Text>

        {}
        <Link href="/module-exercises/exercise-6/screen2" push asChild>
          <Button title="Go to second screen" />
        </Link>

        <View style={{ marginVertical: 10 }} />

        {}
        <Button
          title="Go to the third screen"
          onPress={() => router.push("/module-exercises/exercise-6/screen3")}
        />

        {}
        <View style={{ marginTop: 20 }}>
          <Button
            title="Book Details (params demo)"
            onPress={() =>
              router.push({
                pathname: "/books/10",
                params: { category: "novel" },
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
