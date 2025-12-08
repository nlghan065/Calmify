import React, { useState } from "react";
import LayoutContainer from "@/Layout/LayoutContainer";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  // ID sinh tự động (UUID hoặc từ server)
  const [user, setUser] = useState({
    id: "USR20251208ABC", // ID cố định
    nickname: "Người dùng thân thiện",
    email: "nguyenvana@example.com",
    joinDate: "15/01/2024",
    age: 25,
    gender: "Nam",
    job: "Sinh viên",
    phone: "0123 456 789",
    address: "Hà Nội, Việt Nam",
  });

  const [editingNick, setEditingNick] = useState(false);
  const [tempNick, setTempNick] = useState(user.nickname);

  const saveNickname = () => {
    setUser({ ...user, nickname: tempNick });
    setEditingNick(false);
  };

  const [notifications, setNotifications] = useState({
    daily: true,
    weekly: true,
    testReminder: false,
    chatMessage: true,
  });

  const toggle = (key) =>
    setNotifications({ ...notifications, [key]: !notifications[key] });

  return (
    <LayoutContainer>
      <div className={styles.container}>
        {/* ===== HEADER ===== */}
        <div className={styles.headerCard}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}></div>
            <div>
              <div className={styles.nickRow}>
                {editingNick ? (
                  <>
                    <input
                      value={tempNick}
                      onChange={(e) => setTempNick(e.target.value)}
                      className={styles.nickInput}
                    />
                    <button onClick={saveNickname} className={styles.saveBtn}>
                      💾
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className={styles.nickname}>{user.nickname}</h2>
                    <button
                      onClick={() => setEditingNick(true)}
                      className={styles.editNickBtn}
                    >
                      ✏
                    </button>
                  </>
                )}
              </div>
              <p className={styles.userID}>ID: {user.id}</p>
              <p className={styles.email}>{user.email}</p>
              <p className={styles.joinDate}>Tham gia từ {user.joinDate}</p>
            </div>
          </div>
        </div>

        {/* ===== THÔNG TIN CÁ NHÂN ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Thông tin cá nhân</h3>
          <div className={styles.infoGrid}>
            <div>
              <label>Tuổi</label>
              <input value={user.age} readOnly />
            </div>
            <div>
              <label>Giới tính</label>
              <input value={user.gender} readOnly />
            </div>
            <div>
              <label>Công việc</label>
              <input value={user.job} readOnly />
            </div>
            <div>
              <label>Số điện thoại</label>
              <input value={user.phone} readOnly />
            </div>
          </div>
        </div>

        {/* ===== NOTIFICATION SETTINGS ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cài đặt thông báo</h3>

          <div className={styles.settingRow}>
            <div>
              <h4>Nhắc nhở hằng ngày</h4>
              <p>Nhận nhắc nhở ghi nhật ký mỗi ngày</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.daily}
                onChange={() => toggle("daily")}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingRow}>
            <div>
              <h4>Báo cáo tuần</h4>
              <p>Nhận tổng kết cảm xúc hằng tuần</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.weekly}
                onChange={() => toggle("weekly")}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingRow}>
            <div>
              <h4>Nhắc làm bài test</h4>
              <p>Nhắc nhở làm bài test định kỳ</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.testReminder}
                onChange={() => toggle("testReminder")}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingRow}>
            <div>
              <h4>Tin nhắn trò chuyện</h4>
              <p>Thông báo khi có tin nhắn mới</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications.chatMessage}
                onChange={() => toggle("chatMessage")}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* ===== OTHER SETTINGS ===== */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cài đặt khác</h3>

          <div className={styles.otherSetting}>
            <span>🔔</span>
            <div>
              <h4>Thông báo</h4>
              <p>Quản lý thông báo và nhắc nhở</p>
            </div>
          </div>

          <div className={styles.otherSetting}>
            <span>🔒</span>
            <div>
              <h4>Quyền riêng tư</h4>
              <p>Cài đặt bảo mật và quyền riêng tư</p>
            </div>
          </div>

          <div className={styles.otherSetting}>
            <span>⚙</span>
            <div>
              <h4>Cài đặt chung</h4>
              <p>Tùy chỉnh giao diện và ngôn ngữ</p>
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <button className={styles.logoutBtn}>🚪 Đăng xuất</button>
      </div>
    </LayoutContainer>
  );
}
