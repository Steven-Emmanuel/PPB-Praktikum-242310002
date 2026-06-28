import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, color_list } from './StyleApps';

const BookContent = ({ book }) => (
  <View style={styles.book_card_footer}>
    <View style={{ flex: 1 }}>
      <Text style={styles.book_card_title} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.book_card_author}>{book.author}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="star" size={14} color={color_list.orange} />
      <Text style={styles.book_card_rating}>{book.rating}</Text>
    </View>
    {book.views !== undefined && (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
        <Ionicons name="eye-outline" size={14} color="gray" />
        <Text style={styles.book_card_views}>{book.views}</Text>
      </View>
    )}
  </View>
);

const BookItem = ({ book }) => (
  <View style={{ position: 'relative' }}>
    <Image source={book.img} style={styles.book_card_img} resizeMode="cover" />
    {book.showall === 'Premium' && (
      <View style={styles.circle_premium_small}>
        <Ionicons name="star" size={12} color="white" />
      </View>
    )}
  </View>
);

const BookList = ({ books }) => (
  <View style={styles.book_grid}>
    {books.map((book, index) => (
      <TouchableOpacity
        key={book.id || index}
        style={[styles.book_card, styles.shadow]}
        activeOpacity={0.7}
      >
        <BookItem book={book} />
        <BookContent book={book} />
      </TouchableOpacity>
    ))}
  </View>
);

export default function BookCollections({ books }) {
  const sortedBooks = [...books].sort((a, b) => b.id - a.id);
  return (
    <View style={styles.container_book_collections}>
      <View style={styles.h_container}>
        <Text style={styles.container_book_collections_title}>Book Collection</Text>
        <Text style={{ color: color_list.green }}>See All</Text>
      </View>
      <BookList books={sortedBooks} />
    </View>
  );
}