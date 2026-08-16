import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { REGISTER_USER } from './api';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !retypePassword.trim()) {
      Alert.alert('Error', 'Field cannot be empty');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Email must be in valid format');
      return;
    }
    if (password !== retypePassword) {
      Alert.alert('Error', 'Password and Re-Type Password must match');
      return;
    }
    setIsLoading(true);
    const result = await REGISTER_USER({ username, email, password });
    setIsLoading(false);
    if (result.data && result.data.id) {
      Alert.alert('Success', 'Account created. Please sign in.');
      router.replace('/signin');
    } else {
      Alert.alert('Error', result.message || 'Failed to create account');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready+</Text>
      <Text style={styles.subtitle}>Sign up to continue</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Re-Type Password" value={retypePassword} onChangeText={setRetypePassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#0a7ea4', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#0a7ea4', textAlign: 'center', marginTop: 16 },
});


