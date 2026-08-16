import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Praktikum1 = () => {
  return (
    <View style={styles.infoContainer}>
      {}
      <Text style={styles.textLabel}>Selamat Datang Di Praktikum Pemrograman Perangkat Bergerak</Text>
      <Text style={styles.textLabel}>Name: STEVEN EMMANUEL</Text>
      <Text style={styles.textLabel}>NIM: 242310002</Text>
      <Text style={styles.textLabel}>PRODI: Information Technology</Text>
      <Text style={styles.textLabel}>Angkatan: 2025</Text>
      <Text style={styles.textLabel}>Kelas: TI-24-KA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 20,
  },
  textLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  }
});

export default Praktikum1;
