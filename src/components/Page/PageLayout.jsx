import React from "react";
import { Layout } from "antd";
import Navbar from "@/components/Navbar/Navbar"; // import navbar bạn đã có
import styles from "@/style/Page.module.css";

const { Header, Content, Footer } = Layout;

const PageLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      {/* Header */}
      <Header className={styles.header}>
        <Navbar />
      </Header>

      {/* Content */}
      <Content className={styles.contentWrapper}>
        <div className={styles.contentBox}>{children}</div>
      </Content>

      {/* Footer */}
      <Footer className={styles.footer}>
        <p>
          Your privacy is important to us. All responses are confidential and
          stored securely.
        </p>
      </Footer>
    </Layout>
  );
};

export default PageLayout;
