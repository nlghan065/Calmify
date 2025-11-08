import React from "react";
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
import { LockOutlined, MailOutlined } from "@ant-design/icons";
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

  const onFinish = async (values) => {
    try {
      const res = await authAPI.register(values);
      message.success(res.data.message || "Đăng ký thành công! 🌿");
      console.log("Dữ liệu đăng ký:", res.data);
      form.resetFields();
    } catch (err) {
      message.error(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  const onFinishFailed = () => {
    message.error("Vui lòng kiểm tra lại thông tin nhé!");
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

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Bạn quên nhập mật khẩu rồi." }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
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
