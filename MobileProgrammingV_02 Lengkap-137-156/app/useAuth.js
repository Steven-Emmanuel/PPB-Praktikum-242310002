import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AUTH_USER } from './api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await SecureStore.getItemAsync('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.warn('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username, password) => {
    const result = await AUTH_USER({ username, password });
    if (result.data && result.data.token) {
      const userData = {
        username,
        token: result.data.token,
        loginTime: new Date().toISOString(),
      };
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
      await SecureStore.setItemAsync('authToken', result.data.token);
      setUser(userData);
      return { success: true };
    } else {
      return { success: false, message: result.message || 'Login gagal' };
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('userData');
    await SecureStore.deleteItemAsync('authToken');
    setUser(null);
  };

  return { user, loading, signIn, signOut };
}

