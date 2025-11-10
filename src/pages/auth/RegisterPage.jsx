import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Row,
  Col,
  message,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import styles from "../../style/Auth.module.css";
import AuthLayout from "../../components/Auth/AuthLayout";
import { authAPI } from "@/api/auth/authAPI";

const { Title, Paragraph } = Typography;
const AntdLink = Typography.Link;

const getAntdOptions = (arr) =>
  arr.map((item) => ({ value: item, label: item }));

const ageOptions = getAntdOptions([16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
const genderOptions = getAntdOptions(["Nam", "Nữ", "Khác"]);
const jobOptions = getAntdOptions([
  "Học sinh",
  "Sinh viên",
  "Đã đi làm",
  "Khác",
]);

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const onFinish = async (values) => {
    try {
      const res = await authAPI.register(values);
      message.success(res.data.message || "Đăng ký thành công! 🌿");
      console.log("Dữ liệu đăng ký:", res.data);
      form.resetFields();
      setPasswordChecks({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
      });
    } catch (err) {
      message.error(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng kiểm tra lại thông tin nhé!");
  };

  // ✅ Cập nhật trạng thái các điều kiện khi người dùng nhập mật khẩu
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordChecks({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[\W_]/.test(value),
    });
  };

  const JobSpecificFields = () => {
    const jobValue = Form.useWatch("job", form);
    let fieldToRender = null;

    if (jobValue === "Sinh viên") {
      fieldToRender = (
        <Col span={12}>
          <Form.Item
            label="Ngành đang học"
            name="major"
            rules={[{ required: true, message: "Hãy chọn ngành đang học" }]}
          >
            <Select
              placeholder="Chọn ngành học"
              size="large"
              options={getAntdOptions(["CNTT", "Kinh tế", "Nghệ thuật"])}
            />
          </Form.Item>
        </Col>
      );
    } else if (jobValue === "Học sinh") {
      fieldToRender = (
        <Col span={12}>
          <Form.Item
            label="Khối đang học"
            name="grade"
            rules={[{ required: true, message: "Hãy chọn khối học" }]}
          >
            <Select
              placeholder="Chọn khối học"
              size="large"
              options={getAntdOptions(["Khối tự nhiên", "Khối xã hội"])}
            />
          </Form.Item>
        </Col>
      );
    }

    return (
      <Row gutter={16}>
        <Col span={fieldToRender ? 12 : 24}>
          <Form.Item
            label="Công việc"
            name="job"
            rules={[{ required: true, message: "Hãy chọn công việc" }]}
          >
            <Select
              placeholder="Chọn công việc"
              size="large"
              options={jobOptions}
            />
          </Form.Item>
        </Col>
        {fieldToRender}
      </Row>
    );
  };

  const renderCheckItem = (label, passed) => (
    <li
      style={{
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: passed ? "#52c41a" : "#999",
        fontSize: "13px",
      }}
    >
      <CheckCircleTwoTone
        twoToneColor={passed ? "#52c41a" : "#d9d9d9"}
        style={{ fontSize: "14px" }}
      />
      {label}
    </li>
  );

  return (
    <AuthLayout>
      <div className={styles.formBox}>
        <Title level={1} className={styles.title}>
          Đăng ký
        </Title>
        <Paragraph className={styles.subtitle}>
          Bắt đầu lại, nhẹ nhàng thôi 🌿
        </Paragraph>

        <Form
          form={form}
          name="register_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tuổi"
                name="age"
                rules={[{ required: true, message: "Hãy chọn tuổi" }]}
              >
                <Select
                  placeholder="Chọn tuổi"
                  size="large"
                  options={ageOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Hãy chọn giới tính" }]}
              >
                <Select
                  placeholder="Chọn giới tính"
                  size="large"
                  options={genderOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          <JobSpecificFields />

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Bạn quên nhập email rồi." },
              { type: "email", message: "Định dạng email chưa đúng!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email"
              size="large"
            />
          </Form.Item>

          {/* ✅ Mật khẩu có checklist */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Bạn quên nhập mật khẩu rồi." },
              {
                validator: (_, value) => {
                  // Nếu chưa nhập, không cần kiểm tra thêm — đã có rule required xử lý
                  if (!value) return Promise.resolve();

                  const checks = [
                    /.{8,}/.test(value),
                    /[A-Z]/.test(value),
                    /[a-z]/.test(value),
                    /\d/.test(value),
                    /[!@#$%^&*]/.test(value),
                  ];

                  if (checks.every(Boolean)) return Promise.resolve();
                  return Promise.reject("Mật khẩu chưa đủ điều kiện.");
                },
              },
            ]}
          >
            <>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                size="large"
                onChange={(e) => {
                  const value = e.target.value;
                  form.setFieldValue("password", value);
                  setPasswordChecks({
                    length: value.length >= 8,
                    upper: /[A-Z]/.test(value),
                    lower: /[a-z]/.test(value),
                    number: /\d/.test(value),
                    special: /[\W_]/.test(value),
                  });
                }}
              />

              <Row gutter={[16, 4]} style={{ marginTop: "8px" }}>
                <Col xs={24} sm={12}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {renderCheckItem("Ít nhất 8 ký tự", passwordChecks.length)}
                    {renderCheckItem(
                      "Chứa chữ hoa (A–Z)",
                      passwordChecks.upper
                    )}
                    {renderCheckItem(
                      "Chứa chữ thường (a–z)",
                      passwordChecks.lower
                    )}
                  </ul>
                </Col>
                <Col xs={24} sm={12}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {renderCheckItem(
                      "Có ít nhất 1 số (0–9)",
                      passwordChecks.number
                    )}
                    {renderCheckItem(
                      "Có ký tự đặc biệt (!@#$...)",
                      passwordChecks.special
                    )}
                  </ul>
                </Col>
              </Row>
            </>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className={styles.loginBtn}
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>

        <Paragraph className={styles.signupText}>
          Bạn đã có tài khoản?{" "}
          <AntdLink href="/login" className={styles.signupLink}>
            Đăng nhập ngay 💫
          </AntdLink>
        </Paragraph>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
