import React from "react";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import logoImg from "@/assets/images/logo.png";
import { useFullpageAPI } from "@/context/FullpageContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const fullpageAPI = useFullpageAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMove = (anchor) => {
    if (location.pathname !== "/") {
      // 👉 Nếu không ở trang fullpage thì chuyển về "/"
      navigate("/");

      // ⏳ Sau đó chờ fullpage khởi tạo xong rồi scroll
      let tries = 0;
      const waitForFullpage = setInterval(() => {
        if (window.fullpage_api) {
          window.fullpage_api.moveTo(anchor);
          clearInterval(waitForFullpage);
        } else if (tries++ > 20) {
          // timeout sau 2s để tránh lặp vô hạn
          clearInterval(waitForFullpage);
          console.warn("⚠️ Fullpage chưa sẵn sàng để scroll.");
        }
      }, 100);
    } else if (fullpageAPI && fullpageAPI.moveTo) {
      // 👉 Nếu đang ở trang fullpage => scroll ngay
      fullpageAPI.moveTo(anchor);
    } else {
      console.warn("⚠️ Fullpage chưa sẵn sàng hoặc không có API.");
    }
  };

  return (
    <nav className={styles.navbar}>
      <img
        src={logoImg}
        alt="Calmify Logo"
        className={styles.logo}
        // ✅ Bấm logo sẽ quay về phần đầu fullpage
        onClick={() => handleMove("intro")}
        style={{ cursor: "pointer" }}
      />

      <ul className={styles.navLinks}>
        <li onClick={() => handleMove("intro")}>Giới thiệu</li>
        <li onClick={() => handleMove("features")}>Tính năng</li>
        <li onClick={() => handleMove("calmifysteps")}>Hành trình</li>
        <li onClick={() => handleMove("testimonials")}>Cảm nhận</li>
        <li onClick={() => handleMove("final")}>Khởi đầu</li>
      </ul>

      <div className={styles.navButtons}>
        <Button
          label="Đăng nhập"
          variant="primary"
          onClick={() => navigate("/login")}
        />
        <Button
          label="Đăng ký"
          variant="light"
          onClick={() => navigate("/register")}
        />
      </div>
    </nav>
  );
}
