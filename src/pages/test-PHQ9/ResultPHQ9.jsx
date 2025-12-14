// ResultPHQ9.jsx
import React from "react";
import { Button, Typography } from "antd";
import PageLayout from "@/components/Page/PageLayout";
import styles from "@/style/Page.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const { Title } = Typography;

const ResultPHQ9 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy kết quả từ state được truyền qua navigate
  const result = location.state?.result;

  if (!result) {
    // Nếu user truy cập thẳng link này mà không qua test, đá về trang intro
    navigate("/test-info-phq9");
    return null;
  }

  return (
    <PageLayout>
      <div className={styles.testContainer}>
        <Title level={2} className={styles.title}>
          Kết Quả Sơ Bộ
        </Title>

        {/* Hiển thị điểm số */}
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h1 style={{ fontSize: "3rem", color: "#1890ff", margin: 0 }}>
            {result.totalScore}
          </h1>
          <h3 style={{ color: "#555" }}>Mức độ: {result.severity}</h3>
        </div>

        <p className={styles.subtitle}>
          {result.advice} <br />
          <br />
          <em>
            *Lưu ý: Kết quả này chỉ mang tính tham khảo và hiện chưa được lưu
            vào hồ sơ sức khỏe của bạn.
          </em>
        </p>

        {/* Logic Merge: Hướng dẫn user đăng nhập để lưu */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button
            type="primary"
            className={styles.button}
            onClick={() => navigate("/login")}
            size="large"
          >
            Đăng nhập để lưu kết quả & Trò chuyện cùng AI
          </Button>

          <Button type="text" onClick={() => navigate("/")}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResultPHQ9;
