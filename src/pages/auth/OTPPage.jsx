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

const schema = yup.object().shape({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP.")
    .length(6, "OTP phải gồm 6 số"),
});

const OTPPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async ({ otp }) => {
    setLoading(true);
    try {
      const res = await authAPI.verifyOtp({ email, otp });

      toast.success(res.data.message || "Xác thực thành công! 🌿");

      const resetToken = res.data.resetToken;

      navigate(`/reset-password?token=${resetToken}&email=${email}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "OTP không hợp lệ hoặc hết hạn!"
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
          Mã OTP đã được gửi tới <b>{email}</b>. Nhập mã để tiếp tục 💌
        </Paragraph>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Input
            prefix={<MailOutlined />}
            value={email}
            disabled
            size="large"
          />

          <div style={{ marginTop: 12 }}>
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
            style={{ marginTop: 16 }}
          >
            Xác nhận OTP
          </Button>
        </form>

        <Paragraph className={styles.signupText}>
          Không nhận được mã?{" "}
          <a href="/forgot" className={styles.signupLink}>
            Gửi lại OTP
          </a>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default OTPPage;
