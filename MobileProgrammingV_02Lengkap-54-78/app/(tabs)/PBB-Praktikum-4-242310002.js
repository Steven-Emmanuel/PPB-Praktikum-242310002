import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';
import CTABook from './CTABook';
import CategoriesNav from './Categories';
import BookCollections from './BookCollections';
import Footer from './Footer';
import SearchPage from './SearchPage';
import { styles, color_list } from './StyleApps';
import booksData from './books';

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const lastBook = booksData[booksData.length - 1];

  if (showSearch) {
    return <SearchPage onBack={() => setShowSearch(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Header onSearchPress={() => setShowSearch(true)} />
        <CTABook book={lastBook} />
        <CategoriesNav />
        <BookCollections books={booksData} />
        <Footer />
        <Text style={{ color: color_list.green, textAlign: 'center', marginTop: 20 }}>
          © 2026 Febry Damatraseta Fairuz
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}