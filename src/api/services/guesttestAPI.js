import axios from "axios";

// Đảm bảo URL này trỏ đúng vào server của bạn (VD: http://localhost:5000/api)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// 1. Lấy dữ liệu PHQ-9 (Khớp route: GET /phq9)
export const fetchGuestPHQ9 = async () => {
  const res = await axios.get(`${BASE_URL}/phq9`);
  return res.data;
};

// 2. Gửi câu trả lời để chấm điểm (Khớp route: POST /guest/calculate)
// BE yêu cầu body: { testCode, answers: [{ questionId, value }] }
export const submitGuestPHQ9 = async (answers) => {
  const res = await axios.post(`${BASE_URL}/guest/calculate`, {
    testCode: "PHQ9", // Hardcode hoặc truyền vào nếu tái sử dụng
    answers,
  });
  return res.data; // BE trả về: { success: true, data: { totalScore... } }
};

// 3. Sync kết quả sau khi login (Khớp route: POST /sync-result)
export const mergeGuestAssessment = async (token) => {
  const pendingStr = localStorage.getItem("guest_assessment_pending");
  if (!pendingStr) return false;

  try {
    const parsed = JSON.parse(pendingStr);

    // Payload phải khớp với guesttestController.syncAssessmentResult
    const payload = {
      testCode: parsed.testCode,
      totalScore: parsed.totalScore,
      severity: parsed.severity,
      resultDetail: parsed.resultDetail, // BE dùng resultDetail, không phải advice
    };

    const res = await axios.post(`${BASE_URL}/sync-result`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Header xác thực
      },
    });

    // Sync xong thì xóa localStorage để tránh sync lại lần sau
    localStorage.removeItem("guest_assessment_pending");
    console.log("✅ Guest assessment merged:", res.data);
    return true;
  } catch (error) {
    console.error("❌ Lỗi merge guest assessment:", error);
    // Không throw error để tránh chặn luồng login chính, chỉ log thôi
    return false;
  }
};
