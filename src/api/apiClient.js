import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Gắn token tự động cho mọi request
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Xử lý lỗi tập trung
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `[API ERROR] ${error.response.status}`,
        error.response.data
      );
    } else {
      console.error("[API ERROR]", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
