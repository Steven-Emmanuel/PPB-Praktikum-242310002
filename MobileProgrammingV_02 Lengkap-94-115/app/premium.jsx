import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const premiumBooks = [
  {
    id: "4",
    title: "THE UNTOLD STORY",
    author: "A.P. Petrus",
    synopsis: "Premium exclusive – an inspiring journey of self‑discovery.",
    rating: "4.9",
  },
];

export default function PremiumScreen() {
  const router = useRouter();

  const goToDetail = (book) => {
    router.push({
      pathname: `/book-detail/${book.id}`,
      params: { title: book.title, author: book.author, synopsis: book.synopsis, rating: book.rating },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <FlatList
        data={premiumBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => goToDetail(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.rating}>{item.rating} ⭐</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  title: { fontSize: 16, fontWeight: "bold" },
  author: { fontSize: 14, color: "#888", marginTop: 4 },
  rating: { fontSize: 13, color: "#FFA500", marginTop: 4 },
});
