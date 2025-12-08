import React from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./SupportCenters.module.css";

export default function SupportCentersPage() {
  const hotlines = [
    {
      name: "Đường dây nóng hỗ trợ tâm lý 1900 6233",
      desc: "Tổng đài tư vấn tâm lý 24/7.",
      phone: "19006233",
    },
    {
      name: "Trung tâm khủng hoảng tâm lý 111",
      desc: "Hỗ trợ khẩn cấp, trẻ em, gia đình.",
      phone: "111",
    },
    {
      name: "Bệnh viện Tâm thần Trung ương",
      desc: "Tư vấn & cấp cứu tâm thần.",
      phone: "02438521221",
    },
  ];

  const centers = [
    {
      name: "Bệnh viện Tâm thần TP.HCM",
      address: "336 Nguyễn Trãi, Q.5",
      phone: "02839234630",
      map: "https://maps.google.com/?q=336+Nguyen+Trai+Quan+5",
    },
    {
      name: "Trung tâm tư vấn tâm lý NHC",
      address: "11 Hoa Cau, Phú Nhuận",
      phone: "0965894461",
      map: "https://maps.google.com/?q=11+Hoa+Cau+Phu+Nhuan",
    },
    {
      name: "Bệnh viện Tâm thần Hà Nội",
      address: "467 Nguyễn Văn Linh, Long Biên",
      phone: "02438753456",
      map: "https://maps.google.com/?q=467+Nguyen+Van+Linh+Long+Bien",
    },
  ];

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Hỗ trợ khẩn cấp & Địa chỉ uy tín</h2>
        <p className={styles.subtitle}>
          Nếu bạn cảm thấy quá căng thẳng hoặc cần sự giúp đỡ ngay lập tức, hãy
          liên hệ các hotline hoặc trung tâm bên dưới.
        </p>

        {/* HOTLINES */}
        <h3 className={styles.sectionTitle}>📞 Hotline hỗ trợ</h3>
        <div className={styles.cardList}>
          {hotlines.map((item, index) => (
            <div key={index} className={styles.card}>
              <h4 className={styles.cardTitle}>{item.name}</h4>
              <p className={styles.cardDesc}>{item.desc}</p>
              <a href={`tel:${item.phone}`} className={styles.button}>
                Gọi ngay
              </a>
            </div>
          ))}
        </div>

        {/* CENTERS */}
        <h3 className={styles.sectionTitle}>📍 Địa chỉ uy tín</h3>
        <div className={styles.cardList}>
          {centers.map((item, index) => (
            <div key={index} className={styles.card}>
              <h4 className={styles.cardTitle}>{item.name}</h4>
              <p className={styles.cardDesc}>📌 {item.address}</p>
              <p className={styles.cardDesc}>☎ {item.phone}</p>

              <div className={styles.actions}>
                <a href={`tel:${item.phone}`} className={styles.buttonSmall}>
                  Gọi
                </a>
                <a
                  href={item.map}
                  target="_blank"
                  className={styles.buttonSmallOutline}
                >
                  Xem bản đồ
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
