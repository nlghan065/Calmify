import React, { useState, useEffect } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./SupportCenters.module.css";
import { supportAPI } from "@/api/support/supportAPI";

export default function SupportCentersPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await supportAPI.getLocations();
        // Backend trả về: { success: true, data: [...] }
        if (res.data.success || Array.isArray(res.data.data)) {
          setLocations(res.data.data || []);
        } else if (Array.isArray(res.data)) {
          // Fallback nếu API trả về mảng trực tiếp
          setLocations(res.data);
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu hỗ trợ:", err);
        setError("Không thể tải danh sách địa chỉ hỗ trợ.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ====================== SEARCH & FILTER LOGIC ====================== */
  const filteredList = locations.filter((item) => {
    const lowerQuery = query.toLowerCase();
    return (
      item.name?.toLowerCase().includes(lowerQuery) ||
      item.address?.toLowerCase().includes(lowerQuery)
    );
  });

  const hotlines = filteredList.filter((item) =>
    item.supportType?.name?.toLowerCase().includes("hotline")
  );

  const centers = filteredList.filter(
    (item) => !item.supportType?.name?.toLowerCase().includes("hotline")
  );

  /* ====================== UI ====================== */
  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Hỗ trợ khẩn cấp & Địa chỉ uy tín</h2>
        <p className={styles.subtitle}>
          Nếu bạn đang căng thẳng hoặc cần hỗ trợ ngay, hãy liên hệ các hotline
          hoặc trung tâm bên dưới.
        </p>

        {/* LOADING & ERROR */}
        {loading && (
          <div className={styles.loadingState}>⏳ Đang tải dữ liệu...</div>
        )}

        {!loading && error && (
          <div className={styles.errorState}>⚠️ {error}</div>
        )}

        {!loading && !error && (
          <>
            <div className={styles.cardList}>
              {centers.length > 0 ? (
                centers.map((item) => (
                  <div key={item.id} className={styles.card}>
                    <h4 className={styles.cardTitle}>{item.name}</h4>

                    {item.supportType && (
                      <span className={styles.supportType}>
                        {item.supportType.name}
                      </span>
                    )}

                    <p className={styles.cardInfo}>
                      SĐT: <strong>{item.phoneNumber}</strong>
                    </p>

                    <p className={styles.addressRow}>📍 {item.address}</p>
                    {item.note && (
                      <p className={styles.noteRow}>📝 {item.note}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className={styles.emptyText}>
                  Không tìm thấy địa chỉ phù hợp.
                </p>
              )}
            </div>
          </>
        )}

        {/* FAQ SECTION */}
        <h3 className={styles.sectionTitle} style={{ marginTop: 50 }}>
          💡 Mẹo nhanh
        </h3>
        <ul className={styles.faqList}>
          <li>Hít thở sâu 3–5 phút khi cảm thấy lo âu.</li>
          <li>Chia sẻ cảm xúc với người bạn tin tưởng hoặc chuyên gia.</li>
          <li>Lưu sẵn số hotline khẩn cấp vào điện thoại để dùng khi cần.</li>
          <li>
            Đừng ngần ngại tìm kiếm sự trợ giúp y tế nếu cảm thấy quá sức.
          </li>
        </ul>
      </div>
    </LayoutContainer>
  );
}
