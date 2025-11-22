import React from "react";
import LayoutContainer from "@/components/Layout/LayoutContainer";
import EmotionCheck from "./EmotionCheck";
import RelaxExercises from "./RelaxExercises";
import ChatAI from "./ChatAI";
import EmotionOverview from "./EmotionOverview";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <LayoutContainer>
      <div className={styles.dashboard}>
        <EmotionCheck />
        <div className={styles.bottomSection}>
          <RelaxExercises />
          <ChatAI />
          <EmotionOverview />
        </div>
      </div>
    </LayoutContainer>
  );
}
