import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Praktikum1 from './Praktikum-1';
import React from 'react';
import Praktikum2 from './Praktikum-2';

export default function App() {
  return (
    <View style={styles.container}>
      {/* 2. Display the component here */}
      <Praktikum1 /> 
      <StatusBar style="auto" />
    </View>
  );
  return (
    <Praktikum2 />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});