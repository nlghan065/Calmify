import React from "react";
import { Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { mergeGuestAssessment } from "@/api/services/assessmentAPI";

const { Title, Paragraph } = Typography;
const AntdLink = Typography.Link;

// =================== VALIDATION ===================
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Email chưa đúng định dạng")
    .required("Bạn quên nhập email rồi"),
  password: yup.string().required("Bạn quên nhập mật khẩu rồi."),
});

// =================== LOGIN PAGE ===================
const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      // 1️⃣ Login
      const res = await authAPI.login(values);
      toast.success(res.data.message || "Đăng nhập thành công! 🌿");

      const { token, user } = res.data.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      // 2️⃣ Merge guest assessment nếu có
      try {
        const merged = await mergeGuestAssessment(token, user.id);
        if (merged) {
          toast.success("Kết quả bài test vừa làm đã được lưu vào hồ sơ! 📝");
        }
      } catch (err) {
        console.error("❌ Lỗi merge guest assessment:", err);
      }

      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Sai thông tin đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Đăng nhập
        </Title>
        <Paragraph className={styles.subtitle}>
          Bình yên bắt đầu từ chính bạn 🌿
        </Paragraph>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className={styles.label}>
            <span className={styles.required}>*</span> Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined />}
                placeholder="Nhập email của bạn"
                size="large"
              />
            )}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          {/* Password */}
          <div style={{ marginTop: 12 }}>
            <label className={styles.label}>
              <span className={styles.required}>*</span> Mật khẩu
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Nhập mật khẩu"
                  size="large"
                />
              )}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}

            <div style={{ textAlign: "right", marginTop: 8 }}>
              <AntdLink onClick={() => navigate("/forgot")}>
                Quên mật khẩu?
              </AntdLink>
            </div>
          </div>

          {/* Login Button */}
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
            Đăng nhập
          </Button>
        </form>

        <Paragraph className={styles.signupText}>
          Bạn chưa có tài khoản?{" "}
          <AntdLink
            onClick={() => navigate("/register")}
            className={styles.signupLink}
          >
            Tạo mới ngay 💫
          </AntdLink>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
