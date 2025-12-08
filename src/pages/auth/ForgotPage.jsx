import React from "react";
import { Input, Button, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";

const { Title, Paragraph } = Typography;

// ==== VALIDATION EMAIL ====
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Email chưa đúng định dạng")
    .required("Bạn quên nhập email rồi"),
});

const ForgotPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const res = await authAPI.forgotPassword(values);
      toast.success(res.data.message || "Mã OTP đã được gửi 💌");

      navigate(`/verify-otp?email=${values.email}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể gửi yêu cầu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Quên mật khẩu
        </Title>
        <Paragraph className={styles.subtitle}>
          Đừng lo, chúng tôi sẽ gửi mã OTP đến email của bạn 🌱
        </Paragraph>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* EMAIL */}
          <label className={styles.label}>
            <span className={styles.required}>*</span> Email
          </label>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<MailOutlined />}
                placeholder="Nhập email đã đăng ký"
                size="large"
              />
            )}
          />

          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          {/* BUTTON SEND OTP */}
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            disabled={!isValid || loading}
            className={styles.loginBtn}
            style={{ marginTop: 16 }}
          >
            Gửi mã OTP
          </Button>
        </form>

        <Paragraph className={styles.signupText}>
          Nhớ lại mật khẩu rồi à?{" "}
          <a href="/login" className={styles.signupLink}>
            Đăng nhập ngay 💫
          </a>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default ForgotPage;
