import React, { useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./SupportCenters.module.css";

export default function SupportCentersPage() {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const hotlines = [
    {
      name: "Đường dây nóng hỗ trợ tâm lý 1900 6233",
      desc: "Tổng đài tư vấn tâm lý 24/7.",
      phone: "19006233",
      email: "hotline19006233@example.com",
      website: "www.hotline19006233.vn",
    },
    {
      name: "Trung tâm khủng hoảng tâm lý 111",
      desc: "Hỗ trợ khẩn cấp, trẻ em, gia đình.",
      phone: "111",
      email: "hotline111@example.com",
      website: "www.hotline111.vn",
    },
    {
      name: "Bệnh viện Tâm thần Trung ương",
      desc: "Tư vấn & cấp cứu tâm thần.",
      phone: "02438521221",
      email: "hotlineBVTW@example.com",
      website: "www.bvtw.vn",
    },
    {
      name: "Trung tâm tư vấn tâm lý Đà Nẵng",
      desc: "Hỗ trợ khẩn cấp và tư vấn tâm lý tại Đà Nẵng.",
      phone: "02363636236",
      email: "supportdn@example.com",
      website: "www.tuvandn.vn",
    },
    {
      name: "Trung tâm sức khỏe tinh thần Sunshine",
      desc: "Tư vấn và hỗ trợ tâm lý 24/7 tại Đà Nẵng.",
      phone: "02363639876",
      email: "sunshine@example.com",
      website: "www.sunshine.vn",
    },
  ];

  const centers = [
    {
      name: "Bệnh viện Tâm thần Đà Nẵng",
      address: "119 Hải Phòng, Q. Thanh Khê, Đà Nẵng",
      phone: "02363632010",
      email: "contact@bvtdn.vn",
      website: "www.bvtdn.vn",
      map: "https://maps.google.com/?q=119+Hai+Phong+Thanh+Khe+Da+Nang",
    },
    {
      name: "Trung tâm tư vấn tâm lý NHC Đà Nẵng",
      address: "56 Lê Duẩn, Q. Hải Châu, Đà Nẵng",
      phone: "02363636789",
      email: "nhcdn@example.com",
      website: "www.nhcdn.vn",
      map: "https://maps.google.com/?q=56+Le+Duan+Hai+Chau+Da+Nang",
    },
    {
      name: "Trung tâm tâm lý Vinahospital Đà Nẵng",
      address: "265 Nguyễn Văn Linh, Q. Thanh Khê, Đà Nẵng",
      phone: "02363634567",
      email: "vinahospital@example.com",
      website: "www.vinahospital.vn",
      map: "https://maps.google.com/?q=265+Nguyen+Van+Linh+Thanh+Khe+Da+Nang",
    },
    {
      name: "Phòng khám tâm lý Bách Khoa",
      address: "32 Hoàng Diệu, Q. Hải Châu, Đà Nẵng",
      phone: "02363637890",
      email: "bachkhoa@example.com",
      website: "www.bachkhoa.vn",
      map: "https://maps.google.com/?q=32+Hoang+Dieu+Hai+Chau+Da+Nang",
    },
    {
      name: "Trung tâm chăm sóc tâm lý Hòa Vang",
      address: "12 Nguyễn Tri Phương, Hòa Vang, Đà Nẵng",
      phone: "02363633445",
      email: "hoavang@example.com",
      website: "www.hoavang.vn",
      map: "https://maps.google.com/?q=12+Nguyen+Tri+Phuong+Hoa+Vang+Da+Nang",
    },
  ];

  const filteredHotlines = hotlines.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCenters = centers.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.address.toLowerCase().includes(query.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Yêu cầu gửi:", form);
    setFormSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <h2 className={styles.title}>Hỗ trợ khẩn cấp & Địa chỉ uy tín</h2>
        <p className={styles.subtitle}>
          Nếu bạn cảm thấy căng thẳng hoặc cần sự giúp đỡ ngay lập tức, hãy tham
          khảo các hotline, trung tâm, hoặc gửi yêu cầu hỗ trợ bên dưới.
        </p>

        {/* Search */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Tìm trung tâm hoặc hotline..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button
            className={styles.buttonSmall}
            onClick={() => console.log("Tìm kiếm:", query)}
          >
            Tìm kiếm
          </button>
        </div>

        {/* HOTLINES */}
        <h3 className={styles.sectionTitle}>📞 Hotline hỗ trợ</h3>
        <div className={styles.cardList}>
          {filteredHotlines.length > 0 ? (
            filteredHotlines.map((item, index) => (
              <div key={index} className={styles.card}>
                <h4 className={styles.cardTitle}>{item.name}</h4>
                <p className={styles.cardDesc}>{item.desc}</p>
                <p className={styles.cardInfo}>
                  Số điện thoại: <strong>{item.phone}</strong>
                </p>
                <p className={styles.cardInfo}>
                  Email: <strong>{item.email}</strong>
                </p>
                <p className={styles.cardInfo}>
                  Website:{" "}
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.website}
                  </a>
                </p>
              </div>
            ))
          ) : (
            <p>Không tìm thấy hotline phù hợp.</p>
          )}
        </div>

        {/* CENTERS */}
        <h3 className={styles.sectionTitle}>📍 Địa chỉ uy tín</h3>
        <div className={styles.cardList}>
          {filteredCenters.length > 0 ? (
            filteredCenters.map((item, index) => (
              <div key={index} className={styles.card}>
                <h4 className={styles.cardTitle}>{item.name}</h4>
                <p className={styles.cardDesc}>📌 {item.address}</p>
                <p className={styles.cardDesc}>☎ {item.phone}</p>
                <p className={styles.cardInfo}>
                  Email: <strong>{item.email}</strong>
                </p>
                <p className={styles.cardInfo}>
                  Website:{" "}
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.website}
                  </a>
                </p>

                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    item.address
                  )}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0, marginTop: "10px", borderRadius: "8px" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>

                <div className={styles.actions}>
                  <a
                    href={item.map}
                    target="_blank"
                    className={styles.buttonSmallOutline}
                  >
                    Xem bản đồ
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>Không tìm thấy trung tâm phù hợp.</p>
          )}
        </div>

        {/* Tips / FAQ */}
        <h3 className={styles.sectionTitle}>💡 Mẹo nhanh & FAQ</h3>
        <ul className={styles.faqList}>
          <li>Thư giãn bằng hít thở sâu và nghỉ ngơi ngắn mỗi 1-2 giờ.</li>
          <li>
            Nếu cảm thấy quá căng thẳng, hãy chia sẻ với người thân hoặc bạn bè.
          </li>
          <li>Luôn lưu số hotline bên trên để liên hệ khi cần.</li>
        </ul>
      </div>
    </LayoutContainer>
  );
}
