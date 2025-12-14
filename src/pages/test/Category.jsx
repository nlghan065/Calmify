import React, { useEffect, useState } from "react";
import { Button, Typography, Spin, Alert } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate } from "react-router-dom";
import { fetchAllTests } from "@/api/test/testAPI";

const { Title } = Typography;

const Category = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTests = async () => {
      try {
        const data = await fetchAllTests();
        if (data.success) setTests(data.data);
      } catch {
        setError("Không thể tải dữ liệu. Hãy chắc chắn Backend đang chạy.");
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, []);

  const handleStart = (testCode) => navigate(`/test-info/${testCode}`);

  return (
    <LayoutContainer>
      <div className={styles.testContainer}>
        <Title level={2} className={styles.pageTitle}>
          Chọn bài test
        </Title>
        {loading ? (
          <div className={styles.loadingBox}>
            <Spin size="large" />
            <div className={styles.loadingText}>Đang tải dữ liệu...</div>
          </div>
        ) : error ? (
          <Alert
            message="Lỗi kết nối"
            description={error}
            type="error"
            showIcon
          />
        ) : (
          <div className={styles.testList}>
            {tests.length > 0 ? (
              tests.map((test) => (
                <div key={test.id} className={styles.testBox}>
                  <Title level={3}>{test.code}</Title>
                  <p>{test.description || "Bài test tâm lý."}</p>
                  <ul className={styles.testMeta}>
                    <li>
                      <strong>Chủ đề:</strong> {test.name}
                    </li>
                    <li>
                      <strong>Thời gian:</strong> 3-5 phút
                    </li>
                  </ul>
                  <Button type="primary" onClick={() => handleStart(test.code)}>
                    Bắt đầu ngay
                  </Button>
                </div>
              ))
            ) : (
              <p>Chưa có bài test nào trong hệ thống.</p>
            )}
          </div>
        )}
      </div>
    </LayoutContainer>
  );
};

export default Category;
