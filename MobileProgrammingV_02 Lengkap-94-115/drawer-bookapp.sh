#!/bin/bash

# Drawer Navigation for Book e-Catalog | Exercise 1-2-3

# Create required folders
mkdir -p app/book-detail

echo "📁 Setting up Drawer Navigation with parameter passing..."

# ---------- ROOT DRAWER LAYOUT (Exercise 1) ----------
cat > app/_layout.jsx << 'EOF'
import { Drawer } from "expo-router/drawer";
import "react-native-reanimated";
import "react-native-gesture-handler";

export default function RootDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#FF5757",
        drawerInactiveTintColor: "gray",
        drawerStyle: { backgroundColor: "#FFF5F5", width: 260 },
        drawerLabelStyle: { fontSize: 16, fontWeight: "600" },
        headerStyle: { backgroundColor: "#FF5757" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Exercise 2: three menus */}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Discover Books",
        }}
      />
      <Drawer.Screen
        name="catalog"
        options={{
          drawerLabel: "Catalog",
          title: "Book Collection",
        }}
      />
      <Drawer.Screen
        name="premium"
        options={{
          drawerLabel: "Premium",
          title: "Premium Books",
        }}
      />
      {}
      <Drawer.Screen
        name="book-detail/[id]"
        options={{
          drawerLabel: () => null,
          title: "Book Detail",
        }}
      />
    </Drawer>
  );
}
EOF

# ---------- HOME SCREEN (Exercise 2 + card navigation) ----------
cat > app/index.jsx << 'EOF'
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
EOF

# ---------- CATALOG SCREEN (Exercise 2 – full list) ----------
cat > app/catalog.jsx << 'EOF'
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
EOF

# ---------- PREMIUM SCREEN (Exercise 2) ----------
cat > app/premium.jsx << 'EOF'
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
EOF

# ---------- DETAIL SCREEN (Exercise 3 – parameter passing) ----------
cat > app/book-detail/[id].jsx << 'EOF'
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
EOF

echo ""
echo "✅ Drawer Navigation and all screens created!"
echo "------------------------------------------------"
echo "Now run the following commands in order:"
echo "1. npx expo install @react-navigation/drawer react-native-reanimated react-native-gesture-handler expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar"
echo "2. npx expo start --clear"
echo ""
echo "Open the app – you will see:"
echo "   - Swipe from the left or tap the hamburger icon to open the drawer."
echo "   - Choose Home, Catalog or Premium from the side menu."
echo "   - Tap any book card to see its detail (SYNOPSIS + Read Book button)."
echo "   - Parameters (title, author, synopsis, rating) are passed and displayed correctly."