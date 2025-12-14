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

  useEffect(() => {
    const fetchUserData = async () => {
      // --- FIX LỖI 401 ---
      // Kiểm tra xem có token không. Nếu không có (chưa đăng nhập) thì dừng luôn.
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await userAPI.getMe();
        const user = res.data.data;
        if (user) {
          if (user.nickname) setDisplayName(user.nickname);
          if (user.avatarUrl) {
            let finalUrl = user.avatarUrl;
            if (!finalUrl.startsWith("http")) {
              const cleanPath = finalUrl.startsWith("/")
                ? finalUrl
                : `/${finalUrl}`;
              finalUrl = `${getBackendRoot()}${cleanPath}`;
            }
            setAvatarUrl(finalUrl);
          }
        }
      } catch (err) {
        // Lỗi này thường do token hết hạn, không cần log đỏ lòm làm rối mắt
        // console.error("Header: Không tải được thông tin user");
      }
    };
    fetchUserData();
  }, []); // Chạy 1 lần khi mount

  // Đóng menu khi click ra ngoài
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
    localStorage.clear(); // Xóa token
    setAvatarUrl(null); // Reset state
    setDisplayName("bạn");
    navigate("/login"); // Chuyển trang
  };

  return (
    <header className={styles.header}>
      <div>
        <h2 style={{ textTransform: "capitalize" }}>
          Chào mừng {displayName} trở lại!
        </h2>
        <p>Sẵn sàng cho một ngày mới thật bình yên chưa?</p>
      </div>

      <div className={styles.profileContainer} ref={menuRef}>
        {/* Avatar Trigger */}
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

        {/* Dropdown Menu */}
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
