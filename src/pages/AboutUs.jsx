import React from "react";
import { Typography, Row, Col, Card } from "antd";
import PageLayout from "@/components/Page/PageLayout";
import styles from "@/style/Page.module.css";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          Về Chúng Tôi
        </Title>
        <Paragraph className={styles.intro}>
          <strong>Mental Health Support</strong> là nền tảng được tạo ra nhằm
          giúp mọi người nâng cao nhận thức về sức khỏe tinh thần. Chúng tôi
          cung cấp các công cụ tự đánh giá, tài nguyên học tập và cộng đồng hỗ
          trợ để giúp bạn hiểu rõ hơn về cảm xúc và tìm kiếm sự giúp đỡ khi cần.
        </Paragraph>

        <Row gutter={[24, 24]} className={styles.cardRow}>
          <Col xs={24} md={8}>
            <Card bordered={false} className={styles.card}>
              <Title level={4}>Sứ Mệnh</Title>
              <Paragraph>
                Xây dựng không gian an toàn, nơi mọi người có thể chia sẻ, học
                hỏi và chăm sóc sức khỏe tinh thần của mình.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} className={styles.card}>
              <Title level={4}>Tầm Nhìn</Title>
              <Paragraph>
                Trở thành cộng đồng hàng đầu hỗ trợ sức khỏe tinh thần, mang lại
                sự đồng cảm và thấu hiểu đến mọi người.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} className={styles.card}>
              <Title level={4}>Giá Trị Cốt Lõi</Title>
              <Paragraph>
                Tôn trọng – Lắng nghe – Đồng hành. Chúng tôi tin rằng mọi người
                đều xứng đáng có được sự bình an trong tâm trí.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <div className={styles.section}>
          <Title level={3}>Đội Ngũ</Title>
          <Paragraph>
            Nhóm của chúng tôi bao gồm các nhà tâm lý học, chuyên gia công nghệ
            và tình nguyện viên cùng chung mục tiêu lan tỏa kiến thức và sự thấu
            hiểu về sức khỏe tinh thần.
          </Paragraph>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutUs;
