import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";

const { Title, Paragraph } = Typography;
const AntdLink = Typography.Link;

const ForgotPage = () => {
  const onFinish = async (values) => {
    try {
      const res = await authAPI.forgotPassword(values);
      message.success(res.data.message || "Hãy kiểm tra email của bạn 💌");
      console.log("Yêu cầu đặt lại mật khẩu:", res.data);
    } catch (err) {
      message.error(err.response?.data?.message || "Không thể gửi yêu cầu!");
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng nhập đúng email để tiếp tục 🌿");
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Quên mật khẩu
        </Title>
        <Paragraph className={styles.subtitle}>
          Đừng lo lắng, chúng tôi sẽ giúp bạn lấy lại mật khẩu 🌱
        </Paragraph>

        <Form
          name="forgot_password_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.form}
        >
          <Form.Item
            label="Email đăng ký"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn." },
              { type: "email", message: "Định dạng email chưa đúng!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email đã đăng ký"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className={styles.loginBtn}
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>

        <Paragraph className={styles.signupText}>
          Nhớ lại mật khẩu rồi à?{" "}
          <AntdLink href="/login" className={styles.signupLink}>
            Đăng nhập ngay 💫
          </AntdLink>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default ForgotPage;
