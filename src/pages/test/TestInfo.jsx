import React from "react";
import { Typography, Button } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const TEST_METADATA = {
  PHQ9: { count: 9, time: "3-5 phút", name: "Thang đo Trầm cảm (PHQ-9)" },
  DASS21: {
    count: 21,
    time: "5-10 phút",
    name: "Thang đo Lo âu - Trầm cảm - Stress (DASS-21)",
  },
  RADS: {
    count: 30,
    time: "10-15 phút",
    name: "Thang đo Trầm cảm Thanh thiếu niên (RADS)",
  },
};

const TestInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentTest = TEST_METADATA[id] || {
    count: 0,
    time: "N/A",
    name: `Bài test ${id}`,
  };

  const handleStartTest = () => navigate(`/test-start/${id}`);

  return (
    <LayoutContainer>
      <div className={styles.testContainer}>
        <Title level={2} className={styles.title}>
          {currentTest.name}
        </Title>
        <p className={styles.subtitle}>
          Bài test này giúp đánh giá sức khỏe tinh thần của bạn một cách nhanh
          chóng.
        </p>
        <div className={styles.testMetaBox}>
          <p>
            <strong>Số lượng câu hỏi:</strong> {currentTest.count} câu
          </p>
          <p>
            <strong>Thời gian làm bài:</strong> {currentTest.time}
          </p>
        </div>
        <Button
          type="primary"
          size="large"
          className={styles.button}
          onClick={handleStartTest}
        >
          Bắt đầu bài test
        </Button>
      </div>
    </LayoutContainer>
  );
};

export default TestInfo;
