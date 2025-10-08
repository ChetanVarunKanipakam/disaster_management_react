// /src/utils/api.js

import axios from 'axios';

// Replace with your actual API base URL
const API_URL = 'http://localhost:4000/api/admin';

const api = axios.create({
  baseURL: API_URL,
});

// Create an exportable setup function that accepts the store as an argument.
// This function will be called once, right after the store is created.
export const setupAuthInterceptor = (store) => {
  api.interceptors.request.use(
    (config) => {
      
      // Get the token from the store's state
      const token = store.getState().auth.user?.accessToken;
      console.log("Attaching token to header:", token);
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        config.headers['x-access-token'] = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default api;