import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { exerciseAPI } from "@/api/exercise/exerciseAPI"; // Import API

export default function RelaxExercises() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Gọi API lấy danh sách danh mục (giống MethodsPage)
    const fetchCategories = async () => {
      try {
        const res = await exerciseAPI.getCategories();
        const data = res.data.data || [];
        // Chỉ lấy tối đa 3 danh mục đầu tiên để hiển thị cho gọn Dashboard
        setCategories(data.slice(0, 3));
      } catch (err) {
        console.error("Lỗi tải bài tập thư giãn:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.card}>
      <h4>Bài tập thư giãn</h4>
      <p>Tìm lại bình yên với các bài tập đơn giản.</p>

      {/* Loading state nhẹ nhàng */}
      {loading ? (
        <div style={{ padding: 10, textAlign: "center", color: "#888" }}>
          Đang tải...
        </div>
      ) : (
        <div className={styles.btnGroup}>
          {/* 2. Map danh sách danh mục ra thành các nút bấm */}
          {categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/detail/${cat.id}`)} // Chuyển sang trang chi tiết bài tập
                title={cat.description} // Tooltip mô tả ngắn
              >
                {cat.title}
              </button>
            ))
          ) : (
            <p style={{ fontSize: 13, color: "#999" }}>Chưa có bài tập nào.</p>
          )}
        </div>
      )}

      {/* Nút Xem thêm chuyển sang trang Methods tổng */}
      <button
        className={styles.moreBtn} // Bạn có thể thêm class riêng nếu muốn style khác
        onClick={() => navigate("/methods")}
        style={{ marginTop: 10, background: "#f0f0f0", color: "#555" }}
      >
        Xem tất cả →
      </button>
    </div>
  );
}
