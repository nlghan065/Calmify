import React, { useState } from "react";
import styles from "./Dashboard.module.css";

export default function EmotionCheck() {
  const [level, setLevel] = useState(3);

  const emotions = [
    { id: 1, icon: "😭" },
    { id: 2, icon: "😔" },
    { id: 3, icon: "😐" },
    { id: 4, icon: "😊" },
    { id: 5, icon: "😆" },
  ];

  return (
    <div className={styles.emotionCard}>
      <h3>Hôm nay bạn cảm thấy thế nào?</h3>
      <p>Hãy chọn mức độ cảm xúc và ghi lại suy nghĩ của bạn nhé.</p>

      <div className={styles.emotionButtons}>
        {emotions.map((e) => (
          <button
            key={e.id}
            className={`${styles.emotionBtn} ${
              level === e.id ? styles.activeEmotion : ""
            }`}
            onClick={() => setLevel(e.id)}
          >
            {e.icon}
          </button>
        ))}
      </div>

      <textarea placeholder="Ghi chú ngắn về cảm xúc hôm nay..." />
      <button className={styles.submitBtn}>Gửi cảm xúc</button>
    </div>
  );
}
