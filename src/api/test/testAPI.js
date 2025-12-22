import axios from "axios";

// Đảm bảo URL này đúng với server của bạn
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Tự động thêm Token vào header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 1. Lấy danh sách tất cả bài test
export const fetchAllTests = async () => {
  // Sửa endpoint thành /tests (khớp với BE routes)
  const res = await apiClient.get("/tests");
  return res.data;
};

// 2. Lấy câu hỏi của 1 bài test
export const fetchQuestionsByTestCode = async (testCode) => {
  const res = await apiClient.get(`/tests/${testCode}`);
  return res.data;
};

// 3. Nộp bài
export const saveTestResult = async (payload) => {
  // Backend chờ ở /tests/submit
  const res = await apiClient.post("/tests/submit", payload);
  return res.data;
};
