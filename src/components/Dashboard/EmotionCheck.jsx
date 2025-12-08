import React, { useState } from "react";
import styles from "./Dashboard.module.css";

export const EMOTIONS = [
  { id: 1, icon: "😭", label: "Rất buồn" },
  { id: 2, icon: "😔", label: "Buồn" },
  { id: 3, icon: "😐", label: "Bình thường" },
  { id: 4, icon: "😊", label: "Ổn áp" },
  { id: 5, icon: "😆", label: "Vui vẻ" },
];

export default function EmotionCheck({
  mode = "dashboard", // dashboard | picker
  value,
  onChange,
}) {
  const [note, setNote] = useState("");

  const handleSelect = (emo) => {
    if (onChange) onChange(emo);
  };

  return (
    <div className={styles.emotionCard}>
      {/* ✅ CHỈ HIỆN Ở DASHBOARD */}
      {mode === "dashboard" && (
        <>
          <h3>Hôm nay bạn cảm thấy thế nào?</h3>
          <p>Hãy chọn mức độ cảm xúc và ghi lại suy nghĩ của bạn nhé.</p>
        </>
      )}

      <div className={styles.emotionButtons}>
        {EMOTIONS.map((e) => (
          <button
            key={e.id}
            className={`${styles.emotionBtn} ${
              value === e.icon ? styles.activeEmotion : ""
            }`}
            onClick={() => handleSelect(e)}
          >
            {e.icon}
          </button>
        ))}
      </div>

      {/* ✅ CHỈ HIỆN Ở TRANG CHỦ */}
      {mode === "dashboard" && (
        <>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú ngắn về cảm xúc hôm nay..."
          />
          <button className={styles.submitBtn}>Gửi cảm xúc</button>
        </>
      )}
    </div>
  );
}
