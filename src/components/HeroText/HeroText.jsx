import React from "react";
import styles from "./HeroText.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
export default function HeroText() {
  const navigate = useNavigate();
  return (
    <div className={styles.textContent}>
      <h1>
        Calmify lắng nghe bạn – vì chúng tôi tin rằng bên trong bạn vẫn luôn có
        sức mạnh để bắt đầu lại.
      </h1>
      <p>
        “Giúp bạn nhận biết sớm dấu hiệu trầm cảm, an toàn, ẩn danh và đồng hành
        từng ngày”
      </p>
      <Button
        label="Trải nghiệm Calmify"
        onClick={() => navigate("/test-info")}
      />
    </div>
  );
}
