import React from "react";
import styles from "./Dashboard.module.css";

export default function RelaxExercises() {
  return (
    <div className={styles.card}>
      <h4>Bài tập thư giãn</h4>
      <p>Tìm lại bình yên với các bài tập đơn giản.</p>
      <button>Hít thở sâu</button>
      <button>Thiền định 5 phút</button>
      <button>Xem thêm</button>
    </div>
  );
}
