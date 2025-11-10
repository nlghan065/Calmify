import React from "react";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";
import logoImg from "@/assets/images/logo.png";
import { useFullpageAPI } from "@/context/FullpageContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const fullpageAPI = useFullpageAPI();
  const navigate = useNavigate();

  const handleMove = (anchor) => {
    if (fullpageAPI && fullpageAPI.moveTo) {
      fullpageAPI.moveTo(anchor);
    } else {
      console.warn("Fullpage chưa sẵn sàng.");
    }
  };

  return (
    <nav className={styles.navbar}>
      <img src={logoImg} alt="Calmify Logo" className={styles.logo} />

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
