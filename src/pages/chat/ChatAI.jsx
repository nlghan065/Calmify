import { useEffect, useRef, useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./ChatAI.module.css";
import {
  sendChatMessage,
  getChatHistory,
  getChatSessions,
} from "@/api/chat/chatApi";
// 1. Import useLocation để nhận dữ liệu
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

// ... (Giữ nguyên phần Icons MenuIcon, NewChatIcon) ...
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const NewChatIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function ChatAI() {
  const today = new Date().toLocaleDateString("vi-VN");
  const [searchParams] = useSearchParams();
  const urlSessionId = searchParams.get("session");
  const navigate = useNavigate();
  const location = useLocation(); // 2. Hook lấy state từ navigate

  // --- STATE ---
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // State quản lý Sidebar
  const [sessions, setSessions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!urlSessionId);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Dùng ref để tránh việc useEffect chạy sendMessage bị lặp vô tận do dependency
  const isAutoSending = useRef(false);

  // --- GIỮ NGUYÊN PHẦN LOAD SESSIONS & HISTORY ---
  const fetchSessions = async () => {
    try {
      const data = await getChatSessions();
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi tải danh sách chat:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      if (!urlSessionId) {
        setSessionId(null);
        // Nếu không có tin nhắn tự động từ Dashboard thì mới hiện câu chào
        if (!location.state?.initialMessage) {
          setMessages([
            {
              role: "bot",
              text: "Xin chào! Mình là Calmify. Mình có thể giúp gì cho bạn hôm nay?",
              time: new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        }
        setIsSidebarOpen(true);
        return;
      }

      try {
        setSessionId(urlSessionId);
        setIsSidebarOpen(false);
        const historyData = await getChatHistory(urlSessionId);
        const formatted = historyData.map((msg) => ({
          role: msg.sender === "USER" ? "user" : "bot",
          text: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("❌ Lỗi tải lịch sử chat:", err);
        navigate("/chat");
      }
    };
    loadHistory();
  }, [urlSessionId, navigate]);

  // --- AUTO SCROLL ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isSidebarOpen]);

  // --- 3. SỬA HÀM SEND MESSAGE ĐỂ NHẬN THAM SỐ (QUAN TRỌNG) ---
  // Thêm tham số manualText (mặc định là null)
  const sendMessage = async (manualText = null) => {
    // Ưu tiên manualText (từ Dashboard), nếu không có thì lấy từ input state
    const userText = manualText || input;

    if (!userText.trim() || isTyping) return;

    // Reset input nếu đang nhập tay
    if (!manualText) setInput("");

    setIsTyping(true);

    const userTime = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // UI Optimistic
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText, time: userTime },
    ]);

    try {
      // Gọi API với userText đã xác định
      const data = await sendChatMessage({
        message: userText,
        sessionId: sessionId,
      });

      if (!sessionId) {
        const updatedSessions = await getChatSessions();
        setSessions(updatedSessions);
        if (updatedSessions.length > 0) {
          const newestSession = updatedSessions[0];
          setSessionId(newestSession.sessionId);
          // Update URL
          window.history.pushState(
            {},
            "",
            `/chat?session=${newestSession.sessionId}`
          );
        }
      } else {
        fetchSessions();
      }

      typeBotMessage(
        data.reply,
        new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      if (data.isLocked) {
        console.warn("⚠️ Phát hiện tín hiệu khẩn cấp/tự sát.");
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Xin lỗi, kết nối server bị gián đoạn 😥",
          time: userTime,
        },
      ]);
    }
  };

  // --- 4. USE EFFECT ĐỂ BẮT TIN NHẮN TỪ DASHBOARD ---
  useEffect(() => {
    // Kiểm tra xem có tin nhắn từ Dashboard chuyển qua không
    if (location.state?.initialMessage && !isAutoSending.current) {
      const msg = location.state.initialMessage;

      // Đánh dấu để không gửi lại 2 lần (do React StrictMode)
      isAutoSending.current = true;

      // Gọi hàm gửi tin nhắn với nội dung từ dashboard
      sendMessage(msg);

      // Xóa state trong history để F5 không bị gửi lại
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]); // Chỉ chạy khi state thay đổi

  // --- CÁC HÀM PHỤ TRỢ GIỮ NGUYÊN ---
  const typeBotMessage = (text, time) => {
    let index = -1;
    setMessages((prev) => [...prev, { role: "bot", text: "", time }]);
    const interval = setInterval(() => {
      index++;
      setMessages((prev) => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        lastMsg.text = text.slice(0, index + 1);
        return newMsgs;
      });
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);
  };

  const handleSelectSession = (id) => {
    navigate(`/chat?session=${id}`);
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    navigate("/chat");
    setIsSidebarOpen(true);
    inputRef.current?.focus();
  };

  return (
    <LayoutContainer>
      <div className={styles.wrapper}>
        {/* SIDEBAR TRÁI */}
        <div
          className={`${styles.sidebar} ${
            isSidebarOpen ? styles.open : styles.closed
          }`}
        >
          <div className={styles.sidebarHeader}>
            <h3>Lịch sử</h3>
            <button onClick={handleNewChat} className={styles.newChatBtn}>
              <NewChatIcon /> Mới
            </button>
          </div>
          <div className={styles.sessionList}>
            {sessions.length === 0 && (
              <p className={styles.emptyText}>Chưa có hội thoại nào</p>
            )}
            {sessions.map((session) => (
              <div
                key={session.sessionId}
                className={`${styles.sessionItem} ${
                  sessionId === session.sessionId ? styles.activeSession : ""
                }`}
                onClick={() => handleSelectSession(session.sessionId)}
              >
                <p>{session.title || "Cuộc trò chuyện mới"}</p>
                <span className={styles.sessionDate}>
                  {new Date(session.updatedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div className={styles.container}>
          {!isSidebarOpen && (
            <button
              className={styles.toggleButton}
              onClick={() => setIsSidebarOpen(true)}
              title="Mở lịch sử"
            >
              <MenuIcon />
            </button>
          )}

          <div className={styles.chatBox}>
            <div className={styles.chatDate}>{`Hôm nay, ${today}`}</div>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user" ? styles.userMessage : styles.botMessage
                }
              >
                <span className={styles.messageText}>{msg.text}</span>
                <span className={styles.time}>{msg.time}</span>
              </div>
            ))}
            {isTyping && <div className={styles.botMessage}>...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
              disabled={isTyping}
            />
            <button onClick={() => sendMessage()} disabled={isTyping}>
              Gửi
            </button>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}
