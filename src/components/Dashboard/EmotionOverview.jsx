import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import statisticalService from "@/api/statistical/statisticalAPI";

export default function EmotionOverview() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        // Gọi API lấy thống kê theo TUẦN
        const res = await statisticalService.getStatistics("week");

        if (res.success && res.data.chart) {
          const { labels, data } = res.data.chart;

          const formattedData = labels.map((label, index) => ({
            label: label,
            value: data[index] || 0,
          }));

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Lỗi tải EmotionOverview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, []);

  return (
    <div className={styles.card}>
      <h4>Tổng quan cảm xúc</h4>
      <p>Biểu đồ cảm xúc của bạn trong tuần qua.</p>

      <div className={styles.chartWrapper}>
        {loading ? (
          <div style={{ textAlign: "center", color: "#999", marginTop: 40 }}>
            Đang tải dữ liệu...
          </div>
        ) : chartData.length > 0 ? (
          <>
            {/* Cột Biểu Đồ */}
            <div className={styles.chartMock}>
              {chartData.map((item, index) => (
                <div
                  key={index}
                  // Truyền biến --h vào CSS để tính chiều cao (Max 5 điểm)
                  style={{ "--h": item.value / 5 }}
                  // Truyền dữ liệu tooltip để CSS hiển thị khi hover
                  data-tooltip={`${item.value.toFixed(1)} điểm`}
                ></div>
              ))}
            </div>

            {/* Nhãn Ngày */}
            <div className={styles.chartLabels}>
              {chartData.map((item, index) => (
                <span key={index}>{item.label}</span>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", color: "#999", marginTop: 40 }}>
            Chưa có dữ liệu tuần này.
          </div>
        )}
      </div>
    </div>
  );
}
