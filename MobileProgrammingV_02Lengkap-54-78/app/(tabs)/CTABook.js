import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles, color_list } from './StyleApps';

const CTABook = ({ book }) => {
  return (
    <View style={[styles.new_com_container, { backgroundColor: book.color || color_list.green }]}>
      <Text style={styles.new_book_title}>{book.title}</Text>
      <Text style={styles.new_book_text}>{book.author}</Text>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Image
          source={typeof book.img === 'string' ? { uri: book.img } : book.img}
          style={styles.new_book_img}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.new_book_text}>{book.story}</Text>
      <TouchableOpacity style={[styles.btn_read, { alignSelf: 'center', marginTop: 10 }]}>
        <Text style={styles.btn_read_text}>Read Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CTABook;