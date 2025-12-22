import axios from "axios";

// 1. Cấu hình đường dẫn gốc
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor: Tự động thêm Token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // Log URL để kiểm tra
    console.log(`[API Call] ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

const statisticalService = {
  // SỬA TÊN HÀM THÀNH 'getStatistics' ĐỂ KHỚP VỚI 'StatisticsPage.jsx'
  getStatistics: async (type = "day") => {
    // Gọi vào API thống kê tổng hợp của BE
    // Route này trả về cả Chart + History trong 1 lần gọi
    const res = await apiClient.get(`/statistics?type=${type}`);
    return res.data;
  },
};

export default statisticalService;
