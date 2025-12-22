import React, { useEffect, useState, useRef } from "react";
import styles from "./Layout.module.css";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { userAPI } from "@/api/user/userAPI";
import { useNavigate } from "react-router-dom";

export default function HeaderBar() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [displayName, setDisplayName] = useState("bạn");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const getBackendRoot = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return apiUrl.replace(/\/api$/, "");
  };

  // Hàm này tách ra để có thể gọi lại bất cứ lúc nào

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await userAPI.getMe();
      const user = res.data.data;
      if (user) {
        // --- SỬA ĐOẠN NÀY ---
        // Nếu có nickname thì hiện, nếu user xóa nickname (null/empty) thì hiện "bạn"
        setDisplayName(user.nickname || "bạn");
        // --------------------

        if (user.avatarUrl) {
          let finalUrl = user.avatarUrl;
          if (!finalUrl.startsWith("http")) {
            const cleanPath = finalUrl.startsWith("/")
              ? finalUrl
              : `/${finalUrl}`;
            finalUrl = `${getBackendRoot()}${cleanPath}`;
          }
          // Thêm timestamp để ép trình duyệt load ảnh mới nhất
          setAvatarUrl(`${finalUrl}?t=${new Date().getTime()}`);
        }
      }
    } catch (err) {
      // Silent error
    }
  };

  useEffect(() => {
    // 1. Gọi lần đầu khi component mount
    fetchUserData();

    // 2. Lắng nghe sự kiện "user-update" từ các nơi khác (như trang Profile)
    const handleUserUpdate = () => {
      fetchUserData();
    };

    window.addEventListener("user-update", handleUserUpdate);

    // 3. Dọn dẹp sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("user-update", handleUserUpdate);
    };
  }, []);

  // ... (Phần code xử lý click outside và logout giữ nguyên) ...
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAvatarUrl(null);
    setDisplayName("bạn");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      {/* ... Phần JSX hiển thị giữ nguyên ... */}
      <div>
        <h2 style={{ textTransform: "capitalize" }}>
          Chào mừng {displayName} trở lại!
        </h2>
        <p>Sẵn sàng cho một ngày mới thật bình yên chưa?</p>
      </div>

      <div className={styles.profileContainer} ref={menuRef}>
        <div onClick={() => setIsOpen(!isOpen)} title="Tài khoản">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className={styles.headerAvatar}
              onError={(e) => {
                e.target.style.display = "none";
                setAvatarUrl(null);
              }}
            />
          ) : (
            <UserOutlined className={styles.avatar} />
          )}
        </div>

        {isOpen && (
          <div className={styles.dropdownMenu}>
            <div
              className={styles.dropdownItem}
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              <ProfileOutlined /> Hồ sơ cá nhân
            </div>

            <div
              className={`${styles.dropdownItem} ${styles.logoutItem}`}
              onClick={handleLogout}
            >
              <LogoutOutlined /> Đăng xuất
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
