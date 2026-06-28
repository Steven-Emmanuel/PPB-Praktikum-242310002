import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import BookCollections from './BookCollections';
import booksData from './books';
import { color_list, styles } from './StyleApps';
import { Ionicons } from '@expo/vector-icons';

export default function SearchPage({ onBack }) {
  const [query, setQuery] = useState('');

  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Back button + Search input row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 10 }}>
        <TouchableOpacity onPress={onBack} style={{ marginRight: 10 }}>
          <Ionicons name="arrow-back" size={28} color={color_list.green} />
        </TouchableOpacity>
        <TextInput
          style={searchStyles.input}
          placeholder="Search book title or author..."
          placeholderTextColor={color_list.green_light}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <BookCollections books={filteredBooks} />
    </View>
  );
}

const searchStyles = {
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: color_list.green,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
};