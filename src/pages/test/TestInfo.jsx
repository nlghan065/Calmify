import React from "react";
import { Typography, Button } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const TEST_METADATA = {
  PHQ9: {
    count: 9,
    time: "3-5 phút",
    name: "Thang đo Trầm cảm (PHQ-9)",
    description:
      "PHQ-9 đánh giá mức độ trầm cảm người trưởng thành. Bao gồm 9 câu hỏi, mỗi câu 0-3 điểm. Tổng điểm xác định mức độ trầm cảm từ nhẹ đến nặng.",
  },
  DASS21: {
    count: 21,
    time: "5-10 phút",
    name: "Thang đo Lo âu - Trầm cảm - Stress (DASS-21)",
    description:
      "DASS-21 đánh giá Lo âu, Trầm cảm, Stress. 21 câu, 7 câu cho mỗi yếu tố. Điểm tổng hợp xác định mức độ từng yếu tố.",
  },
  RADS: {
    count: 30,
    time: "10-15 phút",
    name: "Thang đo Trầm cảm Thanh thiếu niên (RADS)",
    description:
      "RADS đánh giá trầm cảm ở thanh thiếu niên 12-18 tuổi. 30 câu, mỗi câu 0-3 điểm. Điểm tổng giúp xác định nguy cơ trầm cảm.",
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
        <p className={styles.description}>{currentTest.description}</p>
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
