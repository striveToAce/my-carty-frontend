import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your backend server URL
  timeout: 10000, // Request timeout (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional, for token handling, etc.)
api.interceptors.request.use(
  (config) => {
    // Modify the request config here if needed
    // Example: Add an Authorization header
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional, for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default api;