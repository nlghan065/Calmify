import React, { useEffect, useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./Methods.module.css";
import { useNavigate } from "react-router-dom";
import { exerciseAPI } from "@/api/exercise/exerciseAPI";

export default function MethodsPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    exerciseAPI
      .getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => setError("Không thể tải danh sách danh mục."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải danh mục...</p>;
  if (error) return <p>{error}</p>;

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Bài tập & Tài nguyên</h2>
        <p className={styles.subtitle}>
          Khám phá các bài tập, video hướng dẫn và tài nguyên hỗ trợ sức khỏe
          tinh thần
        </p>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={styles.card}
              onClick={() => navigate(`/methods/${cat.id}`)}
            >
              {cat.thumbnail && (
                <img
                  src={cat.thumbnail}
                  alt={cat.title}
                  className={styles.image}
                />
              )}
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <p className={styles.cardDesc}>{cat.description}</p>
              <button className={styles.button}>Xem chi tiết</button>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
