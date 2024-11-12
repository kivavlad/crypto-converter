import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
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