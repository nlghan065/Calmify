import React, { useState, useEffect } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./Statistics.module.css";
import statisticalService from "@/api/statistical/statisticalAPI";

export default function StatisticsPage() {
  const [filter, setFilter] = useState("day");
  const [expandedTests, setExpandedTests] = useState({});
  const [chartData, setChartData] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await statisticalService.getStatistics(filter);

        console.log("RAW STAT RES:", res);

        // 🔴 FIX QUAN TRỌNG
        const backendData = res.data || res;

        // --- CHART ---
        const chartObj = backendData.chart || { labels: [], data: [] };
        const formattedChart = chartObj.labels.map((label, index) => ({
          label,
          value: chartObj.data[index] || 0,
        }));
        setChartData(formattedChart);

        // --- HISTORY ---
        setTestHistory(backendData.testHistory || []);
      } catch (err) {
        console.error("Lỗi tải thống kê:", err);
        setChartData([]);
        setTestHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const toggleExpand = (testCode) => {
    setExpandedTests((prev) => ({
      ...prev,
      [testCode]: !prev[testCode],
    }));
  };

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Thống kê cảm xúc</h2>
        <p className={styles.subtitle}>Theo dõi theo ngày, tuần và tháng</p>

        {/* BIỂU ĐỒ */}
        <div className={styles.chartBox}>
          <div className={styles.filterGroup}>
            {["day", "week", "month"].map((f) => (
              <button
                key={f}
                className={filter === f ? styles.active : ""}
                onClick={() => setFilter(f)}
              >
                {f === "day" ? "Ngày" : f === "week" ? "Tuần" : "Tháng"}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.loading}>Đang tải dữ liệu...</div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="label" />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                <Tooltip formatter={(v) => `${v}/5`} />
                <Bar dataKey="value" fill="#3f82ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className={styles.noData}>
              Chưa có dữ liệu cảm xúc cho khoảng thời gian này
            </div>
          )}
        </div>

        {/* LỊCH SỬ TEST */}
        <div className={styles.testHistoryBox}>
          <h3>Bài test bạn đã làm</h3>

          {testHistory.length === 0 ? (
            <p className={styles.emptyText}>Chưa có dữ liệu bài test.</p>
          ) : (
            <table className={styles.testTable}>
              <thead>
                <tr>
                  <th>Tên bài test</th>
                  <th style={{ textAlign: "center" }}>Lần cuối</th>
                  <th style={{ textAlign: "center" }}>Tổng số</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((test, idx) => {
                  const isExpanded = expandedTests[test.testCode];
                  const attempts = test.attempts || [];

                  return (
                    <React.Fragment key={idx}>
                      <tr
                        className={styles.mainRow}
                        onClick={() => toggleExpand(test.testCode)}
                      >
                        <td>
                          <span
                            className={`${styles.arrow} ${
                              isExpanded ? styles.arrowDown : ""
                            }`}
                          >
                            ▶
                          </span>{" "}
                          {test.testName}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {test.lastDate
                            ? `${new Date(test.lastDate).toLocaleDateString(
                                "vi-VN"
                              )} (${test.lastScore} điểm)`
                            : "-"}
                        </td>
                        <td style={{ textAlign: "center", fontWeight: "bold" }}>
                          {test.totalCount}
                        </td>
                      </tr>

                      {isExpanded &&
                        attempts.map((a, i) => (
                          <tr key={i} className={styles.subRow}>
                            <td>Lần {i + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {new Date(a.date).toLocaleDateString("vi-VN")}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {a.score} điểm
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
}
