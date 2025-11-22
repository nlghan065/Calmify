import React, { useState } from "react";
import { Radio, Button, Typography } from "antd";
import PageLayout from "@/components/Page/PageLayout";
import styles from "@/style/Page.module.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const TestInfoPHQ9 = () => {
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
          Bài test PHQ-9 là công cụ sàng lọc và đánh giá mức độ trầm cảm được sử
          dụng rộng rãi trên toàn thế giới. Bài test gồm 9 câu hỏi về cảm xúc và
          hành vi trong 2 tuần gần đây. Đối tượng phù hợp là người trưởng thành
          hoặc thanh thiếu niên từ 13 tuổi trở lên đang muốn tự đánh giá trạng
          thái tinh thần của mình. Kết quả giúp bạn nhận biết sớm dấu hiệu trầm
          cảm và theo dõi mức độ thay đổi cảm xúc theo thời gian.
        </p>
        <button
          className={styles.button}
          onClick={() => navigate("/test-phq9")}
        >
          Bắt đầu bài test
        </button>
      </div>
    </PageLayout>
  );
};

export default TestInfoPHQ9;
