import React, { useEffect, useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./ProfilePage.module.css";
import { userAPI } from "@/api/user/userAPI";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Thêm state lỗi

  const [tempNick, setTempNick] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const getBackendRoot = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return apiUrl.replace(/\/api$/, "");
  };

  const loadProfile = async () => {
    setError(null); // Reset lỗi trước khi gọi
    try {
      const res = await userAPI.getMe();
      const userData = res.data.data;
      console.log("Check dữ liệu tải về:", userData);

      setUser(userData);
      setTempNick(userData.nickname ? userData.nickname : "");
    } catch (err) {
      console.error("Lỗi load profile:", err);

      // Nếu lỗi 401 (chưa đăng nhập) thì đẩy về login
      if (err.response && err.response.status === 401) {
        navigate("/login");
      } else {
        // Các lỗi còn lại (mất mạng, server sập) thì hiện thông báo đẹp
        setError(
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền hoặc thử lại sau."
        );
      }
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveNickname = async () => {
    if (!tempNick.trim()) {
      alert("Vui lòng nhập biệt danh trước khi lưu!");
      return;
    }

    try {
      await userAPI.updateNickname(user.id, tempNick);
      await loadProfile();
      window.dispatchEvent(new Event("user-update"));
      alert("Đã lưu biệt danh thành công! ✅");
    } catch (err) {
      console.error(err);
      alert("Lưu thất bại. Có thể do mất kết nối Server ❌");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewAvatar(URL.createObjectURL(file));

    try {
      await userAPI.updateAvatar(user.id, file);
      setTimeout(async () => {
        await loadProfile();
        setPreviewAvatar(null);
        window.dispatchEvent(new Event("user-update"));
        alert("Cập nhật avatar thành công ✅");
      }, 800);
    } catch (err) {
      console.error("Lỗi upload avatar:", err);
      alert("Cập nhật avatar thất bại ❌");
    }
  };

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

  // --- PHẦN RENDER GIAO DIỆN ---

  // 1. Nếu có lỗi -> Hiện khung lỗi đẹp
  if (error) {
    return (
      <LayoutContainer>
        <div className={styles.container}>
          <div className={styles.errorBox}>
            <div className={styles.errorIcon}>🚫</div>
            <div className={styles.errorTitle}>Mất kết nối</div>
            <div className={styles.errorDesc}>
              {error} <br />
              Hãy chắc chắn rằng Backend đang chạy.
            </div>
            <button className={styles.retryBtn} onClick={loadProfile}>
              Thử lại
            </button>
          </div>
        </div>
      </LayoutContainer>
    );
  }

  // 2. Nếu chưa có user (đang tải) -> Hiện loading đẹp
  if (!user) {
    return (
      <LayoutContainer>
        <div className={styles.container}>
          <div className={styles.loadingBox}>
            ⏳ Đang tải thông tin hồ sơ...
          </div>
        </div>
      </LayoutContainer>
    );
  }

  // 3. Nếu có user -> Hiện giao diện chính
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

            {/* INFO */}
            <div className={styles.textInfo}>
              <div className={styles.nickRow}>
                <input
                  type="text"
                  placeholder="Đặt biệt danh..."
                  value={tempNick}
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
