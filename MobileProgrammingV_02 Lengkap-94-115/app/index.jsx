import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const featuredBooks = [
  {
    id: "1",
    title: "MALIN KUNDANG, THE CHILD DISOBEDIENT",
    author: "R.J. Palacio",
    image: null, // no real image, just placeholder
    synopsis: "This charming tale follows Gerald the giraffe, who feels left out at the Jungle Dance because of his clumsy dancing. With the help of a wise friend, Gerald learns that sometimes it just takes a different tune to find your rhythm and dance to your own beat.",
    rating: "5.0",
    categories: ["Free", "Premium", "Popular"],
  },
  {
    id: "2",
    title: "HALLOWEEN CANDY",
    author: "Giles Andreae",
    image: null,
    synopsis: "A spooky sweet story about a little monster who discovers that sharing candy is the best treat of all. Perfect for young readers who love Halloween fun.",
    rating: "4.8",
    categories: ["Free", "Popular"],
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const navigateToDetail = (book) => {
    router.push({
      pathname: `/book-detail/${book.id}`,
      params: {
        title: book.title,
        author: book.author,
        synopsis: book.synopsis,
        rating: book.rating,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.greeting}>Good Morning,</Text>
        <Text style={styles.sectionTitle}>Discover Books</Text>

        {featuredBooks.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigateToDetail(book)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{book.title}</Text>
              <Text style={styles.cardAuthor}>{book.author}</Text>
              <View style={styles.tagsContainer}>
                {book.categories.map((cat, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{cat}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.rating}>⭐ {book.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Link to full catalog (optional) */}
        <TouchableOpacity
          style={styles.catalogLink}
          onPress={() => router.push("/catalog")}
        >
          <Text style={styles.catalogLinkText}>See all books →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  greeting: { fontSize: 20, color: "#888", marginBottom: 4 },
  sectionTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 16, color: "#222" },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF5757",
  },
  cardContent: { gap: 6 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardAuthor: { fontSize: 14, color: "#777" },
  tagsContainer: { flexDirection: "row", gap: 8, marginTop: 6 },
  tag: { backgroundColor: "#FFE5E5", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2 },
  tagText: { fontSize: 12, color: "#FF5757", fontWeight: "600" },
  rating: { marginTop: 6, fontSize: 14, color: "#FFA500" },
  catalogLink: { marginTop: 10, alignSelf: "flex-end" },
  catalogLinkText: { color: "#FF5757", fontSize: 16 },
});
