import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Card, Spin, Result as AntResult } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { saveTestResult } from "@/api/test/testAPI";

const { Title, Paragraph } = Typography;

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { score, answers } = location.state || {};
  const [analysis, setAnalysis] = useState(null);
  const [saving, setSaving] = useState(false);
  const hasSaved = useRef(false);

  const analyzeResult = (testCode, totalScore) => {
    let severity = "Chưa xác định",
      message = "Kết quả đã được ghi nhận.",
      color = "#1890ff";
    if (testCode === "PHQ9") {
      if (totalScore <= 4) {
        severity = "Không trầm cảm";
        color = "green";
        message = "Tâm trạng của bạn khá ổn định";
      } else if (totalScore <= 9) {
        severity = "Trầm cảm nhẹ";
        color = "#faad14";
        message = "Bạn có chút lo âu, hãy thư giãn nhé.";
      } else if (totalScore <= 14) {
        severity = "Trầm cảm vừa";
        color = "#fa8c16";
        message = "Nên chia sẻ với bạn bè hoặc chuyên gia tâm lý.";
      } else if (totalScore <= 19) {
        severity = "Trầm cảm trung bình nặng";
        color = "#ff4d4f";
        message = "Cần sự hỗ trợ từ chuyên gia y tế.";
      } else {
        severity = "Trầm cảm nặng";
        color = "#cf1322";
        message = "Hãy tìm kiếm sự giúp đỡ ngay lập tức.";
      }
    } else if (testCode === "RADS") {
      if (totalScore < 30) {
        severity = "Bình thường";
        color = "green";
      } else if (totalScore < 50) {
        severity = "Nguy cơ nhẹ";
        color = "#faad14";
      } else {
        severity = "Nguy cơ cao";
        color = "#ff4d4f";
        message = "Kết quả cho thấy bạn đang gặp nhiều khó khăn tâm lý.";
      }
    } else if (testCode === "DASS21") {
      if (totalScore < 21) {
        severity = "Bình thường";
        color = "green";
      } else if (totalScore < 42) {
        severity = "Căng thẳng vừa";
        color = "#faad14";
      } else {
        severity = "Căng thẳng nghiêm trọng";
        color = "#ff4d4f";
      }
    }
    return { severity, message, color };
  };

  useEffect(() => {
    if (score === undefined) return;
    const result = analyzeResult(id, score);
    setAnalysis(result);

    const saveResult = async () => {
      if (hasSaved.current) return;
      hasSaved.current = true;
      setSaving(true);
      try {
        await saveTestResult({
          testCode: id,
          score,
          severity: result.severity,
          details: JSON.stringify(answers),
        });
      } finally {
        setSaving(false);
      }
    };
    saveResult();
  }, [id, score, answers]);

  if (score === undefined)
    return (
      <LayoutContainer>
        <AntResult
          status="404"
          title="Không tìm thấy kết quả"
          subTitle="Bạn cần làm bài test trước khi xem kết quả."
          extra={
            <Button type="primary" onClick={() => navigate("/category")}>
              Về danh sách
            </Button>
          }
        />
      </LayoutContainer>
    );

  return (
    <LayoutContainer>
      <div className={styles.testContainer}>
        <Title level={2} className={styles.titleCenter}>
          Kết Quả Bài Test {id}
        </Title>
        <Card
          className={styles.resultBox}
          style={{ borderTop: `5px solid ${analysis?.color || "#ccc"}` }}
        >
          {saving && <Spin size="small" className={styles.savingSpin} />}
          <div className={styles.score} style={{ color: analysis?.color }}>
            {score}
          </div>
          <p className={styles.scoreLabel}>Tổng điểm của bạn</p>
          <Title
            level={3}
            className={styles.severity}
            style={{ color: analysis?.color }}
          >
            {analysis?.severity}
          </Title>
          <Paragraph className={styles.message}>{analysis?.message}</Paragraph>
          <div className={styles.disclaimer}>
            "Kết quả này chỉ mang tính chất tham khảo. Luôn tìm kiếm lời khuyên
            từ bác sĩ hoặc chuyên gia tâm lý nếu bạn cảm thấy bất ổn."
          </div>
        </Card>
        <div className={styles.buttonGroup}>
          <Button size="large" onClick={() => navigate("/category")}>
            Làm bài test khác
          </Button>
          <Button type="primary" size="large" onClick={() => navigate("/chat")}>
            Trò chuyện với AI
          </Button>
          <Button size="large" onClick={() => navigate("/statistics")}>
            Lịch sử & Biểu đồ
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ResultPage;
