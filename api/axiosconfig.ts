import axios from "axios";
import { BASE_URL } from "@env";
import { logoutUser } from "./authentication";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
const getToken = async () => {
  const token = await AsyncStorage.getItem("access_token");
  return token;
};

// Add an interceptor to inject the token into every request dynamically
API.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Get token from your auth management system (e.g., AsyncStorage)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      // If the request fails with 401 Unauthorized error, log out the user
      await logoutUser(); // Handle logout logic
    }
    return Promise.reject(error);
  }
);

export default API;
