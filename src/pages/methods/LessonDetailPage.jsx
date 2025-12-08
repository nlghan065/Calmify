import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./Methods.module.css";

import meditationImg from "@/assets/images/meditation.jpg";
import breathingImg from "@/assets/images/breathing.jpg";

const lessonVideos = {
  med1: {
    title: "Thiền 5 phút",
    videoId: "inpok4MKVLM",
    thumbnail: meditationImg,
    shortDesc: "Thiền nhanh giúp bạn bình tĩnh và tập trung trở lại.",
    description: `
Thiền 5 phút giúp bạn quay về hơi thở và bình tĩnh lại ngay cả khi đang bận rộn.

**Hướng dẫn:**
• Tìm nơi yên tĩnh  
• Giữ lưng thẳng  
• Tập trung vào hơi thở  

**Lợi ích:**  
• Giảm căng thẳng  
• Tăng tập trung  
    `,
  },
  med2: {
    title: "Thiền giảm lo âu",
    videoId: "O-6f5wQXSu8",
    thumbnail: meditationImg,
    shortDesc: "Thiền quan sát cảm xúc giúp giảm lo âu hiệu quả.",
    description: `
Bài thiền tập trung vào giảm lo âu nhờ quan sát cảm xúc.

**Hướng dẫn:**  
• Hít sâu 3 lần  
• Quan sát cảm giác trong cơ thể  
• Không phán xét  

**Lợi ích:**  
• Giảm lo âu  
• Ổn định cảm xúc  
    `,
  },
  bre1: {
    title: "Kỹ thuật thở 4-7-8",
    videoId: "YRPh_GaiL8k",
    thumbnail: breathingImg,
    shortDesc: "Kỹ thuật thở giúp ổn định nhịp tim và thư giãn nhanh.",
    description: `
Kỹ thuật thở giúp làm chậm nhịp tim và thư giãn.

**Hướng dẫn:**  
• Hít vào 4 giây  
• Giữ hơi 7 giây  
• Thở ra 8 giây  

**Lợi ích:**  
• Ngủ dễ hơn  
• Giảm căng thẳng  
    `,
  },
  bre2: {
    title: "Thở sâu thư giãn",
    videoId: "Uxbdx-SeOOo",
    thumbnail: breathingImg,
    shortDesc: "Bài thở sâu giúp thư giãn toàn bộ cơ thể.",
    description: `
Thở sâu kích hoạt hệ thần kinh thư giãn.

**Hướng dẫn:**  
• Đặt tay lên bụng  
• Thở chậm, sâu  
• Cảm nhận cơ thể thả lỏng  

**Lợi ích:**  
• Giảm căng  
• Cải thiện giấc ngủ  
    `,
  },
};

export default function LessonDetailPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const data = lessonVideos[lessonId];
  const [suggestions, setSuggestions] = useState([]);

  // Random 3 bài khác
  useEffect(() => {
    const otherLessons = Object.keys(lessonVideos).filter(
      (key) => key !== lessonId
    );

    const random3 = otherLessons
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((id) => ({ id, ...lessonVideos[id] }));

    setSuggestions(random3);
  }, [lessonId]);

  return (
    <LayoutContainer>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ⬅ Quay lại
      </button>

      <h2 className={styles.title}>{data.title}</h2>

      {/* VIDEO */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📺 Video hướng dẫn</h3>
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${data.videoId}`}
            title="YouTube Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📘 Mô tả & Hướng dẫn</h3>
        <div className={styles.description}>
          {data.description.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>✨ Gợi ý thêm cho bạn</h3>

        <div className={styles.suggestGrid}>
          {suggestions.map((item) => (
            <div key={item.id} className={styles.suggestCard}>
              <img src={item.thumbnail} className={styles.suggestImg} />

              <h4 className={styles.suggestTitle}>{item.title}</h4>
              <p className={styles.suggestDesc}>{item.shortDesc}</p>

              <button
                className={styles.suggestButton}
                onClick={() => navigate(`/lesson/${item.id}`)}
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
