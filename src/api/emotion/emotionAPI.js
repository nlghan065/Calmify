const BASE_URL = import.meta.env.VITE_API_URL;

// Hàm lấy headers chung (cho gọn code)
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Hàm lấy User ID an toàn
const getUserId = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user.id;
  } catch (e) {
    return null;
  }
};

/**
 * Gửi cảm xúc hôm nay (Dashboard)
 */
export const checkTodayEmotion = async (data) => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User not found in local storage");

    const res = await fetch(`${BASE_URL}/emotions/${userId}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`[API] checkTodayEmotion failed:`, errorBody);
      throw new Error("Failed to check today emotion");
    }

    return await res.json();
  } catch (err) {
    console.error("[API] checkTodayEmotion error:", err);
    throw err;
  }
};

/**
 * Lưu nhật ký cảm xúc (Diary)
 */
export const createDiaryNote = async (data) => {
  const userId = getUserId();
  if (!userId) throw new Error("User not found");

  try {
    const res = await fetch(`${BASE_URL}/emotions/${userId}`, {
      method: "POST",
      headers: getHeaders(), // Đã có Token
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create diary note");
    return await res.json();
  } catch (err) {
    console.error("[API] createDiaryNote error:", err);
    throw err;
  }
};

/**
 * Lấy danh sách nhật ký cảm xúc
 */
export const getDiaryNotes = async () => {
  const userId = getUserId();
  if (!userId) throw new Error("User not found");

  try {
    const res = await fetch(`${BASE_URL}/emotions/${userId}`, {
      method: "GET",
      headers: getHeaders(), // <--- QUAN TRỌNG: Phải thêm dòng này để gửi Token
    });

    if (!res.ok) throw new Error("Failed to load diary notes");
    return await res.json();
  } catch (err) {
    console.error("[API] getDiaryNotes error:", err);
    throw err;
  }
};
