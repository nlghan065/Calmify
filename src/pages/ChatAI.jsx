import React, { useState, useEffect, useRef } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./ChatAI.module.css";
import axios from "axios";

export default function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: userInput,
      });

      const botMsg = {
        sender: "bot",
        text: res.data.reply || "(Không có nội dung trả về)",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Lỗi kết nối server. Vui lòng thử lại." },
      ]);
    }

    setLoading(false);
  };

  return (
    <LayoutContainer>
      <div className={styles.chatWrapper}>
        <div className={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {msg.text}
            </div>
          ))}

          {loading && <div className={styles.botMessage}>Đang trả lời...</div>}

          {/* AUTO SCROLL TARGET */}
          <div ref={chatEndRef} />
        </div>

        <div className={styles.inputArea}>
          <input
            type="text"
            value={input}
            placeholder="Nhập tin nhắn..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Gửi</button>
        </div>
      </div>
    </LayoutContainer>
  );
}
