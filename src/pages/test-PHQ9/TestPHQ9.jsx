import React, { useState, useEffect } from "react";
import { Radio, Button, Typography, Spin, message } from "antd";
import PageLayout from "@/components/Page/PageLayout";
import styles from "@/style/Page.module.css";
import { useNavigate } from "react-router-dom";
import { fetchPHQ9, submitPHQ9 } from "@/api/services/testAPI";

const { Title } = Typography;

const TestPHQ9 = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [scales, setScales] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTest = async () => {
      try {
        const data = await fetchPHQ9();
        setQuestions(data.questions || []);
        setScales(data.scales || []);
      } catch (error) {
        message.error("Không thể tải bài test. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    loadTest();
  }, []);

  const handleRadioChange = (e) => {
    const questionId = questions[currentQIndex]?.id;
    if (!questionId) return;
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleNext = async () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      await finishTest();
    }
  };

  const finishTest = async () => {
    try {
      setLoading(true);
      const answerValues = questions.map((q) => answers[q.id] || 0);
      const result = await submitPHQ9(answerValues);

      localStorage.setItem(
        "guest_assessment_pending",
        JSON.stringify({
          testCode: "PHQ9",
          answers,
          timestamp: new Date().toISOString(),
        })
      );

      navigate("/result-phq9", { state: { result } });
    } catch (error) {
      console.error(error);
      message.error("Có lỗi khi tính kết quả.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <PageLayout>
        <div style={{ textAlign: "center", padding: 50 }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    );

  const currentQuestion = questions[currentQIndex];
  const progressPercent = Math.round(
    ((currentQIndex + 1) / questions.length) * 100
  );

  return (
    <PageLayout>
      <div className={styles.testContainer}>
        <Title level={2} className={styles.title}>
          Bài Test Trầm Cảm (PHQ-9)
        </Title>
        <p className={styles.subtitle}>
          Trong 2 tuần vừa qua, bạn cảm thấy thế nào?
        </p>

        <div className={styles.progressWrapper}>
          <div className={styles.progressHeader}>
            <span>
              Câu hỏi {currentQIndex + 1} trên {questions.length}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className={styles.questionText}>{currentQuestion?.content}</p>

        <Radio.Group
          onChange={handleRadioChange}
          value={answers[currentQuestion?.id]}
          className={styles.radioGroup}
        >
          {scales.map((scale) => (
            <Radio key={scale.value} value={scale.value}>
              {scale.label}
            </Radio>
          ))}
        </Radio.Group>

        <div className={styles.buttonGroup}>
          <Button
            className={styles.backButton}
            disabled={currentQIndex === 0}
            onClick={() => setCurrentQIndex(currentQIndex - 1)}
          >
            Quay lại
          </Button>
          <Button
            className={styles.submitButton}
            onClick={handleNext}
            disabled={answers[currentQuestion?.id] === undefined}
          >
            {currentQIndex === questions.length - 1
              ? "Xem kết quả"
              : "Câu tiếp theo"}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default TestPHQ9;
