import React, { useState } from "react";
import { Radio, Button, Typography } from "antd";
import PageLayout from "@/components/Page/PageLayout";
import styles from "@/style/Page.module.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Test2 = () => {
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
          Trong 2 tuần vừa qua, bạn thường xuyên cảm thấy phiền lòng bởi những
          vấn đề sau đây như thế nào?
        </p>

        {/* Thanh tiến trình */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressHeader}>
            <span>Câu hỏi 2 trên 9</span>
            <span>22%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill2} />
          </div>
        </div>

        {/* Câu hỏi */}
        <p className={styles.questionText}>
          Bạn có cảm thấy buồn bã, chán nản hoặc tuyệt vọng không?
        </p>

        {/* Radio */}
        <Radio.Group
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className={styles.radioGroup}
        >
          <Radio value="not">Không bao giờ</Radio>
          <Radio value="several">Một vài ngày</Radio>
          <Radio value="half">Hơn nửa số ngày</Radio>
          <Radio value="nearly">Gần như mỗi ngày</Radio>
        </Radio.Group>

        {/* Nút điều khiển */}
        <div className={styles.buttonGroup}>
          <Button
            className={styles.backButton}
            onClick={() => navigate("/test-phq9")}
          >
            Quay lại
          </Button>
          <Button
            className={styles.submitButton}
            onClick={() => navigate("/result-phq9")}
            disabled={value === null}
          >
            Gửi câu trả lời
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Test2;
