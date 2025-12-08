import { useParams, useNavigate } from "react-router-dom";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./Methods.module.css";

// Danh sách bài tập
const lessonsData = {
  meditation: [
    {
      id: "med1",
      title: "Thiền 5 phút",
      desc: "Bài thiền ngắn giúp ổn định cảm xúc.",
      image: "/src/assets/images/meditation.jpg",
      videoId: "inpok4MKVLM",
    },
    {
      id: "med2",
      title: "Thiền giảm lo âu",
      desc: "Giảm áp lực và căng thẳng.",
      image: "/src/assets/images/meditation.jpg",
      videoId: "O-6f5wQXSu8",
    },
  ],
  breathing: [
    {
      id: "bre1",
      title: "Thở 4-7-8",
      desc: "Bài thở giúp thư giãn toàn thân.",
      image: "/src/assets/images/breathing.jpg",
      videoId: "YRPh_GaiL8k",
    },
    {
      id: "bre2",
      title: "Thở sâu thư giãn",
      desc: "Giúp giảm nhịp tim và bình tĩnh hơn.",
      image: "/src/assets/images/breathing.jpg",
      videoId: "Uxbdx-SeOOo",
    },
  ],
};

export default function MethodDetailPage() {
  const { methodId } = useParams();
  const navigate = useNavigate();

  const lessons = lessonsData[methodId];

  return (
    <LayoutContainer>
      <h3 className={styles.sectionTitle}>Danh sách bài tập</h3>

      {/* --- Danh sách bài tập (card giống MethodsPage) --- */}
      <div className={styles.grid}>
        {lessons?.map((lesson) => (
          <div
            key={lesson.id}
            className={styles.card}
            onClick={() => navigate(`/lesson/${lesson.id}`)}
          >
            <img src={lesson.image} className={styles.cardImg} />
            <h4 className={styles.cardTitle}>{lesson.title}</h4>
            <p className={styles.cardDesc}>{lesson.desc}</p>
            <button className={styles.button}>Xem video</button>
          </div>
        ))}
      </div>
    </LayoutContainer>
  );
}
