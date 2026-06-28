import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const booksData = [
  { id: "1", title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling" },
  { id: "2", title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: "3", title: "1984", author: "George Orwell" },
  { id: "4", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: "5", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderBookItem = ({ item }) => (
    <View style={styles.bookCard}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>by {item.author}</Text>
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => router.push(`/books/${item.id}`)}
      >
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Book Catalog</Text>
      <FlatList
        data={booksData}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 15 },
  bookCard: { backgroundColor: "white", padding: 15, marginHorizontal: 20, marginBottom: 10, borderRadius: 8 },
  bookTitle: { fontSize: 16, fontWeight: "600" },
  bookAuthor: { fontSize: 14, color: "#555", marginTop: 4 },
  readMoreButton: { marginTop: 10, backgroundColor: "#6200ee", paddingVertical: 8, borderRadius: 5, alignItems: "center" },
  readMoreText: { color: "white", fontWeight: "bold" }
});
