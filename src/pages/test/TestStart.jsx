import React, { useEffect, useState } from "react";
import { Radio, Button, Typography, Progress, Spin, message } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestionsByTestCode } from "@/api/test/testAPI";

const { Title } = Typography;

const TestStart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchQuestionsByTestCode(id);
        if (data.success && data.data.questions.length > 0)
          setQuestions(data.data.questions);
        else message.error("Bộ câu hỏi này chưa có dữ liệu trong DB!");
      } catch {
        message.error("Không thể kết nối đến Server.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuestions();
  }, [id]);

  const handleSelect = (e) => {
    const value = e.target.value;
    const questionId = questions[currentIndex].id;

    // Lưu đáp án
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Chuyển câu tiếp theo
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Nếu là câu cuối cùng, chuyển sang trang kết quả
      navigate(`/result/${id}`, {
        state: {
          score: Object.values({ ...answers, [questionId]: value }).reduce(
            (a, b) => a + b,
            0
          ),
          answers: { ...answers, [questionId]: value },
        },
      });
    }
  };

  const handleBack = () =>
    currentIndex > 0
      ? setCurrentIndex(currentIndex - 1)
      : navigate(`/test-info/${id}`);

  if (loading)
    return (
      <div className={styles.loadingBox}>
        <Spin size="large" />
      </div>
    );

  if (questions.length === 0)
    return (
      <LayoutContainer>
        <div className={styles.loadingBox}>
          <h3>Chưa có câu hỏi trong Database</h3>
          <Button onClick={() => navigate("/category")}>Quay lại</Button>
        </div>
      </LayoutContainer>
    );

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / questions.length) * 100
  );

  return (
    <LayoutContainer>
      <div className={styles.testContainer}>
        <Title level={3} className={styles.titleCenter}>
          Bài Test {id}
        </Title>
        <Progress percent={progressPercent} status="active" showInfo={false} />
        <div className={styles.progressText}>{progressPercent}%</div>

        <div className={styles.questionBox}>
          <p className={styles.subtitle}>
            <strong>
              Câu {currentIndex + 1}/{questions.length}:
            </strong>{" "}
            {currentQuestion?.content}
          </p>
          <Radio.Group
            onChange={handleSelect}
            value={answers[currentQuestion?.id]}
            className={styles.radioGroup}
          >
            <Radio value={0}>Không bao giờ (0 điểm)</Radio>
            <Radio value={1}>Thỉnh thoảng (1 điểm)</Radio>
            <Radio value={2}>Thường xuyên (2 điểm)</Radio>
            <Radio value={3}>Luôn luôn (3 điểm)</Radio>
          </Radio.Group>
        </div>

        <div className={styles.buttonGroup}>
          <Button
            className={styles.backButton}
            onClick={handleBack}
            size="large"
          >
            {currentIndex === 0 ? "Hủy bỏ" : "Quay lại"}
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TestStart;
