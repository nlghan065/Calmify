import React from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./Methods.module.css";
import meditation from "@/assets/images/meditation.jpg";
import breathingImg from "@/assets/images/breathing.jpg";
import journalImg from "@/assets/images/journal.jpg";
import musicImg from "@/assets/images/music.jpg";
import exerciseImg from "@/assets/images/exercise.jpg";

import { useNavigate } from "react-router-dom";

export default function MethodsPage() {
  const navigate = useNavigate();

  const methods = [
    {
      id: "meditation",
      title: "Thiền chánh niệm",
      desc: "Giảm căng thẳng, cải thiện sự tập trung và mang lại sự bình yên nội tâm.",
      image: meditation, // nếu có hình
    },
    {
      id: "breathing",
      title: "Bài tập thở sâu",
      desc: "Giúp thư giãn hệ thần kinh, giảm hồi hộp và lo âu nhanh chóng.",
      image: breathingImg,
    },
    {
      id: "journal",
      title: "Nhật ký cảm xúc",
      desc: "Hiểu rõ cảm xúc và theo dõi sự thay đổi mỗi ngày.",
      image: journalImg,
    },
    {
      id: "relax-sound",
      title: "Âm thanh thư giãn",
      desc: "Âm nhạc nhẹ nhàng giúp thư giãn đầu óc.",
      image: musicImg,
    },
    {
      id: "light-exercise",
      title: "Bài tập cơ thể nhẹ nhàng",
      desc: "Giãn cơ và vận động nhẹ giúp cải thiện tâm trạng.",
      image: exerciseImg,
    },
  ];

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Phương pháp thư giãn</h2>
        <p className={styles.subtitle}>
          Các phương pháp giúp bạn cải thiện sức khỏe tinh thần mỗi ngày
        </p>

        <div className={styles.grid}>
          {methods.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/detail/${item.id}`)}
            >
              <img src={item.image} alt={item.title} className={styles.image} />

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>

              <button className={styles.button}>Xem chi tiết</button>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
