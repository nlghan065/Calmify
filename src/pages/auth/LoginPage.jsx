import React from "react";
import { Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "../../style/Auth.module.css"; // Hãy đảm bảo đường dẫn CSS đúng
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Import API nộp bài test (Lưu ý đường dẫn file này trong dự án của bạn)
import { submitPHQ9Answers } from "@/api/test/phq9Api";

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

  // --- HÀM XỬ LÝ SUBMIT LOGIN ---
  const onSubmit = async (values) => {
    try {
      setLoading(true);

      // 1. Dọn dẹp token/user cũ trước khi login mới
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 2. Gọi API Login
      const res = await authAPI.login(values);
      const token = res.data?.token;
      const user = res.data?.user;

      if (!token) throw new Error("Không lấy được token xác thực");

      // 3. Lưu thông tin đăng nhập mới vào LocalStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(res.data.message || "Đăng nhập thành công! 🌿");

      // 4. XỬ LÝ BÀI TEST TẠM
      const pendingTest = localStorage.getItem("pendingTestSubmission");

      if (pendingTest) {
        try {
          const parsedTestPayload = JSON.parse(pendingTest);

          const submitRes = await submitPHQ9Answers(parsedTestPayload, token);

          if (submitRes && submitRes.success) {
            toast.info("Kết quả bài test vừa làm đã được lưu lại!");
            localStorage.removeItem("pendingTestSubmission");
          }
        } catch (submitError) {
          console.error("Lỗi lưu bài test khách:", submitError);
          toast.warning(
            "Đăng nhập thành công nhưng chưa lưu được kết quả test cũ."
          );
        }
      }

      // 5. Chuyển thẳng về trang Home
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Sai thông tin đăng nhập!"
      );
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
          {/* Email Input */}
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

          {/* Password Input */}
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
