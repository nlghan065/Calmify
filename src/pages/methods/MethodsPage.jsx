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
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => {
        console.error(err);
        setError("Không thể tải danh sách danh mục.");
      })
      .finally(() => setLoading(false));
  }, []);

  // --- KHÔNG RETURN Ở ĐÂY NỮA, ĐỂ XUỐNG DƯỚI RENDER ---

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Góc Thư Giãn 🌿</h2>
        <p className={styles.subtitle}>
          Khám phá các bài tập, video hướng dẫn và tài nguyên hỗ trợ sức khỏe
          tinh thần
        </p>

        {/* 1. Trạng thái Loading */}
        {loading && (
          <div className={styles.loadingBox}>⏳ Đang tải dữ liệu...</div>
        )}

        {/* 2. Trạng thái Lỗi (Hiện đẹp như hình mẫu) */}
        {!loading && error && (
          <div className={styles.errorBox}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorTitle}>Lỗi kết nối</div>
            <div className={styles.errorDesc}>
              {error} <br /> Hãy chắc chắn rằng Backend đang chạy.
            </div>
          </div>
        )}

        {/* 3. Trạng thái Có dữ liệu */}
        {!loading && !error && (
          <div className={styles.grid}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={styles.card}
                onClick={() => navigate(`/detail/${cat.id}`)}
              >
                <img
                  src={
                    cat.thumbnail ||
                    "https://via.placeholder.com/300x200?text=Relax"
                  }
                  alt={cat.title}
                  className={styles.image}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=Error")
                  }
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <p className={styles.cardDesc}>{cat.description}</p>
                  <button className={styles.button}>Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
