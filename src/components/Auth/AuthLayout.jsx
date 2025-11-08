import React from "react";
import { Row, Col } from "antd";
import Style from "@/style/Auth.module.css";
import loginImg from "@/assets/images/plant.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Row className={Style.container} gutter={0}>
      {/* Cột trái */}
      <Col xs={24} md={13} className={Style.left}>
        <div className={Style.formWrapper}>
          {/* Đặt nút Back bên trong khung trắng */}
          <div className={Style.backBtn} onClick={() => navigate("/")}>
            <IoMdArrowRoundBack size={20} />
            <span>Trang chủ</span>
          </div>

          {/* Phần nội dung form (Login / Register / v.v) */}
          {children}
        </div>
      </Col>

      {/* Cột phải */}
      <Col xs={0} md={11} className={Style.right}>
        <img src={loginImg} alt="Calmify login" className={Style.login} />
      </Col>
    </Row>
  );
};

export default AuthLayout;
