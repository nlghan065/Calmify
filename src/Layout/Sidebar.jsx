import React from "react";
import styles from "./Layout.module.css";
import logoImg from "@/assets/images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation(); // lấy URL hiện tại

  // hàm kiểm tra active
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={styles.sidebar}>
      <img
        src={logoImg}
        alt="Calmify Logo"
        className={styles.logo}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />

      <nav className={styles.nav}>
        <ul>
          <li
            className={isActive("/home") ? styles.active : ""}
            onClick={() => navigate("/home")}
          >
            <HomeOutlined /> Trang chủ
          </li>

          <li
            className={isActive("/category") ? styles.active : ""}
            onClick={() => navigate("/category")}
          >
            <ExperimentOutlined /> Bài test
          </li>

          <li
            className={isActive("/journal") ? styles.active : ""}
            onClick={() => navigate("/journal")}
          >
            <BookOutlined /> Nhật ký cảm xúc
          </li>

          <li
            className={isActive("/chat") ? styles.active : ""}
            onClick={() => navigate("/chat")}
          >
            <MessageOutlined /> Trò chuyện
          </li>

          <li
            className={isActive("/methods") ? styles.active : ""}
            onClick={() => navigate("/methods")}
          >
            <BulbOutlined /> Các phương pháp
          </li>

          <li
            className={isActive("/hotline") ? styles.active : ""}
            onClick={() => navigate("/hotline")}
          >
            <SmileOutlined /> Hotline / địa chỉ uy tín
          </li>

          <li
            className={isActive("/stats") ? styles.active : ""}
            onClick={() => navigate("/stats")}
          >
            <BarChartOutlined /> Thống kê
          </li>

          <li
            className={isActive("/profile") ? styles.active : ""}
            onClick={() => navigate("/profile")}
          >
            <UserOutlined /> Tôi
          </li>
        </ul>
      </nav>
    </aside>
  );
}
