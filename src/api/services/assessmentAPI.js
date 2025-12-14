import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const mergeGuestAssessment = async (token, userId) => {
  const pendingTestStr = localStorage.getItem("guest_assessment_pending");
  if (!pendingTestStr) return false; // ❌ Không có bài test, trả về false

  try {
    const parsedTest = JSON.parse(pendingTestStr);

    if (!parsedTest?.answers) return false; // ❌ Không có answers, bỏ qua

    const res = await axios.post(
      `${BASE_URL}/assessments/save`,
      {
        userId,
        testCode: parsedTest.testCode,
        answers: parsedTest.answers,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    localStorage.removeItem("guest_assessment_pending");
    console.log("✅ Guest assessment merged:", res.data);
    return true; // ✅ Merge thành công
  } catch (error) {
    console.error("❌ Lỗi khi merge guest assessment:", error);
    throw error;
  }
};
