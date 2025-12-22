import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Thêm token nếu cần (dù route GET /supports là public, nhưng cứ để cho chắc)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const supportAPI = {
  // Lấy danh sách tất cả địa điểm hỗ trợ
  getLocations: (keyword = "") => {
    // Backend hỗ trợ tìm kiếm qua query param ?q=...
    const url = keyword
      ? `/supports?q=${encodeURIComponent(keyword)}`
      : "/supports";
    return apiClient.get(url);
  },

  // Lấy chi tiết (nếu cần sau này)
  getLocationById: (id) => apiClient.get(`/supports/${id}`),
};
