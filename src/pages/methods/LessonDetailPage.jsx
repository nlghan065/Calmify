import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutContainer from "@/Layout/LayoutContainer";
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
      .then((res) => setExercise(res.data))
      .catch((err) => setError("Không thể tải bài tập."))
      .finally(() => setLoading(false));
  }, [lessonId]);

  if (loading) return <p>Đang tải bài tập...</p>;
  if (error) return <p>{error}</p>;
  if (!exercise) return <p>Bài tập không tồn tại</p>;

  return (
    <LayoutContainer>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ⬅ Quay lại
      </button>

      <h2 className={styles.title}>{exercise.title}</h2>

      {exercise.videoUrl && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>📺 Video hướng dẫn</h3>
          <div className={styles.videoWrapper}>
            <iframe
              src={exercise.videoUrl}
              title={exercise.title}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📘 Mô tả & Hướng dẫn</h3>
        <p>{exercise.description}</p>
        {exercise.instruction && (
          <div>
            <h4>Hướng dẫn:</h4>
            <p>{exercise.instruction}</p>
          </div>
        )}
      </div>

      {exercise.category && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>🏷 Category</h3>
          <p>{exercise.category.title}</p>
        </div>
      )}
    </LayoutContainer>
  );
}
