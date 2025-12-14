import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./Methods.module.css";
import { exerciseAPI } from "@/api/exercise/exerciseAPI";

export default function MethodDetailPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    exerciseAPI
      .getCategoryDetail(categoryId)
      .then((res) => {
        setCategory(res.data.category);
        setExercises(res.data.exercises || []);
      })
      .catch((err) => setError("Không thể tải bài tập."))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p>Đang tải bài tập...</p>;
  if (error) return <p>{error}</p>;
  if (!category) return <p>Danh mục không tồn tại</p>;

  return (
    <LayoutContainer>
      <h2 className={styles.title}>{category.title}</h2>
      <p className={styles.subtitle}>{category.description}</p>

      <div className={styles.grid}>
        {exercises.map((ex) => (
          <div
            key={ex.id}
            className={styles.card}
            onClick={() => navigate(`/lesson/${ex.id}`)}
          >
            {ex.thumbnail && (
              <img
                src={ex.thumbnail}
                alt={ex.title}
                className={styles.cardImg}
              />
            )}
            <h3 className={styles.cardTitle}>{ex.title}</h3>
            <p className={styles.cardDesc}>{ex.description}</p>
            <button className={styles.button}>Xem chi tiết</button>
          </div>
        ))}
      </div>
    </LayoutContainer>
  );
}
