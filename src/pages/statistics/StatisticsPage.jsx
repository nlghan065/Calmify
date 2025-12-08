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
  Legend,
} from "recharts";

import styles from "./Statistics.module.css";

export default function StatisticsPage() {
  const [filter, setFilter] = useState("week");
  const [timeOfDay, setTimeOfDay] = useState("fullDay"); // Sáng, Trưa, Tối, Cả ngày

  // Dữ liệu cảm xúc theo ngày và thời gian
  const emotionChart = [
    { day: "T2", morning: 4, noon: 3.5, evening: 4.2, fullDay: 4 },
    { day: "T3", morning: 3.5, noon: 4, evening: 4.5, fullDay: 4 },
    { day: "T4", morning: 4.2, noon: 3.8, evening: 4.1, fullDay: 4 },
    { day: "T5", morning: 3.2, noon: 3.5, evening: 3.8, fullDay: 3.5 },
    { day: "T6", morning: 3.8, noon: 4.2, evening: 4, fullDay: 4 },
    { day: "T7", morning: 4.5, noon: 4, evening: 4.3, fullDay: 4.3 },
    { day: "CN", morning: 4.3, noon: 4.1, evening: 4.5, fullDay: 4.3 },
  ];

  // Tính toán các số liệu tóm tắt
  const averageEmotion = (
    emotionChart.reduce((sum, item) => sum + item.fullDay, 0) /
    emotionChart.length
  ).toFixed(1);

  const bestDay = emotionChart.reduce((prev, curr) =>
    prev.fullDay > curr.fullDay ? prev : curr
  ).day;

  const worstDay = emotionChart.reduce((prev, curr) =>
    prev.fullDay < curr.fullDay ? prev : curr
  ).day;

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
            <p className={styles.value}>{averageEmotion}/5</p>
            <span className={styles.trendUp}>+0.3</span>
          </div>

          <div className={styles.card}>
            <h3>Ngày tốt nhất</h3>
            <p className={styles.value}>{bestDay}</p>
            <span className={styles.trendUp}>🎉</span>
          </div>

          <div className={styles.card}>
            <h3>Ngày xấu nhất</h3>
            <p className={styles.value}>{worstDay}</p>
            <span className={styles.trendDown}>😔</span>
          </div>

          <div className={styles.card}>
            <h3>Streak hiện tại</h3>
            <p className={styles.value}>7 ngày</p>
            <span className={styles.trendUp}>Kỷ lục!</span>
          </div>
        </div>

        {/* ==== CHART ==== */}
        <div className={styles.chartBox}>
          <div
            className={styles.chartHeader}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Bên trái: Filter thời gian trong ngày (chỉ khi chọn "Ngày") */}
            <div style={{ display: "flex", gap: "5px" }}>
              {filter === "day" && (
                <div
                  className={styles.timeFilter}
                  style={{ display: "flex", gap: "5px" }}
                >
                  <button
                    className={timeOfDay === "morning" ? styles.activeTime : ""}
                    onClick={() => setTimeOfDay("morning")}
                  >
                    Sáng
                  </button>
                  <button
                    className={timeOfDay === "noon" ? styles.activeTime : ""}
                    onClick={() => setTimeOfDay("noon")}
                  >
                    Trưa
                  </button>
                  <button
                    className={timeOfDay === "evening" ? styles.activeTime : ""}
                    onClick={() => setTimeOfDay("evening")}
                  >
                    Tối
                  </button>
                  <button
                    className={timeOfDay === "fullDay" ? styles.activeTime : ""}
                    onClick={() => setTimeOfDay("fullDay")}
                  >
                    Cả ngày
                  </button>
                </div>
              )}
            </div>

            {/* Bên phải: Filter Ngày/Tuần/Tháng/Năm luôn hiển thị */}
            <div
              className={styles.filterGroup}
              style={{ display: "flex", gap: "5px" }}
            >
              <button
                className={`${styles.filterButton} ${
                  filter === "day" ? styles.activeFilter : ""
                }`}
                onClick={() => setFilter("day")}
              >
                Ngày
              </button>

              <button
                className={`${styles.filterButton} ${
                  filter === "week" ? styles.activeFilter : ""
                }`}
                onClick={() => setFilter("week")}
              >
                Tuần
              </button>
              <button
                className={`${styles.filterButton} ${
                  filter === "month" ? styles.activeFilter : ""
                }`}
                onClick={() => setFilter("month")}
              >
                Tháng
              </button>
              <button
                className={`${styles.filterButton} ${
                  filter === "year" ? styles.activeFilter : ""
                }`}
                onClick={() => setFilter("year")}
              >
                Năm
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emotionChart}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis domain={[1, 5]} />
              <Tooltip
                formatter={(value) => `${value}/5`}
                labelFormatter={(day) => {
                  const dayData = emotionChart.find((d) => d.day === day);
                  return `${day} - Sáng:${dayData.morning} Trưa:${dayData.noon} Tối:${dayData.evening} Cả ngày:${dayData.fullDay}`;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={timeOfDay}
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
