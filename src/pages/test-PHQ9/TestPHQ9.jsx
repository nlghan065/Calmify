import React, { useState, useEffect } from "react";
import { Radio, Button, Typography, Spin, message, Modal } from "antd";
import PageLayout from "@/components/Page/PageLayout";
import styles from "@/style/Page.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const { Title } = Typography;

const TestPHQ9 = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [scales, setScales] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // 1. LẤY DỮ LIỆU TỪ API
  useEffect(() => {
    const loadTest = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tests/PHQ9`);

        if (res.data.success) {
          const testData = res.data.data;
          const questionList = testData.questions || [];
          setQuestions(questionList);

          if (questionList.length > 0 && questionList[0].options) {
            const formattedScales = questionList[0].options.map((opt) => ({
              label: opt.optionText,
              value: opt.score,
              id: opt.id,
            }));
            setScales(formattedScales);
          }
        }
      } catch (error) {
        console.error("Lỗi tải bài test:", error);
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
    const value = e.target.value;

    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
      } else {
        handleFinishCheck();
      }
    }, 300);
  };

  const handleFinishCheck = () => {
    Modal.confirm({
      title: "Hoàn thành bài test?",
      content: "Bạn có chắc chắn muốn nộp bài không?",
      okText: "Nộp bài",
      cancelText: "Xem lại",
      onOk: submitTestProcess,
    });
  };

  // --- LOGIC NỘP BÀI ---
  const submitTestProcess = async () => {
    setLoading(true);
    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q.id,
        score: answers[q.id] !== undefined ? answers[q.id] : 0,
      }));

      const payload = {
        testCode: "PHQ9",
        answers: formattedAnswers,
        timestamp: Date.now(),
      };

      const token = localStorage.getItem("token");

      if (!token) {
        // --- CHƯA LOGIN ---
        localStorage.setItem("pendingTestSubmission", JSON.stringify(payload));

        // Tính tổng điểm tạm
        const totalScore = formattedAnswers.reduce(
          (sum, a) => sum + a.score,
          0
        );

        // Tạo dữ liệu tạm để hiển thị ResultPHQ9
        const tempResult = {
          totalScore,
          severity:
            totalScore <= 4
              ? "Nhẹ"
              : totalScore <= 9
              ? "Vừa"
              : totalScore <= 14
              ? "Trầm cảm trung bình"
              : totalScore <= 19
              ? "Trầm cảm nặng"
              : "Rất nặng",
          advice:
            "Bạn chưa đăng nhập, kết quả chỉ lưu tạm thời. Đăng nhập để lưu vào hồ sơ sức khỏe và nhận tư vấn chi tiết.",
        };

        // Điều hướng sang trang ResultPHQ9
        navigate("/result-phq9", { state: { result: tempResult } });
      } else {
        // --- ĐÃ LOGIN ---
        const res = await axios.post(`${BASE_URL}/tests/submit`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          // Truyền kết quả thực từ API sang ResultPHQ9
          navigate("/result-phq9", { state: { result: res.data.data } });
        }
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi nộp bài.");
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

  if (questions.length === 0)
    return (
      <PageLayout>
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <h3>Không tìm thấy dữ liệu bài test.</h3>
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
              Câu hỏi {currentQIndex + 1} / {questions.length}
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

        <p className={styles.questionText}>
          {currentQuestion?.questionText || currentQuestion?.content}
        </p>

        <Radio.Group
          onChange={handleRadioChange}
          value={answers[currentQuestion?.id]}
          className={styles.radioGroup}
        >
          {scales.map((scale) => (
            <Radio
              key={scale.id || scale.value}
              value={scale.value}
              className={styles.radioItem}
            >
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
        </div>
      </div>
    </PageLayout>
  );
};

export default TestPHQ9;
