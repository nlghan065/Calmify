/**
 * HighlightFeatures Section
 * --------------------------
 * Mô tả: hiển thị các tính năng chính của Calmify.
 * Ghi chú: dữ liệu hiện đang nằm trực tiếp trong component (demo).
 */

import React from "react";
import styles from "./Style.module.css";
import Section from "@/components/Section/Section";
import FeatureCard from "@/components/FeatureCard/FeatureCard";

export default function HighlightFeatures({ showTitle = true }) {
  // Dữ liệu demo (mock)
  const features = [
    {
      icon: "https://cdn-icons-png.flaticon.com/128/15187/15187844.png",
      title: "Khoa học",
      text: "Calmify kết hợp giữa bài test chuẩn y học (PHQ-9, DSM-5) và cách tiếP cận nhân văn dành cho người Việt,",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/128/18111/18111997.png",
      title: "AI biết lắng nghe",
      text: "Chatbot Calmify không phán xét, chỉ lắng nghe và phản hồi nhẹ nhàng, giúp bạn cảm thấy được thấu hiểu.",
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/128/5952/5952557.png",
      title: "An toàn tuyệt đối",
      text: "Dữ liệu đươc mã hoá AES-256, lưu trữ ẩn danh. Chỉ bạn mới có quyền xem cảm xúc của mình.",
    },
  ];

  if (features.length === 0) {
    return (
      <p className="text-center text-gray-500">Chưa có dữ liệu tính năng</p>
    );
  }

  return (
    <Section
      className={styles.featureSection}
      title={
        showTitle
          ? "Calmify không chỉ kiểm tra — Calmify lắng nghe và đồng hành cùng bạn."
          : ""
      }
      description={[
        "Calmify được phát triển dựa trên tiêu chuẩn y học quốc tế (PHQ-9, DSM-5) và thấu hiểu sâu sắc tâm lý người Việt.",
        "Chúng tôi mang đến hành trình giúp bạn nhận biết sớm, thấu hiểu bản thân và chăm sóc cảm xúc mỗi ngày - an toàn, ẩn danh và đầy nhân văn.",
      ]}
    >
      {features.map((item) => (
        <FeatureCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          text={item.text}
        />
      ))}
    </Section>
  );
}
