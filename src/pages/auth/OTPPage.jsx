import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { NumberOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";

const { Title, Paragraph } = Typography;

const OTPPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Lấy email từ URL (?email=abc@gmail.com)
  useEffect(() => {
    const emailFromURL = searchParams.get("email");
    if (emailFromURL) {
      setEmail(emailFromURL);
    } else {
      message.warning("Vui lòng nhập email trước khi xác thực OTP!");
      navigate("/forgot");
    }
  }, [searchParams, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await authAPI.verifyOtp({ email, otp: values.otp });
      message.success(res.data.message || "Xác thực thành công! 🌿");

      const resetToken = res.data.resetToken;
      navigate(`/reset-password?token=${resetToken}&email=${email}`);
    } catch (err) {
      message.error(
        err.response?.data?.message || "Mã OTP không hợp lệ hoặc đã hết hạn!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Xác thực OTP
        </Title>
        <Paragraph className={styles.subtitle}>
          Mã OTP đã được gửi tới <b>{email}</b>. Hãy nhập mã bên dưới để tiếp
          tục 💌
        </Paragraph>

        <Form
          name="otp_form"
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
          autoComplete="off"
        >
          {/* Ẩn hoặc hiển thị email ở dạng disabled */}
          <Form.Item label="Email đăng ký">
            <Input
              prefix={<MailOutlined />}
              value={email}
              disabled
              size="large"
            />
          </Form.Item>

          {/* Mã OTP */}
          <Form.Item
            label="Mã OTP"
            name="otp"
            rules={[{ required: true, message: "Vui lòng nhập mã OTP." }]}
          >
            <Input
              prefix={<NumberOutlined />}
              placeholder="Nhập mã OTP gồm 6 chữ số"
              size="large"
              maxLength={6}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className={styles.loginBtn}
            >
              Xác nhận OTP
            </Button>
          </Form.Item>
        </Form>

        <Paragraph className={styles.signupText}>
          Không nhận được mã?{" "}
          <a href="/forgot" className={styles.signupLink}>
            Gửi lại mã OTP
          </a>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default OTPPage;
