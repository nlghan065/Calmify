// src/Layout/Sidebar.jsx
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
  MenuOutlined,
} from "@ant-design/icons";

// ❌ Đã xóa import getChatSessions vì logic này đã chuyển sang ChatAI.jsx

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // ❌ Đã xóa state sessions, isChatExpanded để tránh xung đột giao diện

  const handleMenuClick = (item) => {
    navigate(item.path);
  };

  const menuItems = [
    { icon: <HomeOutlined />, label: "Trang chủ", path: "/home" },
    { icon: <ProfileOutlined />, label: "Bài test", path: "/category" },
    { icon: <ReadOutlined />, label: "Nhật ký cảm xúc", path: "/emotional" },
    { icon: <CommentOutlined />, label: "Trò chuyện", path: "/chat" }, // Khi bấm vào đây, ChatAI.jsx sẽ lo phần hiển thị lịch sử
    { icon: <BulbOutlined />, label: "Các phương pháp", path: "/methods" },
    {
      icon: <PhoneOutlined />,
      label: "Hotline / địa chỉ uy tín",
      path: "/hotline",
    },
    { icon: <BarChartOutlined />, label: "Thống kê", path: "/statistics" },
    { icon: <UserOutlined />, label: "Tôi", path: "/profile" },
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.topBar}>
        <img
          src={collapsed ? logoMini : logoImg}
          alt="logo"
          className={styles.logo}
          onClick={() => navigate("/home")}
        />
        <MenuOutlined
          className={styles.menuToggle}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => {
            // Kiểm tra active dựa trên path hiện tại
            const isActive = location.pathname.startsWith(item.path);

            return (
              <li
                key={item.path}
                className={isActive ? styles.active : ""} // Bạn nhớ thêm class active trong CSS nếu chưa có
                onClick={() => handleMenuClick(item)}
              >
                {item.icon}
                {!collapsed && (
                  <span className={styles.label}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
