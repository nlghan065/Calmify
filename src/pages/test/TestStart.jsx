import React, { useState, useEffect } from "react";
import { Radio, Button, Typography, Progress, Spin, message } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestionsByTestCode } from "@/api/test/testAPI";

const { Title } = Typography;

const TestStart = () => {
  const { id } = useParams(); // id ở đây chính là mã bài test (VD: PHQ9)
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Gọi API lấy câu hỏi
        const res = await fetchQuestionsByTestCode(id);

        if (res.success && res.data) {
          const { questions: qs } = res.data;
          setQuestions(qs || []);

          // Lấy options từ câu hỏi đầu tiên (vì BE đã gán options vào từng câu)
          if (qs && qs.length > 0 && qs[0].options) {
            const ops = qs[0].options.map((opt) => ({
              label: opt.optionText,
              value: opt.score,
            }));
            setAnswerOptions(ops);
          }
        } else {
          message.error("Không tìm thấy bài test này!");
        }
      } catch (error) {
        console.error(error);
        message.error("Lỗi kết nối server.");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  const handleSelect = (e) => {
    const score = e.target.value;
    const currentQId = questions[currentIndex].id;

    // Lưu điểm số cho câu hỏi này
    setAnswers((prev) => ({ ...prev, [currentQId]: score }));

    // Chuyển câu hoặc kết thúc
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Khi làm xong, chuyển sang trang kết quả
      // Tính sơ bộ tổng điểm để hiện ngay (Backend sẽ tính lại để lưu)
      const currentAnswers = { ...answers, [currentQId]: score };
      const totalScore = Object.values(currentAnswers).reduce(
        (a, b) => a + b,
        0
      );

      navigate(`/result/${id}`, {
        state: { score: totalScore, answers: currentAnswers },
      });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else navigate(`/test-info/${id}`);
  };

  if (loading)
    return (
      <div className={styles.loadingBox}>
        <Spin size="large" />
      </div>
    );

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / questions.length) * 100
  );

  return (
    <LayoutContainer>
      <div className={styles.testContainer}>
        <Title level={3} style={{ textAlign: "center" }}>
          Bài Test: {id}
        </Title>

        <Progress percent={progressPercent} status="active" showInfo={false} />
        <div style={{ textAlign: "right", marginBottom: 40 }}>
          {progressPercent}%
        </div>

        {currentQuestion && (
          <div>
            <p className={styles.subtitle}>
              <strong>Câu {currentIndex + 1}:</strong>{" "}
              {currentQuestion.questionText}
            </p>

            <Radio.Group
              onChange={handleSelect}
              value={answers[currentQuestion.id]}
              className={styles.radioGroup}
            >
              {answerOptions.map((opt, idx) => (
                <Radio
                  key={idx}
                  value={opt.value}
                  style={{ display: "flex", marginBottom: 10 }}
                >
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <Button onClick={handleBack} size="large">
            {currentIndex === 0 ? "Hủy" : "Quay lại"}
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TestStart;
