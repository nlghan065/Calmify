import axios from "axios";

// Đổi URL này theo port backend của bạn (ví dụ 5000 hoặc 8000)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Middleware tự động gắn Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getChatSessions = async () => {
  const res = await api.get("/chat/sessions");
  // Backend trả về: { success: true, data: [...] }
  return res.data.data;
};

export const getChatHistory = async (sessionId) => {
  const res = await api.get(`/chat/${sessionId}`);
  // Backend trả về: { success: true, data: [...] }
  return res.data.data;
};

export const sendChatMessage = async ({ message, sessionId }) => {
  const res = await api.post("/chat/send", {
    message,
    sessionId,
  });
  // Backend trả về: { success: true, data: { reply, intent, isLocked } }
  return res.data.data;
};
