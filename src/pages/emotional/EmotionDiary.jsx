import { useState, useEffect } from "react";
import styles from "./EmotionDiary.module.css";
import LayoutContainer from "@/Layout/LayoutContainer";
import { createDiaryNote, getDiaryNotes } from "@/api/emotion/emotionAPI";
import { toast } from "react-toastify";

// Danh sách cảm xúc
const EMOTIONS = [
  { id: 1, icon: "😭", label: "Rất buồn" },
  { id: 2, icon: "😔", label: "Buồn" },
  { id: 3, icon: "😐", label: "Bình thường" },
  { id: 4, icon: "😊", label: "Ổn áp" },
  { id: 5, icon: "😆", label: "Vui vẻ" },
];

export default function EmotionDiary() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load danh sách nhật ký
  const fetchNotes = async () => {
    try {
      const response = await getDiaryNotes();
      console.log("[EmotionDiary] Fetched notes:", response);

      // --- SỬA Ở ĐÂY ---
      // Backend trả về { success: true, data: [...] }
      if (response && response.data && Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        setNotes([]); // Fallback nếu dữ liệu không đúng
      }
      // -----------------
    } catch (err) {
      console.error("[EmotionDiary] Error fetching notes:", err);
      // toast.error("Không thể tải nhật ký!"); // Có thể tắt để đỡ phiền nếu mới vào chưa có data
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Lưu nhật ký mới
  const handleSave = async () => {
    if (!selectedEmotion) {
      toast.error("Vui lòng chọn cảm xúc!");
      return;
    }

    const payload = {
      mood: selectedEmotion.icon,
      note: note.trim(),
    };

    try {
      const result = await createDiaryNote(payload);
      console.log("[EmotionDiary] Save result:", result);

      toast.success("Đã lưu nhật ký! 📝");

      // Reset form
      setShowForm(false);
      setSelectedEmotion(null);
      setNote("");

      // Load lại danh sách
      fetchNotes();
    } catch (err) {
      console.error("[EmotionDiary] Error saving note:", err);
      toast.error("Lưu thất bại!");
    }
  };

  // Nhóm notes theo ngày
  // Tìm đoạn này trong EmotionDiary.jsx
  const groupNotesByDate = (notesList) => {
    if (!Array.isArray(notesList)) return {};

    return notesList.reduce((acc, noteItem) => {
      const dateSource = noteItem.diaryDate || noteItem.createdAt;

      // --- SỬA DÒNG NÀY ---
      // Ép về múi giờ Việt Nam để không bị nhảy sang ngày hôm trước/sau
      const dateKey = new Date(dateSource).toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      // --------------------

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(noteItem);
      return acc;
    }, {});
  };
  const groupedNotes = groupNotesByDate(notes);

  // Sắp xếp ngày mới nhất lên đầu (Parse theo format vi-VN hoặc Date object gốc)
  const sortedDates = Object.keys(groupedNotes).sort((a, b) => {
    // Vì a, b là string 'dd/mm/yyyy', convert lại để so sánh chính xác
    const [dayA, monthA, yearA] = a.split("/");
    const [dayB, monthB, yearB] = b.split("/");
    return (
      new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA)
    );
  });

  return (
    <LayoutContainer>
      <div className={styles.container}>
        {/* Header + nút thêm */}
        <div className={styles.header}>
          <h2>Nhật ký cảm xúc </h2>
          <button
            className={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
            type="button"
          >
            {showForm ? "Thu gọn ↑" : "+ Viết nhật ký"}
          </button>
        </div>

        {/* Form ghi nhật ký */}
        {showForm && (
          <div className={styles.form}>
            <h3>Hôm nay bạn cảm thấy thế nào?</h3>

            {/* Chọn cảm xúc */}
            <div className={styles.emotionButtons}>
              {EMOTIONS.map((emo) => (
                <button
                  key={emo.id}
                  type="button"
                  className={`${styles.emotionBtn} ${
                    selectedEmotion?.id === emo.id ? styles.activeEmotion : ""
                  }`}
                  onClick={() => setSelectedEmotion(emo)}
                  title={emo.label}
                >
                  {emo.icon}
                </button>
              ))}
            </div>
            {selectedEmotion && (
              <p className={styles.emotionLabel}>{selectedEmotion.label}</p>
            )}

            {/* Ghi note */}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Chia sẻ một chút về ngày hôm nay..."
              className={styles.textarea}
            />

            {/* Nút lưu/hủy */}
            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleSave}
                className={styles.saveBtn}
              >
                Lưu lại
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setShowForm(false);
                  setSelectedEmotion(null);
                  setNote("");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Danh sách nhật ký theo ngày */}
        <div className={styles.list}>
          {notes.length === 0 && !showForm && (
            <div style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              <p>Bạn chưa viết nhật ký nào.</p>
              <p>Hãy bắt đầu ghi lại cảm xúc của mình nhé! 🌱</p>
            </div>
          )}

          {sortedDates.map((date) => (
            <div key={date} className={styles.dateGroup}>
              <h4 className={styles.dateHeader}>{date}</h4>
              {groupedNotes[date]
                .sort(
                  (a, b) =>
                    // ✅ MỚI: Ưu tiên createdAt để lấy đúng giờ, phút, giây
                    // b - a: Mới nhất lên đầu (10h sáng nằm trên 8h sáng)
                    // a - b: Cũ nhất lên đầu (8h sáng nằm trên 10h sáng)
                    new Date(b.createdAt || b.diaryDate) -
                    new Date(a.createdAt || a.diaryDate)
                )
                .map((item) => (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.icon}>
                      {item.mood || item.iconUrl}
                    </div>
                    <div className={styles.content}>
                      <p>{item.note}</p>
                      <span className={styles.date}>
                        {new Date(
                          item.createdAt || item.diaryDate // Đổi vị trí: Ưu tiên createdAt trước
                        ).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
