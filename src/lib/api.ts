import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const session = (await getSession()) as any;
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle refresh tokens or session expiry
    return Promise.reject(error);
  }
);

export default api;
