import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Praktikum1 from './Praktikum-1';

export default function App() {
  return (
    <View style={styles.container}>
      <Praktikum1 /> 
      <StatusBar style="auto" />
    </View>
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