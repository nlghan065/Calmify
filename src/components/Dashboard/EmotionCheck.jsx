import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify"; // Import thêm cái này

export const EMOTIONS = [
  { id: 1, icon: "😭", label: "Rất buồn" },
  { id: 2, icon: "😔", label: "Buồn" },
  { id: 3, icon: "😐", label: "Bình thường" },
  { id: 4, icon: "😊", label: "Ổn áp" },
  { id: 5, icon: "😆", label: "Vui vẻ" },
];

export default function EmotionCheck({ onSubmit }) {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");

  const handleSelect = (emo) => {
    setSelectedEmotion(emo);
  };

  const handleSend = () => {
    // SỬA: Dùng toast thay vì alert cho đồng bộ
    if (!selectedEmotion) {
      toast.warning("Bạn ơi, hãy chọn một cảm xúc nhé! 🤔");
      return;
    }

    // Gửi đúng key BE yêu cầu: { mood, note }
    const dataToSend = {
      mood: selectedEmotion.icon, // Gửi icon (ví dụ: '😭')
      note: note.trim(),
    };

    // Gọi hàm từ Parent truyền xuống
    if (onSubmit) {
      onSubmit(dataToSend);

      // Reset form sau khi gửi
      setSelectedEmotion(null);
      setNote("");
    }
  };

  return (
    <div className={styles.emotionCard}>
      <h3>Hôm nay bạn cảm thấy thế nào?</h3>
      <p>Hãy chọn mức độ cảm xúc và ghi lại suy nghĩ của bạn nhé.</p>

      <div className={styles.emotionButtons}>
        {EMOTIONS.map((e) => (
          <button
            key={e.id}
            type="button"
            className={`${styles.emotionBtn} ${
              selectedEmotion?.id === e.id ? styles.activeEmotion : ""
            }`}
            onClick={() => handleSelect(e)}
            title={e.label} // Thêm title để hover thấy chữ
          >
            {e.icon}
          </button>
        ))}
      </div>
      {/* Hiển thị label cảm xúc đang chọn cho rõ ràng */}
      {selectedEmotion && (
        <p style={{ textAlign: "center", fontWeight: "bold", color: "#555" }}>
          {selectedEmotion.label}
        </p>
      )}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ghi chú ngắn về cảm xúc hôm nay..."
        className={styles.textarea} // Đảm bảo CSS có class này
      />

      <button className={styles.submitBtn} onClick={handleSend} type="button">
        Gửi cảm xúc
      </button>
    </div>
  );
}
