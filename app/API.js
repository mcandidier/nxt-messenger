'use client'

import axios from 'axios';
import { parseCookies } from 'nookies';


const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;