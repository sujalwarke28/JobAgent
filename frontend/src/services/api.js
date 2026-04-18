import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050/api',
});

// Add token interceptor
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // For testing without firebase configured, you can set a dummy token
      const dummyToken = localStorage.getItem('dummyToken');
      if (dummyToken) {
        config.headers.Authorization = `Bearer ${dummyToken}`;
      }
    }
  } catch (error) {
    console.error('Error fetching Firebase token', error);
  }
  return config;
});

export default api;
