import React from "react";
import { Button, Typography } from "antd";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "@/style/Test.module.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Category = () => {
  const navigate = useNavigate();

  return (
    <LayoutContainer>
      <div className={styles.testContainer}>
        <Title level={2} className={styles.pageTitle}>
          Chọn bài test
        </Title>

        <div className={styles.testList}>
          {/* PHQ-9 */}
          <div className={styles.testBox}>
            <Title level={3}>PHQ-9</Title>
            <p>
              PHQ-9 là bài test sàng lọc trầm cảm gồm 9 câu hỏi, đánh giá mức độ
              buồn bã, mất hứng thú, mệt mỏi và những thay đổi trong 2 tuần gần
              nhất.
            </p>
            <ul>
              <li>Thời gian: 3–5 phút</li>
              <li>Đối tượng: Tất cả mọi người</li>
              <li>Mục đích: Sàng lọc trầm cảm</li>
            </ul>
            <Button type="primary" onClick={() => navigate("/test-info")}>
              Bắt đầu
            </Button>
          </div>

          {/* DASS-21 */}
          <div className={styles.testBox}>
            <Title level={3}>DASS-21</Title>
            <p>
              DASS-21 đo lường mức độ Stress, Lo âu và Trầm cảm thông qua 21 câu
              hỏi, giúp đánh giá toàn diện tình trạng tinh thần hiện tại.
            </p>
            <ul>
              <li>Thời gian: 5–7 phút</li>
              <li>Đối tượng: 16 tuổi trở lên</li>
              <li>Mục đích: Đánh giá Stress – Lo âu – Trầm cảm</li>
            </ul>
            <Button type="primary" onClick={() => navigate("/test/dass21")}>
              Bắt đầu
            </Button>
          </div>

          {/* RADS */}
          <div className={styles.testBox}>
            <Title level={3}>RADS</Title>
            <p>
              RADS là thang đo trầm cảm dành cho trẻ vị thành niên, tập trung
              vào cảm xúc, giấc ngủ, sự tách biệt xã hội và mức độ tự phản ánh.
            </p>
            <ul>
              <li>Thời gian: 5 phút</li>
              <li>Đối tượng: 12–20 tuổi</li>
              <li>Mục đích: Sàng lọc trầm cảm ở thanh thiếu niên</li>
            </ul>
            <Button type="primary" onClick={() => navigate("/test/rads")}>
              Bắt đầu
            </Button>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Category;
