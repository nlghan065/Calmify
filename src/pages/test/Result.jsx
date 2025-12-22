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
  const { id } = useParams(); // Mã bài test (PHQ9)
  const { score, answers } = location.state || {};

  const [saving, setSaving] = useState(false);
  const hasSaved = useRef(false);

  // Logic hiển thị màu sắc (Client only visualization)
  const getSeverityInfo = (s) => {
    if (s <= 4)
      return { text: "Bình thường", color: "green", msg: "Tâm trạng ổn định." };
    if (s <= 9)
      return { text: "Nhẹ", color: "#faad14", msg: "Cần theo dõi thêm." };
    if (s <= 14)
      return { text: "Vừa", color: "#fa8c16", msg: "Nên tư vấn chuyên gia." };
    return { text: "Nặng", color: "#ff4d4f", msg: "Cần hỗ trợ y tế ngay." };
  };

  const info = getSeverityInfo(score || 0);

  useEffect(() => {
    if (score === undefined || hasSaved.current) return;

    const saveToBackend = async () => {
      hasSaved.current = true;
      setSaving(true);
      try {
        // CHUYỂN ĐỔI DỮ LIỆU ĐỂ KHỚP VỚI BACKEND SERVICE
        // Backend cần mảng: [{ score: 1 }, { score: 2 }]
        const formattedAnswers = Object.values(answers).map((val) => ({
          score: parseInt(val),
        }));

        await saveTestResult({
          testCode: id,
          answers: formattedAnswers,
        });
      } catch (error) {
        console.error("Lỗi lưu kết quả:", error);
      } finally {
        setSaving(false);
      }
    };

    saveToBackend();
  }, [id, score, answers]);

  if (score === undefined) {
    return (
      <LayoutContainer>
        <AntResult
          status="404"
          title="Không có kết quả"
          extra={
            <Button onClick={() => navigate("/test")}>Về danh sách</Button>
          }
        />
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <div className={styles.testContainer}>
        <Title level={2} style={{ textAlign: "center" }}>
          Kết Quả: {id}
        </Title>

        <Card
          className={styles.resultBox}
          style={{ borderTop: `5px solid ${info.color}` }}
        >
          {saving && (
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <Spin /> Đang lưu...
            </div>
          )}

          <div className={styles.score} style={{ color: info.color }}>
            {score}
          </div>
          <p className={styles.scoreLabel}>Tổng điểm</p>

          <Title level={3} style={{ color: info.color, textAlign: "center" }}>
            {info.text}
          </Title>
          <Paragraph style={{ textAlign: "center" }}>{info.msg}</Paragraph>

          <div className={styles.disclaimer}>
            Kết quả này chỉ mang tính tham khảo.
          </div>
        </Card>

        <div className={styles.buttonGroup}>
          <Button
            size="large"
            type="primary"
            onClick={() => navigate("/category")}
          >
            Làm bài khác
          </Button>
          <Button size="large" type="primary" onClick={() => navigate("/chat")}>
            Chat với AI
          </Button>
          <Button size="large" onClick={() => navigate("/statistics")}>
            Xem thống kê
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ResultPage;
