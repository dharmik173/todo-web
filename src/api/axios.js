import axios from 'axios';

const API_BASE_URL = "http://localhost:3005"; // Replace with your backend base URL

// Configure axios instance
export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});


// Add a request interceptor
api.interceptors.request.use(
    (config) => {
      // Modify or log the request before sending
      config.headers = {
        "Content-Type": "application/json",     
        "authorization": `Bearer ${localStorage.getItem("UserToken")}`  
      }
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );