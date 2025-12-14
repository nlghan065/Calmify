import axios from "axios";

// BASE_URL phải trỏ đến backend + /tests
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/tests";

// Lấy dữ liệu PHQ9
export const fetchPHQ9 = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/tests/phq9`);
    return res.data; // backend trả { questions: [...], scales: [...] }
  } catch (error) {
    throw error;
  }
};

// Gửi kết quả PHQ9
export const submitPHQ9 = async (answers) => {
  try {
    const res = await axios.post(`${BASE_URL}/tests/guest/calculate`, {
      answers,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
