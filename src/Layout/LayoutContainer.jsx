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
            © 2025 Calmify. Bình yên bắt đầu từ việc thấu hiểu chính mình.
          </p>
        </div>
      </div>
    </div>
  );
}
