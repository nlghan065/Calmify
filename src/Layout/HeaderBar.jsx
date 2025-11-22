import React from "react";
import styles from "./Layout.module.css";
import { BellOutlined, UserOutlined } from "@ant-design/icons";

export default function HeaderBar() {
  return (
    <header className={styles.header}>
      <div>
        <h2>Chào mừng trở lại!</h2>
        <p>Sẵn sàng cho một ngày mới thật bình yên chưa?</p>
      </div>
      <div className={styles.profile}>
        <BellOutlined className={styles.icon} />
        <UserOutlined className={styles.avatar} />
      </div>
    </header>
  );
}
