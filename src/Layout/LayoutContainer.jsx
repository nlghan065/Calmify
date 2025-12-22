import React from "react";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import styles from "./Layout.module.css";

export default function LayoutContainer({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainArea}>
        <HeaderBar />
        <div className={styles.content}>
          {children}
          <p className={styles.footer}>
            © 2025 Calmify. Calmify chỉ hỗ trợ bạn thấu hiểu cảm xúc, không thay
            thế chẩn đoán hay điều trị y khoa. Nếu bạn cảm thấy không an toàn,
            hãy tìm đến chuyên gia tâm lý hoặc cơ sở y tế.
          </p>
        </div>
      </div>
    </div>
  );
}
