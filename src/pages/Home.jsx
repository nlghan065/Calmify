import React from "react";
import LayoutContainer from "@/Layout/LayoutContainer";

import EmotionCheck from "@/components/Dashboard/EmotionCheck";
import RelaxExercises from "@/components/Dashboard/RelaxExercises";
import ChatAI from "@/components/Dashboard/ChatAI";
import EmotionOverview from "@/components/Dashboard/EmotionOverview";

import styles from "@/components/Dashboard/Dashboard.module.css";

export default function Home() {
  return (
    <LayoutContainer>
      <div className={styles.dashboard}>
        {/* Khối cảm xúc hôm nay */}
        <EmotionCheck />

        {/* 3 card phía dưới */}
        <div className={styles.bottomSection}>
          <ChatAI />
          <RelaxExercises />
          <EmotionOverview />
        </div>
      </div>
    </LayoutContainer>
  );
}
