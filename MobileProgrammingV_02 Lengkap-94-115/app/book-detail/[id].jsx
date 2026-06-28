import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookDetailScreen() {
  const { id, title, author, synopsis, rating } = useLocalSearchParams();
  const router = useRouter();

  const handleReadBook = () => {
    alert("Opening book reader...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>by {author}</Text>
          <Text style={styles.rating}>⭐ {rating}/5.0</Text>
        </View>

        <View style={styles.synopsisSection}>
          <Text style={styles.sectionTitle}>SYNOPSIS</Text>
          <Text style={styles.synopsisText}>{synopsis}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Read Book" color="#FF5757" onPress={handleReadBook} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Go Back" color="#888" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#222" },
  author: { fontSize: 16, color: "#666", marginTop: 4 },
  rating: { fontSize: 18, color: "#FFA500", marginTop: 8 },
  synopsisSection: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#FF5757", marginBottom: 8 },
  synopsisText: { fontSize: 16, lineHeight: 24, color: "#444" },
  buttonContainer: { marginTop: 20 },
});
