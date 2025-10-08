import axios from 'axios';

// Define your backend's public base URL
const PUBLIC_API_URL = 'http://localhost:4000/api';

/**
 * Makes a real API call to the backend login endpoint.
 * @param {object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email (matching your schema).
 * @param {string} credentials.password - The user's password.
 * @returns {Promise} The promise from the axios post request.
 */
export const login = (credentials) => {
  // We use axios directly here because the login endpoint is public
  // and should not have the auth interceptor attached to it.
  return axios.post(`${PUBLIC_API_URL}/auth/login`, credentials);
};