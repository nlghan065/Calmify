import React, { useEffect, useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./ProfilePage.module.css";
import { userAPI } from "@/api/user/userAPI";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Khởi tạo là chuỗi rỗng để tránh lỗi uncontrolled input
  const [tempNick, setTempNick] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(null);

  // --- LẤY URL BACKEND ---
  const getBackendRoot = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return apiUrl.replace(/\/api$/, "");
  };

  // --- LOAD PROFILE ---
  const loadProfile = async () => {
    try {
      const res = await userAPI.getMe();
      const userData = res.data.data;
      console.log("Check dữ liệu tải về:", userData); // Xem log để chắc chắn có nickname hay chưa

      setUser(userData);

      // --- SỬA LỖI TẠI ĐÂY ---
      // Luôn set giá trị cho tempNick, nếu null thì về chuỗi rỗng ""
      // Điều này giúp ô input hiển thị đúng những gì đang có trong DB
      setTempNick(userData.nickname ? userData.nickname : "");
    } catch (err) {
      console.error("Lỗi load profile:", err);
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // --- LƯU NICKNAME ---
  const saveNickname = async () => {
    if (!tempNick.trim()) {
      alert("Vui lòng nhập biệt danh trước khi lưu!");
      return;
    }

    try {
      console.log("Đang gửi nickname lên server:", tempNick);
      await userAPI.updateNickname(user.id, tempNick);

      // Load lại ngay lập tức để đồng bộ
      await loadProfile();
      alert("Đã lưu biệt danh thành công! ✅");
    } catch (err) {
      console.error(err);
      alert("Lưu thất bại. Kiểm tra console (F12) để xem lỗi ❌");
    }
  };

  // --- UPLOAD AVATAR ---
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewAvatar(URL.createObjectURL(file));

    try {
      await userAPI.updateAvatar(user.id, file);
      setTimeout(async () => {
        await loadProfile();
        setPreviewAvatar(null);
        alert("Cập nhật avatar thành công ✅");
      }, 800);
    } catch (err) {
      console.error("Lỗi upload avatar:", err);
      alert("Cập nhật avatar thất bại ❌");
    }
  };

  // --- LẤY LINK ẢNH ---
  const getAvatarSrc = () => {
    if (previewAvatar) return previewAvatar;

    if (user && user.avatarUrl) {
      if (user.avatarUrl.startsWith("http")) return user.avatarUrl;
      const cleanPath = user.avatarUrl.startsWith("/")
        ? user.avatarUrl
        : `/${user.avatarUrl}`;
      return `${getBackendRoot()}${cleanPath}`;
    }

    return "https://cdn-icons-png.flaticon.com/512/3237/3237472.png";
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return <div style={{ padding: 20 }}>Đang tải thông tin...</div>;

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <div className={styles.profileInfo}>
            {/* AVATAR */}
            <label className={styles.avatarWrapper}>
              <img
                src={getAvatarSrc()}
                alt="avatar"
                className={styles.avatar}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {/* Ảnh backup phòng khi ảnh chính lỗi */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                className={styles.avatar}
                style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.avatarInput}
              />
              <div className={styles.cameraIcon}>📷</div>
            </label>

            {/* INFO - Ô NHẬP NICKNAME */}
            <div className={styles.textInfo}>
              <div className={styles.nickRow}>
                <input
                  type="text"
                  placeholder="Đặt biệt danh..."
                  value={tempNick} // Luôn binding với state
                  onChange={(e) => setTempNick(e.target.value)}
                  className={styles.nickInput}
                />
                <button
                  onClick={saveNickname}
                  className={styles.saveBtn}
                  title="Lưu biệt danh"
                >
                  Lưu
                </button>
              </div>

              <p className={styles.userID}>ID: {user.id}</p>
              <p className={styles.email}>Email: {user.email}</p>
              <p className={styles.joinDate}>
                Tham gia từ:{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                  : "..."}
              </p>
            </div>
          </div>
        </div>

        {/* ... PHẦN THÔNG TIN CÁ NHÂN GIỮ NGUYÊN ... */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Thông tin cá nhân</h3>
          <div className={styles.infoGrid}>
            <div>
              <label>Tuổi</label>
              <input value={user.age || "Chưa cập nhật"} readOnly />
            </div>
            <div>
              <label>Giới tính</label>
              <input value={user.gender || "Chưa cập nhật"} readOnly />
            </div>
            <div>
              <label>Công việc</label>
              <input value={user.job || "Chưa cập nhật"} readOnly />
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Đăng xuất
        </button>
      </div>
    </LayoutContainer>
  );
}
