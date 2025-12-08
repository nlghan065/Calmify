import { useEffect, useRef, useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./ChatAI.module.css";

export default function ChatAI() {
  const today = new Date().toLocaleDateString("vi-VN");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Xin chào! Mình có thể giúp gì cho bạn?",
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input, time: currentTime },
    ]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botTime = new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Mình đã nhận được tin nhắn của bạn rồi 😊",
          time: botTime,
        },
      ]);

      setIsTyping(false);
    }, 1200);
  };

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <div className={styles.chatBox}>
          {/* ✅ NGÀY Ở ĐẦU CHAT */}
          <div className={styles.chatDate}>Hôm nay, {today}</div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user" ? styles.userMessage : styles.botMessage
              }
            >
              <span className={styles.messageText}>{msg.text}</span>
              <span className={styles.time}>{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className={styles.botMessage}>Calmify đang trả lời...</div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className={styles.inputArea}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Gửi</button>
        </div>
      </div>
    </LayoutContainer>
  );
}
