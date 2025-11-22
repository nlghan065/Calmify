import React from "react";
import styles from "./Dashboard.module.css";

export default function EmotionOverview() {
  return (
    <div className={styles.card}>
      <h4>Tổng quan cảm xúc</h4>
      <p>Biểu đồ cảm xúc của bạn trong tuần qua.</p>

      {/* Biểu đồ */}
      <div className={styles.chartWrapper}>
        <div className={styles.chartMock}>
          <div style={{ "--h": 0.3 }}></div>
          <div style={{ "--h": 0.6 }}></div>
          <div style={{ "--h": 0.45 }}></div>
          <div style={{ "--h": 0.8 }}></div>
          <div style={{ "--h": 0.5 }}></div>
          <div style={{ "--h": 0.7 }}></div>
          <div style={{ "--h": 0.4 }}></div>
        </div>

        {/* Nhãn ngày */}
        <div className={styles.chartLabels}>
          <span>T2</span>
          <span>T3</span>
          <span>T4</span>
          <span>T5</span>
          <span>T6</span>
          <span>T7</span>
          <span>CN</span>
        </div>
      </div>
    </div>
  );
}
