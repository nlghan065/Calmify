const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Gửi cảm xúc hôm nay (Dashboard)
 * @param {Object} data - { mood, note }
 */
export const checkTodayEmotion = async (data) => {
  try {
    console.log("[API] Sending checkTodayEmotion data:", data);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("[API] Retrieved token:", token);
    const res = await fetch(`${BASE_URL}/emotions/${user.id}`, {
      // bỏ /check
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `[API] checkTodayEmotion failed with status ${res.status}:`,
        errorBody
      );
      throw new Error("Failed to check today emotion");
    }

    const result = await res.json();
    console.log("[API] checkTodayEmotion success:", result);
    return result;
  } catch (err) {
    console.error("[API] checkTodayEmotion error:", err);
    throw err;
  }
};

/**
 * Lưu nhật ký cảm xúc (Diary)
 * @param {Object} data - { mood, note }
 */
export const createDiaryNote = async (data) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const res = await fetch(`${BASE_URL}/emotions/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
      body: JSON.stringify(data), // chỉ gửi { mood, note }
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
 * @returns Array [{ mood, note, createdAt }]
 */
export const getDiaryNotes = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await fetch(`${BASE_URL}/emotions/${user.id}`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("Failed to load diary notes");
    return await res.json();
  } catch (err) {
    console.error("[API] getDiaryNotes error:", err);
    throw err;
  }
};
