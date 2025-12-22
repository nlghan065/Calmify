import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./Methods.module.css";
import { exerciseAPI } from "@/api/exercise/exerciseAPI";

export default function MethodDetailPage() {
  const { methodId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    exerciseAPI
      .getCategoryDetail(methodId)
      .then((res) => setCategory(res.data.data))
      .catch((err) => setError("Không thể tải bài tập."))
      .finally(() => setLoading(false));
  }, [methodId]);

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate("/methods")}>
          ⬅ Quay lại thư viện
        </button>

        {/* Loading */}
        {loading && (
          <div className={styles.loadingBox}>⏳ Đang tải bài tập...</div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className={styles.errorBox}>
            <div className={styles.errorIcon}>🚫</div>
            <div className={styles.errorTitle}>Không tìm thấy dữ liệu</div>
            <div className={styles.errorDesc}>{error}</div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && category && (
          <>
            <h2 className={styles.title}>{category.title}</h2>
            <p className={styles.subtitle}>{category.description}</p>

            {!category.exercises || category.exercises.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                Chưa có bài tập nào.
              </p>
            ) : (
              <div className={styles.grid}>
                {category.exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className={styles.card}
                    onClick={() => navigate(`/lesson/${ex.id}`)}
                  >
                    <img
                      src={
                        ex.thumbnail ||
                        "https://via.placeholder.com/300x200?text=Exercise"
                      }
                      alt={ex.title}
                      className={styles.image}
                    />
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{ex.title}</h3>
                      <p className={styles.cardDesc}>{ex.description}</p>
                      <button className={styles.button}>Tập ngay</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </LayoutContainer>
  );
}
