import axios from "axios";
import swal from 'sweetalert';

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND}`;

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use((response) => response, (error) => {
  swal({
    title: '',
    text: error.response?.data.detail,
    icon: 'error'
  });
  throw error.response?.data.detail;
});