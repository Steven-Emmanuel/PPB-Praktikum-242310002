import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Books</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter book title..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <View style={{ marginTop: 10 }}>
        <Button title="Go back" onPress={() => router.back()} color="gray" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }
});
