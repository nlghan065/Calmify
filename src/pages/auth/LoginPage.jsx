import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const AntdLink = Typography.Link;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await authAPI.login(values);
      message.success(res.data.message || "Đăng nhập thành công! 💚");

      // ✅ Lưu token
      if (res.data.token) localStorage.setItem("token", res.data.token);

      console.log("Dữ liệu đăng nhập:", res.data);

      // ✅ Chuyển hướng sau khi đăng nhập thành công
      navigate("/home");
    } catch (err) {
      message.error(err.response?.data?.message || "Sai thông tin đăng nhập!");
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng kiểm tra lại thông tin 🌿");
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Đăng nhập
        </Title>
        <Paragraph className={styles.subtitle}>
          Bình yên bắt đầu từ chính bạn. 🌿
        </Paragraph>

        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Bạn quên nhập email rồi." },
              { type: "email", message: "Định dạng email chưa đúng!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập email của bạn"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Bạn quên nhập mật khẩu rồi." }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item className={styles.actions}>
            <div style={{ textAlign: "right" }}>
              <AntdLink href="/forgot" className={styles.forgot}>
                Quên mật khẩu?
              </AntdLink>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className={styles.loginBtn}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Paragraph className={styles.signupText}>
          Bạn chưa có tài khoản?{" "}
          <AntdLink href="/register" className={styles.signupLink}>
            Tạo mới ngay 💫
          </AntdLink>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
