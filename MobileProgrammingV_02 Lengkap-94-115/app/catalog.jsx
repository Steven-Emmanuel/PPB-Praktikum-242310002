import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const allBooks = [
  {
    id: "1",
    title: "MALIN KUNDANG, THE CHILD DISOBEDIENT",
    author: "R.J. Palacio",
    synopsis: "This charming tale follows Gerald the giraffe...",
    rating: "5.0",
  },
  {
    id: "2",
    title: "HALLOWEEN CANDY",
    author: "Giles Andreae",
    synopsis: "A spooky sweet story about sharing...",
    rating: "4.8",
  },
  {
    id: "3",
    title: "THE JUNGLE BOOK",
    author: "Rudyard Kipling",
    synopsis: "Mowgli's journey through the jungle teaches friendship and courage.",
    rating: "4.5",
  },
];

export default function CatalogScreen() {
  const router = useRouter();

  const goToDetail = (book) => {
    router.push({
      pathname: `/book-detail/${book.id}`,
      params: { title: book.title, author: book.author, synopsis: book.synopsis, rating: book.rating },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => goToDetail(item)}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemAuthor}>{item.author}</Text>
      <Text style={styles.itemRating}>{item.rating} ⭐</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  itemTitle: { fontSize: 16, fontWeight: "bold" },
  itemAuthor: { fontSize: 14, color: "#888", marginTop: 4 },
  itemRating: { fontSize: 13, color: "#FFA500", marginTop: 4 },
});
