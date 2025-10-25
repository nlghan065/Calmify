/**
 * TestimonialsSection
 * -------------------
 * Mô tả: hiển thị cảm nhận của người dùng về Calmify.
 * Ghi chú: dữ liệu hiện là mock, sẽ thay bằng API sau này.
 */

import React from "react";
import Section from "@/components/Section/Section";
import TestimonialCard from "@/components/TestimonialCard/TestimonialCard";

const mockTestimonials = [
  {
    quote: "Calmify giúp tôi hiểu bản thân hơn mỗi ngày.",
    author: "Minh, 27 tuổi",
  },
  {
    quote: "Ứng dụng này thật sự khiến tôi cảm thấy được lắng nghe.",
    author: "Linh, 21 tuổi",
  },
  {
    quote: "Một không gian an toàn và nhẹ nhàng cho tâm trí.",
    author: "Khánh, 30 tuổi",
  },
];

export default function TestimonialsSection({
  testimonials = mockTestimonials,
  showTitle = true,
}) {
  if (!testimonials || testimonials.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Chưa có phản hồi từ người dùng
      </p>
    );
  }

  return (
    <Section
      title={showTitle ? "Người dùng nói gì về Calmify" : ""}
      bgColor="#f5f7fa"
    >
      {testimonials.map((item, i) => (
        <TestimonialCard key={i} quote={item.quote} author={item.author} />
      ))}
    </Section>
  );
}
