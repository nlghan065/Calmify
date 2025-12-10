import React, { useState } from "react";
import LayoutContainer from "@/components/Layout/LayoutContainer";
import EmotionCheck from "@/components/Dashboard/EmotionCheck";
import { checkTodayEmotion } from "@/api/emotion/emotionAPI";

import RelaxExercises from "./RelaxExercises";
import ChatAI from "./ChatAI";
import EmotionOverview from "./EmotionOverview";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmitEmotion = async (data) => {
    /**
     * data = { emotion: emoji, note: string, date: ISO string }
     */
    console.log("[Dashboard] handleSubmitEmotion data:", data);

    setLoading(true);
    setMessage("");

    try {
      const result = await checkTodayEmotion(data);
      console.log("[Dashboard] Emotion submitted:", result);
      setMessage("Cảm xúc hôm nay đã được lưu!");
    } catch (err) {
      console.error("[Dashboard] Error submitting emotion:", err);
      setMessage("Có lỗi khi gửi cảm xúc. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutContainer>
      <div className={styles.dashboard}>
        <EmotionCheck
          mode="dashboard"
          onSubmit={handleSubmitEmotion} // 🔥 gửi data lên API
          onChange={(emo) => console.log("[Dashboard] Emotion selected:", emo)}
        />

        {loading && <p>Đang gửi cảm xúc...</p>}
        {message && <p>{message}</p>}

        <div className={styles.bottomSection}>
          <RelaxExercises />
          <ChatAI />
          <EmotionOverview />
        </div>
      </div>
    </LayoutContainer>
  );
}
