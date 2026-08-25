import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default to localhost for Android emulator / iOS simulator / LAN
const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator localhost mapping; use LAN IP for real devices

const mobileApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

mobileApi.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('lumiere_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('AsyncStorage error', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default mobileApi;
