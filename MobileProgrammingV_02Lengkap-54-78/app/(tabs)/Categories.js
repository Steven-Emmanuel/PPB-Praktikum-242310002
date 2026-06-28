import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, color_list } from './StyleApps';

const CategoriesNav = () => {
  const categories = ['All', 'Free', 'Premium', 'Popular'];

  return (
    <View style={styles.category_badge_container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.category_badge,
            {
              backgroundColor:
                category === 'All' ? color_list.green : color_list.green_light,
            },
          ]}
        >
          <Text
            style={{
              color: category === 'All' ? 'white' : 'black',
            }}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoriesNav;