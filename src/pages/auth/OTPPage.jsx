import React, { useEffect, useState } from "react";
import { Input, Button, Typography } from "antd";
import { NumberOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const { Title, Paragraph } = Typography;
const AntdLink = Typography.Link; // Dùng Link của Antd cho đẹp

const schema = yup.object().shape({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP.")
    .length(6, "OTP phải gồm 6 số")
    .matches(/^[0-9]+$/, "OTP chỉ được chứa số"), // Thêm check chỉ số
});

const OTPPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false); // State cho nút gửi lại

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const emailFromURL = searchParams.get("email");
    if (!emailFromURL) {
      toast.warning("Vui lòng nhập email trước khi xác thực OTP!");
      navigate("/forgot");
    } else {
      setEmail(emailFromURL);
    }
  }, [navigate, searchParams]);

  // --- Xử lý Xác thực OTP ---
  const onSubmit = async ({ otp }) => {
    setLoading(true);
    try {
      console.log("Gửi OTP:", { email, otp }); // Debug log

      // Sửa 'verifyOtp' thành 'verifyOTP'
      const res = await authAPI.verifyOTP({ email, otp });
      // Lấy resetToken từ phản hồi backend
      // Backend: res.json({ success: true, message: "...", resetToken: "..." })
      const resetToken = res.data.resetToken;

      if (!resetToken) {
        throw new Error("Không nhận được token đặt lại mật khẩu!");
      }

      toast.success(res.data.message || "Xác thực thành công! 🌿");

      // Chuyển sang trang đặt lại mật khẩu kèm theo token
      navigate(`/reset-password?token=${resetToken}&email=${email}`);
    } catch (err) {
      console.error("Lỗi verify OTP:", err);
      toast.error(
        err.response?.data?.message || "OTP không hợp lệ hoặc đã hết hạn!"
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Xử lý Gửi lại OTP (Không cần quay lại trang trước) ---
  const handleResendOTP = async () => {
    if (resending) return;
    try {
      setResending(true);
      await authAPI.forgotPassword({ email }); // Gọi lại API quên mật khẩu
      toast.info(`Đã gửi lại mã OTP tới ${email} 📩`);
    } catch (err) {
      toast.error("Không thể gửi lại OTP. Vui lòng thử lại sau.");
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Xác thực OTP
        </Title>

        <Paragraph className={styles.subtitle}>
          Mã OTP đã được gửi tới <b>{email}</b>. Nhập mã để tiếp tục 💌
        </Paragraph>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email (Readonly) */}
          <Input
            prefix={<MailOutlined />}
            value={email}
            disabled
            size="large"
            style={{
              marginBottom: 12,
              backgroundColor: "#f5f5f5",
              cursor: "not-allowed",
            }}
          />

          {/* OTP Input */}
          <div style={{ marginBottom: 16 }}>
            <label className={styles.label}>
              <span className={styles.required}>*</span> Mã OTP
            </label>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<NumberOutlined />}
                  placeholder="Nhập mã OTP gồm 6 số"
                  size="large"
                  maxLength={6}
                  style={{ letterSpacing: "4px", fontWeight: "bold" }} // Format cho dễ nhìn
                />
              )}
            />
            {errors.otp && <p className={styles.error}>{errors.otp.message}</p>}
          </div>

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
        </form>

        <Paragraph className={styles.signupText}>
          Không nhận được mã?{" "}
          <AntdLink
            onClick={handleResendOTP}
            disabled={resending}
            className={styles.signupLink}
          >
            {resending ? "Đang gửi..." : "Gửi lại OTP"}
          </AntdLink>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default OTPPage;
