import React, { useState, useEffect } from "react";
import { Input, Button, Typography } from "antd";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const { Title, Paragraph } = Typography;

// ---------------- VALIDATION ----------------
// Regex này khớp với Backend của bạn (Chữ hoa, thường, số, ký tự đặc biệt)
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới.")
    .matches(
      passwordRegex,
      "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, thường, số và ký tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu.")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp!"),
});
// --------------------------------------------

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resetToken = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Kiểm tra URL hợp lệ ngay khi vào trang
  useEffect(() => {
    if (!resetToken || !email) {
      toast.error("Đường dẫn không hợp lệ hoặc thiếu thông tin!");
      navigate("/login");
    }
  }, [resetToken, email, navigate]);

  // ---------------- SUBMIT ---------------- //
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      // Gọi API
      const res = await authAPI.resetPassword({
        email,
        resetToken,
        newPassword: values.password, // <--- QUAN TRỌNG: Phải đổi tên thành newPassword để khớp BE
      });

      toast.success(res.data.message || "Đặt lại mật khẩu thành công! 🌿");

      // Chuyển về trang login
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Không thể đặt lại mật khẩu. Vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
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

        {/* FORM react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <div>
            <label className={styles.label}>
              <span className={styles.required}>*</span> Mật khẩu mới
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Nhập mật khẩu mới"
                  size="large"
                />
              )}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{ marginTop: 12 }}>
            <label className={styles.label}>
              <span className={styles.required}>*</span> Xác nhận mật khẩu
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<KeyOutlined />}
                  placeholder="Nhập lại mật khẩu mới"
                  size="large"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className={styles.loginBtn}
            style={{ marginTop: 16 }}
          >
            Xác nhận đổi mật khẩu
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
