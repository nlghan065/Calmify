import React, { useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./Statistics.module.css";

export default function StatisticsPage() {
  const [filter, setFilter] = useState("week");

  const emotionChart = [
    { day: "T2", value: 4 },
    { day: "T3", value: 3.5 },
    { day: "T4", value: 4.6 },
    { day: "T5", value: 3.2 },
    { day: "T6", value: 3.8 },
    { day: "T7", value: 4.5 },
    { day: "CN", value: 4.3 },
  ];

  const emotionDistribution = [
    { label: "Rất vui", amount: 12, percent: 27, color: "#4caf50" },
    { label: "Vui", amount: 18, percent: 40, color: "#3f82ff" },
    { label: "Bình thường", amount: 10, percent: 22, color: "#f4b400" },
    { label: "Buồn", amount: 4, percent: 9, color: "#ff7043" },
    { label: "Rất buồn", amount: 1, percent: 2, color: "#e53935" },
  ];

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Thống kê</h2>
        <p className={styles.subtitle}>
          Theo dõi hành trình sức khỏe tinh thần của bạn
        </p>

        {/* ==== TOP CARDS ==== */}
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <h3>Cảm xúc trung bình</h3>
            <p className={styles.value}>4.2/5</p>
            <span className={styles.trendUp}>+0.3</span>
          </div>

          <div className={styles.card}>
            <h3>Ngày ghi nhật ký</h3>
            <p className={styles.value}>45</p>
            <span className={styles.trendUp}>+12%</span>
          </div>

          <div className={styles.card}>
            <h3>Bài test hoàn thành</h3>
            <p className={styles.value}>8</p>
            <span className={styles.trendUp}>+3</span>
          </div>

          <div className={styles.card}>
            <h3>Streak hiện tại</h3>
            <p className={styles.value}>7 ngày</p>
            <span className={styles.trendUp}>Kỷ lục!</span>
          </div>
        </div>

        {/* ==== CHART ==== */}
        <div className={styles.chartBox}>
          <div className={styles.chartHeader}>
            <h3>Biểu đồ cảm xúc</h3>

            <div className={styles.filterGroup}>
              <button
                className={filter === "day" ? styles.activeFilter : ""}
                onClick={() => setFilter("day")}
              >
                Ngày
              </button>
              <button
                className={filter === "week" ? styles.activeFilter : ""}
                onClick={() => setFilter("week")}
              >
                Tuần
              </button>
              <button
                className={filter === "month" ? styles.activeFilter : ""}
                onClick={() => setFilter("month")}
              >
                Tháng
              </button>
              <button
                className={filter === "year" ? styles.activeFilter : ""}
                onClick={() => setFilter("year")}
              >
                Năm
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={emotionChart}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3f82ff"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ==== DISTRIBUTION ==== */}
        <div className={styles.distributionBox}>
          <h3>Phân bố cảm xúc</h3>

          {emotionDistribution.map((item, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.rowHeader}>
                <span>{item.label}</span>
                <span>
                  {item.amount} lần ({item.percent}%)
                </span>
              </div>

              <div className={styles.progress}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${item.percent}%`, background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
