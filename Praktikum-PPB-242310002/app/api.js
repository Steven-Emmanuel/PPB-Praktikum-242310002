import axios from 'axios';

const API_URL = 'https:

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const AUTH_USER = async (param) => {
  try {
    const response = await api.post('/auth/login', param);
    return { data: response.data, loading: false, message: '' };
  } catch (error) {
    return {
      loading: false,
      message: error.response?.data || 'Login gagal. Periksa kredensial.',
      data: [],
    };
  }
};

export const REGISTER_USER = async (param) => {
  try {
    const response = await api.post('/users', param);
    return { data: response.data, loading: false, message: '' };
  } catch (error) {
    return {
      loading: false,
      message: 'Failed to create account',
      data: [],
    };
  }
};

