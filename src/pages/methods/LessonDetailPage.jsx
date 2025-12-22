import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutContainer from "@/Layout/LayoutContainer";
// Đảm bảo import đúng file CSS module đã gộp
import styles from "./Methods.module.css";
import { exerciseAPI } from "@/api/exercise/exerciseAPI";

export default function LessonDetailPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    exerciseAPI
      .getExerciseDetail(lessonId)
      .then((res) => setExercise(res.data.data))
      .catch((err) => setError("Không thể tải nội dung bài tập."))
      .finally(() => setLoading(false));
  }, [lessonId]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    const videoId = url.split("v=")[1]?.split("&")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return url;
  };

  return (
    <LayoutContainer>
      {/* Kết hợp class container chung và class giới hạn chiều rộng */}
      <div className={`${styles.container} `}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ⬅ Quay lại
        </button>

        {loading && (
          <div className={styles.loadingBox}>⏳ Đang tải video...</div>
        )}

        {!loading && error && (
          <div className={styles.errorBox}>
            <div className={styles.errorIcon}>📺</div>
            <div className={styles.errorTitle}>Lỗi hiển thị</div>
            <div className={styles.errorDesc}>{error}</div>
          </div>
        )}

        {!loading && !error && exercise && (
          <>
            {/* Tiêu đề bài tập */}
            <h2 className={styles.title}>{exercise.title}</h2>

            {/* Video Player */}
            {exercise.videoUrl && (
              <div className={styles.section}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={getEmbedUrl(exercise.videoUrl)}
                    title={exercise.title}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Nội dung mô tả & Hướng dẫn */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>📘 Mô tả</h3>

              <p className={styles.descriptionText}>{exercise.description}</p>

              {exercise.instruction && (
                <div className={styles.instructionBox}>
                  <h4 className={styles.instructionTitle}>
                    Hướng dẫn thực hiện:
                  </h4>
                  <p className={styles.descriptionText}>
                    {exercise.instruction}
                  </p>
                </div>
              )}
            </div>

            {/* Danh mục (Footer) */}
            {exercise.category && (
              <div className={styles.categoryTag}>
                🏷 Danh mục: {exercise.category.title}
              </div>
            )}
          </>
        )}
      </div>
    </LayoutContainer>
  );
}
