import axios from "axios";
import { API_URL } from "../constants/keys";
import Cookie from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookie.get("token");

    if (token) {
      // Modify the request body to include the token
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

