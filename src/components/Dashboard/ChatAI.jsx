// src/components/Dashboard/ChatAI.jsx (Hoặc Relax/ChatAI.jsx tùy bạn đặt)
import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom"; // Phải import cái này

export default function ChatWidget() {
  // Đổi tên để không trùng với trang ChatAI lớn
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleStartChat = () => {
    console.log("Button clicked!"); // 1. Kiểm tra xem bấm nút có log ra dòng này không

    if (!text.trim()) {
      alert("Bạn chưa nhập nội dung!"); // Nhắc nhở nếu quên nhập
      return;
    }

    console.log("Navigating to /chat with text:", text);

    // 2. Chuyển hướng
    navigate("/chat", { state: { initialMessage: text } });
  };

  return (
    <div className={styles.card}>
      <h4>Chat với AI lắng nghe</h4>
      <p>Chia sẻ điều bạn đang nghĩ, AI luôn ở đây lắng nghe.</p>

      <input
        placeholder="Bắt đầu trò chuyện..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        // Thêm sự kiện Enter
        onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
      />

      {/* Thêm onClick vào nút này */}
      <button onClick={handleStartChat} type="button">
        Gửi
      </button>
    </div>
  );
}
