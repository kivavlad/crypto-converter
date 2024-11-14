import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
  },
})

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
)

export default api;