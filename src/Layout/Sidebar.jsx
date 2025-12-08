import React, { useState } from "react";
import styles from "./Layout.module.css";
import logoImg from "@/assets/images/logo.png";
import logoMini from "@/assets/images/logomini.png";
import { useNavigate, useLocation } from "react-router-dom";

import {
  HomeOutlined,
  ProfileOutlined,
  ReadOutlined,
  CommentOutlined,
  BulbOutlined,
  PhoneOutlined,
  BarChartOutlined,
  UserOutlined,
  MenuOutlined, // <-- đảm bảo có import này để tránh ReferenceError
} from "@ant-design/icons";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: <HomeOutlined />, label: "Trang chủ", path: "/home" },
    { icon: <ProfileOutlined />, label: "Bài test", path: "/category" },
    { icon: <ReadOutlined />, label: "Nhật ký cảm xúc", path: "/emotional" },
    { icon: <CommentOutlined />, label: "Trò chuyện", path: "/chat" },
    { icon: <BulbOutlined />, label: "Các phương pháp", path: "/methods" },
    {
      icon: <PhoneOutlined />,
      label: "Hotline / địa chỉ uy tín",
      path: "/hotline",
    },

    // giữ nguyên icon thống kê như yêu cầu
    { icon: <BarChartOutlined />, label: "Thống kê", path: "/statistics" },

    { icon: <UserOutlined />, label: "Tôi", path: "/profile" },
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      {/* ==== Logo + Toggle ==== */}
      <div className={styles.topBar}>
        <img
          src={collapsed ? logoMini : logoImg}
          alt="logo"
          className={styles.logo}
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
            } else {
              navigate("/home");
            }
          }}
          style={{ cursor: "pointer" }}
        />

        {/* Toggle button */}
        <MenuOutlined
          className={styles.menuToggle}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* ==== Menu ==== */}
      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={isActive(item.path) ? styles.active : ""}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {!collapsed && <span className={styles.label}>{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
