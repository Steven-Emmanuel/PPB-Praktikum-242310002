import React, { useState, useMemo, useEffect } from 'react';
import { SafeAreaView, StatusBar, ScrollView, StyleSheet, Text, View } from 'react-native';
import SearchBar from './SearchBar';
import BookCollections from './BookCollections'; 
import Pagination from './Pagination';
import booksData from './books';

const ITEMS_PER_PAGE = 2;

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(booksData);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    setCurrentPage(1);
  }, [search]);


  const filteredBooks = useMemo(() => {
    let computedData = Array.isArray(books) ? [...books] : [];

    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value !== null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            console.error(`Error processing key "${key}":`, error);
            return false;
          }
        });
      });
    }
    
    return computedData;
  }, [search, books]);

  const { paginatedBooks, totalPages } = useMemo(() => {
    const totalCount = filteredBooks.length;

    const calculatedTotalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const dataSlice = filteredBooks.slice(startIndex, endIndex);

    return { paginatedBooks: dataSlice, totalPages: calculatedTotalPages };
  }, [filteredBooks, currentPage]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <SearchBar value={search} setValue={setSearch} />

      {}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          Found {filteredBooks.length} results
        </Text>
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        {}
        <BookCollections books={paginatedBooks} />

        {}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }
});