import React from "react";
import styles from "./Layout.module.css";
import logoImg from "@/assets/images/logo.png";

import {
  HomeOutlined,
  BookOutlined,
  MessageOutlined,
  SmileOutlined,
  ExperimentOutlined,
  BulbOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        src={logoImg}
        alt="Calmify Logo"
        className={styles.logo}
        style={{ cursor: "pointer" }}
      />

      <nav className={styles.nav}>
        <ul>
          <li className={styles.active}>
            <HomeOutlined /> Trang chủ
          </li>
          <li>
            <ExperimentOutlined /> Bài test
          </li>
          <li>
            <BookOutlined /> Nhật ký cảm xúc
          </li>
          <li>
            <MessageOutlined /> Trò chuyện
          </li>
          <li>
            <BulbOutlined /> Các phương pháp
          </li>
          <li>
            <SmileOutlined /> Hotline / địa chỉ uy tín
          </li>
          <li>
            <BarChartOutlined /> Thống kê
          </li>
          <li>
            <UserOutlined /> Tôi
          </li>
        </ul>
      </nav>
    </aside>
  );
}
