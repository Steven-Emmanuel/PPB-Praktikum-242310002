import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const allBooks = [
  { id: "1", title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling" },
  { id: "2", title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: "3", title: "1984", author: "George Orwell" },
  { id: "4", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: "5", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const book = allBooks.find((b) => b.id === id);

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Book not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>ID: {book.id}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  author: { fontSize: 18, color: "#444", marginBottom: 20 },
  infoBox: { backgroundColor: "#eee", padding: 15, borderRadius: 8 },
  infoText: { fontSize: 16 },
  error: { fontSize: 20, color: "red" }
});
