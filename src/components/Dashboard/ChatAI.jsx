import React from "react";
import styles from "./Dashboard.module.css";

export default function ChatAI() {
  return (
    <div className={styles.card}>
      <h4>Chat với AI lắng nghe</h4>
      <p>Chia sẻ điều bạn đang nghĩ, AI luôn ở đây lắng nghe.</p>
      <input placeholder="Bắt đầu trò chuyện..." />
      <button>Gửi</button>
    </div>
  );
}
