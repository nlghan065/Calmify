import React, { useState } from "react";
import { Radio, Button, Typography } from "antd";
import PageLayout from "@/components/Page/PageLayout";
import styles from "@/style/Page.module.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Result = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(null);

  return (
    <PageLayout>
      <div className={styles.testContainer}>
        {/* Tiêu đề */}
        <Title level={2} className={styles.title}>
          Bài Test Trầm Cảm (PHQ-9)
        </Title>
        <p className={styles.subtitle}>
          Kết quả của bạn là . Dù điểm số thế nào, cảm xúc của bạn luôn đáng
          được lắng nghe. Hãy đăng nhập để trò chuyện cùng AI lắng nghe – nơi
          bạn có thể tâm sự và nhận sự đồng hành an toàn, kín đáo. 🌱
        </p>
        <button className={styles.button} onClick={() => navigate("/login")}>
          Đăng nhập để trò chuyện cùng AI lắng nghe.
        </button>
      </div>
    </PageLayout>
  );
};

export default Result;
