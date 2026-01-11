import axios from 'axios';
import { emitError } from './utils';

const api = axios.create({
  baseURL: 'https://rest.coincap.io/v3',
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
    const unauthorized = error?.status === 401;
    const forbidden = error?.status === 403;

    if (unauthorized) emitError('UNAUTHORIZED');
    if (forbidden) emitError('FORBIDDEN');
    
    return Promise.reject(new Error(errorMessage));
  }
)

export default api;