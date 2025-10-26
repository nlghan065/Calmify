import React from "react";
import TestimonialCard from "@/components/TestimonialCard/TestimonialCard";
import styles from "./Style.module.css";

import imgABC from "@/assets/images/ABC.jpg";
import imgFanzy from "@/assets/images/Fanzy.jpg";
import imgRebel from "@/assets/images/Rebel.jpg";

const mockTestimonials = [
  {
    img: imgABC,
    quote:
      "Tôi chưa từng nghĩ mình cần một ứng dụng như Calmify. Chỉ sau bài test ngắn, tôi nhận ra mình đang mệt mỏi hơn mình tưởng.",
    author: "ABC",
    age: "21 tuổi, Sinh viên Kinh tế",
    rating: 5,
  },
  {
    img: imgFanzy,
    quote:
      "AI không hề phán xét. Tôi chỉ nói ra điều mình nghĩ, và lần đầu tiên, tôi thấy mình được lắng nghe.",
    author: "Fanzy",
    age: "23 tuổi, kỹ sư phần mềm",
    rating: 4,
  },
  {
    img: imgRebel,
    quote:
      "Không phải app nào cũng khiến tôi muốn mở mỗi sáng. Calmify khiến tôi thấy mình không đơn độc.",
    author: "Rebel",
    age: "19 tuổi, Sinh viên Y",
    rating: 5,
  },
];

export default function TestimonialsSection({
  testimonials = mockTestimonials,
  showTitle = true,
}) {
  if (!testimonials || testimonials.length === 0) {
    return <p className={styles.empty}>Chưa có phản hồi từ người dùng</p>;
  }

  return (
    <section className={styles.section}>
      {showTitle && (
        <>
          <h2 className={styles.title}>
            Mỗi lời chia sẻ là một hành trình bình yên hơn.
          </h2>
          <p className={styles.subtitle}>
            “Calmify đã giúp sinh viên nhận ra rằng: đôi khi, chỉ cần được lắng
            nghe và hiểu đúng, mọi thứ đã bắt đầu thay đổi.”
          </p>
          <button className={styles.button}>Trải nghiệm Calmify</button>
        </>
      )}

      <div className={styles.cards}>
        {testimonials.map((item, i) => (
          <TestimonialCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
