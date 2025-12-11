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
      // Backend trả về { message, data }
      setNotes(response || []);
    } catch (err) {
      console.error("[EmotionDiary] Error fetching notes:", err);
      toast.error("Không thể tải nhật ký!");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
      toast.success("Đã lưu nhật ký!");
      setShowForm(false);
      setSelectedEmotion(null);
      setNote("");
      fetchNotes();
    } catch (err) {
      console.error("[EmotionDiary] Error saving note:", err);
      toast.error("Lưu thất bại!");
    }
  };

  return (
    <LayoutContainer>
      <div className={styles.container}>
        {/* Header + nút thêm */}
        <div className={styles.header}>
          <h2>Nhật ký cảm xúc</h2>
          <button
            className={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
            type="button"
          >
            {showForm ? "Thu gọn ↑" : "+ Thêm"}
          </button>
        </div>

        {/* Form ghi nhật ký */}
        {showForm && (
          <div className={styles.form}>
            <h3>Ghi lại cảm xúc của bạn để hiểu bản thân hơn!</h3>

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
                >
                  {emo.icon} <span className={styles.label}>{emo.label}</span>
                </button>
              ))}
            </div>

            {/* Ghi note */}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hôm nay của bạn thế nào?"
              className={styles.textarea}
            />

            {/* Nút lưu/hủy */}
            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleSave}
                className={styles.saveBtn}
              >
                Lưu
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

        {/* Danh sách nhật ký */}
        <div className={styles.list}>
          {notes.length === 0 && <p>Chưa có nhật ký nào.</p>}
          {notes.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.icon}>{item.mood}</div>
              <div className={styles.content}>
                <p>{item.note}</p>
                <span className={styles.date}>
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
