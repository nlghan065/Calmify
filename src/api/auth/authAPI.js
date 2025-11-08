import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";

export const authAPI = {
  login: (data) => axios.post(`${API_URL}/login`, data),
  register: (data) => axios.post(`${API_URL}/register`, data),
  forgotPassword: (data) => axios.post(`${API_URL}/forgot-password`, data),
};
