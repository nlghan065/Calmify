// Calmify/src/api/auth/authAPI.js
import axios from "axios";

// Nếu muốn dùng env variable, tạo VITE_API_URL trong .env
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Tạo Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL, // Tự động prepend tất cả request
  withCredentials: true, // Gửi cookie/token sang backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Định nghĩa các API
export const authAPI = {
  login: (data) => apiClient.post("/auth/login", data),
  register: (data) => apiClient.post("/auth/register", data),
  forgotPassword: (data) => apiClient.post("/auth/forgot-password", data),
  verifyOTP: (data) => apiClient.post("/auth/verify-otp", data),
  resetPassword: (data) => apiClient.post("/auth/reset-password", data),
};
