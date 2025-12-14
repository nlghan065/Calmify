import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchAllTests = async () => {
  const res = await apiClient.get("/testsU");
  return res.data;
};

export const fetchQuestionsByTestCode = async (testCode) => {
  const res = await apiClient.get(`/testsU/${testCode}`);
  return res.data;
};

export const saveTestResult = async (payload) => {
  const res = await apiClient.post("/user-tests", payload);
  return res.data;
};
