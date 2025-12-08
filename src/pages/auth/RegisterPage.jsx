import React, { useState, useCallback } from "react";
import { Input, Button, Typography, Select, Row, Col } from "antd";
import {
  MailOutlined,
  LockOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";

const { Title, Paragraph } = Typography;

// ---------------------- TUỔI DÙNG 1 LẦN ----------------------
const AGE_OPTIONS = Array.from({ length: 11 }, (_, i) => ({
  value: 16 + i,
  label: 16 + i,
}));

// ----------------------- SCHEMA VALIDATION ---------------------
const schema = yup.object().shape({
  age: yup
    .number()
    .typeError("Tuổi không hợp lệ")
    .required("Hãy chọn tuổi")
    .min(16)
    .max(60),
  gender: yup.string().required("Hãy chọn giới tính"),
  job: yup.string().required("Hãy chọn công việc"),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Email chưa đúng định dạng")
    .required("Bạn quên nhập email rồi"),
  password: yup
    .string()
    .required("Bạn quên nhập mật khẩu rồi")
    .min(8, "Ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Phải có chữ hoa (A–Z)")
    .matches(/[a-z]/, "Phải có chữ thường (a–z)")
    .matches(/\d/, "Phải có số (0–9)")
    .matches(/[\W_]/, "Phải có ký tự đặc biệt (!@#$...)"),
  confirmPassword: yup
    .string()
    .required("Bạn quên nhập lại mật khẩu rồi")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
});

// ---------------------------------------------------------------

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // ---------------- WATCH PASSWORD ----------------
  const passwordValue = useWatch({ control, name: "password" }) || "";

  const passwordChecks = {
    length: passwordValue.length >= 8,
    upper: /[A-Z]/.test(passwordValue),
    lower: /[a-z]/.test(passwordValue),
    number: /\d/.test(passwordValue),
    special: /[\W_]/.test(passwordValue),
  };

  // ---------------- COMPONENT CHECK ITEM -----------------
  const renderCheckItem = useCallback((label, ok) => {
    return (
      <li
        className={styles.checkItem}
        style={{ color: ok ? "#52c41a" : "#9e9e9e" }}
      >
        <CheckCircleTwoTone twoToneColor={ok ? "#52c41a" : "#d9d9d9"} />
        {label}
      </li>
    );
  }, []);

  // ---------------------- SUBMIT ----------------------
  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const res = await authAPI.register(values);

      toast.success(res.data.message || "Đăng ký thành công! 🌿");
      navigate("/login");
      reset();
    } catch (err) {
      if (!err.response) toast.error("Không thể kết nối server!");
      else if (err.response.status === 409)
        toast.error("Email đã được sử dụng!");
      else toast.error(err.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Đăng ký
        </Title>
        <Paragraph className={styles.subtitle}>
          Bắt đầu lại, nhẹ nhàng thôi 🌿
        </Paragraph>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ------------- ROW 3 FIELD (AGE/GENDER/JOB) ------------- */}
          <Row className={styles.row3}>
            {/* AGE */}
            <Col span={7}>
              <label htmlFor="age" className={styles.label}>
                <span className={styles.required}>*</span> Tuổi
              </label>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="age"
                    style={{ width: "100%" }}
                    size="large"
                    className={styles.bigSelect}
                    placeholder="Chọn tuổi"
                    options={AGE_OPTIONS}
                    onChange={(v) => field.onChange(Number(v))}
                  />
                )}
              />
              {errors.age && (
                <p className={styles.error}>{errors.age.message}</p>
              )}
            </Col>

            {/* GENDER */}
            <Col span={8}>
              <label htmlFor="gender" className={styles.label}>
                <span className={styles.required}>*</span> Giới tính
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="gender"
                    style={{ width: "100%" }}
                    size="large"
                    className={styles.bigSelect}
                    placeholder="Chọn giới tính"
                    options={["Nam", "Nữ", "Khác"].map((v) => ({
                      value: v,
                      label: v,
                    }))}
                  />
                )}
              />
              {errors.gender && (
                <p className={styles.error}>{errors.gender.message}</p>
              )}
            </Col>

            {/* JOB */}
            <Col span={9}>
              <label htmlFor="job" className={styles.label}>
                <span className={styles.required}>*</span> Công việc
              </label>
              <Controller
                name="job"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="job"
                    style={{ width: "100%" }}
                    size="large"
                    className={styles.bigSelect}
                    placeholder="Chọn công việc"
                    options={["Học sinh", "Sinh viên", "Đã đi làm", "Khác"].map(
                      (v) => ({
                        value: v,
                        label: v,
                      })
                    )}
                  />
                )}
              />
              {errors.job && (
                <p className={styles.error}>{errors.job.message}</p>
              )}
            </Col>
          </Row>

          {/* ------------------- EMAIL ------------------- */}
          <div className={styles.inputRow}>
            <label htmlFor="email" className={styles.label}>
              <span className={styles.required}>*</span> Email
            </label>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  prefix={<MailOutlined />}
                  placeholder="Nhập email"
                  size="large"
                  className={styles.bigInput}
                />
              )}
            />

            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          {/* ------------------- PASSWORD ------------------- */}
          <div className={styles.inputRow}>
            <label htmlFor="password" className={styles.label}>
              <span className={styles.required}>*</span> Mật khẩu
            </label>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  id="password"
                  prefix={<LockOutlined />}
                  placeholder="Nhập mật khẩu"
                  size="large"
                  className={styles.bigInput}
                />
              )}
            />

            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          {/* ------------------- CONFIRM PASSWORD ------------------- */}
          <div className={styles.inputRow}>
            <label htmlFor="confirmPassword" className={styles.label}>
              <span className={styles.required}>*</span> Nhập lại mật khẩu
            </label>

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  id="confirmPassword"
                  prefix={<LockOutlined />}
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                  className={styles.bigInput}
                />
              )}
            />

            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* -------- PASSWORD CHECKLIST ---------- */}
          <Row gutter={[16, 4]} style={{ marginTop: 8 }}>
            <Col xs={24} sm={12}>
              <ul className={styles.checkList}>
                {renderCheckItem("Ít nhất 8 ký tự", passwordChecks.length)}
                {renderCheckItem("Chứa chữ hoa (A–Z)", passwordChecks.upper)}
                {renderCheckItem("Chứa chữ thường (a–z)", passwordChecks.lower)}
              </ul>
            </Col>

            <Col xs={24} sm={12}>
              <ul className={styles.checkList}>
                {renderCheckItem("Có ít nhất 1 số", passwordChecks.number)}
                {renderCheckItem("Có ký tự đặc biệt", passwordChecks.special)}
              </ul>
            </Col>
          </Row>

          {/* ------------------- BUTTON ------------------- */}
          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            loading={loading}
            className={styles.loginBtn}
            disabled={!isValid || loading}
            style={{ marginTop: 18 }}
          >
            Tạo tài khoản
          </Button>
        </form>

        <Paragraph className={styles.signupText}>
          Bạn đã có tài khoản?{" "}
          <Typography.Link href="/login" className={styles.signupLink}>
            Đăng nhập ngay 💫
          </Typography.Link>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
