import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const mergeGuestAssessment = async (token) => {
  const pendingStr = localStorage.getItem("guest_assessment_pending");
  if (!pendingStr) return false;

  try {
    const parsed = JSON.parse(pendingStr);

    const res = await axios.post(
      `${BASE_URL}/assessments/from-guest`,
      {
        testCode: parsed.testCode,
        totalScore: parsed.totalScore,
        severity: parsed.severity,
        advice: parsed.advice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("guest_assessment_pending");
    console.log("✅ Guest assessment merged:", res.data);
    return true;
  } catch (error) {
    console.error("❌ Lỗi merge guest assessment:", error);
    throw error;
  }
};
