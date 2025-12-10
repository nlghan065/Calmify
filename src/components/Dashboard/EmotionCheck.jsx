import React, { useState } from "react";
import styles from "./Dashboard.module.css";

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
    if (!selectedEmotion) {
      alert("Vui lòng chọn cảm xúc!");
      return;
    }

    // gửi đúng key BE yêu cầu: { mood, note }
    const dataToSend = {
      mood: selectedEmotion.icon,
      note: note.trim(),
    };

    onSubmit?.(dataToSend);

    // reset form
    setSelectedEmotion(null);
    setNote("");
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
          >
            {e.icon}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ghi chú ngắn về cảm xúc hôm nay..."
      />

      <button className={styles.submitBtn} onClick={handleSend}>
        Gửi cảm xúc
      </button>
    </div>
  );
}
