import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      {pageNumbers.map((pageNumber) => {
        const isActive = pageNumber === currentPage;
        return (
          <TouchableOpacity
            key={pageNumber}
            style={[
              styles.button,
              isActive ? styles.buttonActive : styles.buttonInactive,
            ]}
            onPress={() => onPageChange(pageNumber)}
            disabled={isActive} 
          >
            <Text style={isActive ? styles.textActive : styles.textInactive}>
              {pageNumber}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInactive: {
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
  },
  buttonActive: {
    backgroundColor: '#567D6E', // Green active background to match your theme
    borderColor: '#567D6E',
  },
  textInactive: {
    color: '#555555',
    fontWeight: '600',
  },
  textActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});