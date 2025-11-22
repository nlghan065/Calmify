import React from "react";
import Button from "@/components/Button/Button";
import styles from "./Style.module.css";
import { useNavigate } from "react-router-dom";

export default function FinalSection() {
  const navigate = useNavigate();
  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Bạn đã làm rất tốt rồi
          <br />
          Hãy để hôm nay là khởi đầu cho hành trình bình yên của bạn
        </h2>

        <p className={styles.description}>
          “Chúng tôi biết bạn đã cố gắng rất nhiều. Calmify không đến để thay
          đổi bạn — mà để cùng bạn đi tiếp, từng bước nhỏ, mỗi ngày.”
        </p>

        <Button
          label="Trải nghiệm Calmify"
          variant="primary"
          onClick={() => navigate("/test-info-phq9")}
        />

        <p className={styles.quote}>
          “Bình yên không phải là không có sóng gió
          <br />
          mà là khi bạn học được cách lắng nghe chính mình.”
        </p>
      </div>
    </section>
  );
}
