import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";

const { Title, Paragraph } = Typography;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const resetToken = searchParams.get("token");
  const email = searchParams.get("email");

  const onFinish = async (values) => {
    if (!resetToken) {
      message.error("Thiếu mã xác thực (token). Vui lòng quay lại bước OTP!");
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.resetPassword({
        resetToken,
        password: values.password,
        confirmPassword: values.confirmPassword,
        email,
      });
      message.success(res.data.message || "Đặt lại mật khẩu thành công! 🌿");
      navigate("/login");
    } catch (err) {
      message.error(
        err.response?.data?.message || "Không thể đặt lại mật khẩu!"
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng nhập đầy đủ thông tin 🌱");
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Đặt lại mật khẩu
        </Title>
        <Paragraph className={styles.subtitle}>
          Nhập mật khẩu mới để hoàn tất quá trình khôi phục tài khoản 🌿
        </Paragraph>

        <Form
          name="reset_password_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={styles.form}
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới." },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu mới"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận lại mật khẩu." },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<KeyOutlined />}
              placeholder="Nhập lại mật khẩu"
              size="large"
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
              Xác nhận đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
