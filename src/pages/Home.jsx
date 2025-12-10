import React, { useEffect } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import EmotionCheck from "@/components/Dashboard/EmotionCheck";
import RelaxExercises from "@/components/Dashboard/RelaxExercises";
import ChatAI from "@/components/Dashboard/ChatAI";
import EmotionOverview from "@/components/Dashboard/EmotionOverview";
import styles from "@/components/Dashboard/Dashboard.module.css";

import { toast } from "react-toastify";
import { checkTodayEmotion } from "@/api/emotion/emotionAPI";

export default function Home() {
  // gửi dữ liệu lên BE
  const handleSubmit = async (data) => {
    try {
      const result = await checkTodayEmotion(data); // { mood, note }
      if (result.success || result.message) {
        toast.success("Đã gửi cảm xúc thành công!");
      }
    } catch (err) {
      console.error("Lỗi khi gửi cảm xúc:", err);
      toast.error("Không thể kết nối đến server!");
    }
  };

  return (
    <LayoutContainer>
      <div className={styles.dashboard}>
        <EmotionCheck onSubmit={handleSubmit} />

        <div className={styles.bottomSection}>
          <ChatAI />
          <RelaxExercises />
          <EmotionOverview />
        </div>
      </div>
    </LayoutContainer>
  );
}
