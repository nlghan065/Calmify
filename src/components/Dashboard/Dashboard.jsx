import React, { useState } from "react";
import LayoutContainer from "@/components/Layout/LayoutContainer";
import EmotionCheck from "@/components/Dashboard/EmotionCheck";
import { checkTodayEmotion } from "@/api/emotion/emotionAPI";
import { toast } from "react-toastify";

import RelaxExercises from "./RelaxExercises";
import EmotionOverview from "./EmotionOverview";
import styles from "./Dashboard.module.css";

// 👇 QUAN TRỌNG: Import component bạn vừa sửa
// Giả sử file widget bạn lưu tại đường dẫn: src/components/Dashboard/ChatAI.jsx
// Vì bạn export default function ChatWidget, nên ta có thể đặt tên tùy ý khi import,
// nhưng đặt là ChatWidget cho rõ ràng.
import ChatWidget from "./ChatAI";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const handleSubmitEmotion = async (data) => {
    console.log("[Dashboard] Submitting data:", data);
    setLoading(true);
    try {
      await checkTodayEmotion(data);
      toast.success("Đã ghi nhận cảm xúc của bạn! 💪");
    } catch (err) {
      console.error("[Dashboard] Error submitting emotion:", err);
      toast.error("Có lỗi khi gửi cảm xúc. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutContainer>
      <div className={styles.dashboard}>
        <EmotionCheck onSubmit={handleSubmitEmotion} />

        {loading && (
          <p style={{ textAlign: "center", color: "#666" }}>Đang lưu...</p>
        )}

        <div className={styles.bottomSection}>
          <RelaxExercises />

          {/* 👇 Sử dụng ChatWidget ở đây */}
          <ChatWidget />

          <EmotionOverview />
        </div>
      </div>
    </LayoutContainer>
  );
}
