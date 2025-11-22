import React, { useState } from "react";
import { Radio, Button, Typography } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Test1 = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);

  return (
    <LayoutContainer>
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
            <span>Câu hỏi 1 trên 9</span>
            <span>11%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} />
          </div>
        </div>

        {/* Câu hỏi */}
        <p className={styles.questionText}>
          Bạn có cảm thấy ít hứng thú hoặc không còn niềm vui khi làm những việc
          thường ngày không?
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
            onClick={() => navigate("/test-info")}
          >
            Quay lại
          </Button>
          <Button
            className={styles.submitButton}
            onClick={() => navigate("/test2")}
            disabled={value === null}
          >
            Câu tiếp theo
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Test1;
