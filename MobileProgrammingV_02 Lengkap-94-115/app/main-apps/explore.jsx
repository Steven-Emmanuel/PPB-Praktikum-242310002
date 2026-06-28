import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Explore Page</Text>
      <Text style={styles.subText}>Discover new books here</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 28, fontWeight: "bold" },
  subText: { fontSize: 16, color: "gray", marginTop: 8 }
});
