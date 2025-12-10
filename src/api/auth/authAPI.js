import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const authAPI = {
  login: (data) => axios.post(`${BASE_URL}/auth/login`, data),
  register: (data) => axios.post(`${BASE_URL}/auth/register`, data),
  forgotPassword: (data) =>
    axios.post(`${BASE_URL}/auth/forgot-password`, data),
  verifyOTP: (data) => axios.post(`${BASE_URL}/auth/verify-otp`, data),
  resetPassword: (data) => axios.post(`${BASE_URL}/auth/reset-password`, data),
};
