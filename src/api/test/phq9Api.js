import axios from "axios";

// Lấy URL từ biến môi trường hoặc fallback về localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Lấy danh sách câu hỏi PHQ-9
 */
export const fetchPHQ9Questions = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/tests/PHQ9`);
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi tải PHQ-9:", error);
    return null;
  }
};

/**
 * Submit bài test PHQ-9
 * @param {Object} payload - Dữ liệu bài test { testCode: "PHQ9", answers: [...] }
 * @param {String} [token] - Token JWT (truyền vào nếu submit ngay sau khi login)
 */
export const submitPHQ9Answers = async (payload, token = null) => {
  try {
    // Nếu có token truyền vào (từ Login) thì ưu tiên dùng nó
    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    } else {
      // Nếu không truyền token, thử lấy từ localStorage (trường hợp user đã login từ trước)
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
    }

    const res = await axios.post(`${BASE_URL}/tests/submit`, payload, config);
    return res.data; // Trả về { success: true, data: { id: ... } }
  } catch (error) {
    console.error("❌ Lỗi submit PHQ-9:", error);
    // Ném lỗi ra để LoginPage bắt được và xử lý (toast error)
    throw error;
  }
};
