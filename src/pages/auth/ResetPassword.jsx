import React, { useState } from "react";
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
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu.")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp!"),
});
// --------------------------------------------

const ResetPasswordPage = () => {
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

  // ---------------- SUBMIT ---------------- //
  const onSubmit = async (values) => {
    if (!resetToken) {
      toast.error("Thiếu token xác thực! Vui lòng làm lại từ bước OTP.");
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

      toast.success(res.data.message || "Đặt lại mật khẩu thành công! 🌿");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể đặt lại mật khẩu!");
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
              <span className={styles.required}>*</span> Mật khẩu
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
                  placeholder="Xác nhận mật khẩu"
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

export default ResetPasswordPage;
