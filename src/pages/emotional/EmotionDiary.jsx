import { useState } from "react";
import styles from "./EmotionDiary.module.css";
import LayoutContainer from "@/Layout/LayoutContainer";
import EmotionCheck from "@/components/Dashboard/EmotionCheck";

export default function EmotionDiary() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([
    {
      emotion: "😊",
      title: "Ổn áp",
      date: "15/01/2024",
      content: "Hôm nay là một ngày tuyệt vời!",
    },
    {
      emotion: "😊",
      title: "Ổn áp",
      date: "15/01/2024",
      content: "Hôm nay là một ngày tuyệt vời!",
    },
  ]);

  const handleSave = () => {
    if (!selectedEmotion || !content.trim()) return;

    const newNote = {
      emotion: selectedEmotion.icon,
      title: selectedEmotion.label,
      date: new Date().toLocaleDateString("vi-VN"),
      content,
    };

    setNotes([newNote, ...notes]);
    setSelectedEmotion(null);
    setContent("");
    setShowForm(false);
  };

  return (
    <LayoutContainer>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2>Nhật ký cảm xúc</h2>

          <button
            className={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Thu gọn ↑" : "+ Thêm"}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className={styles.form}>
            {/* ✅ HEADER TRONG FORM */}
            <div className={styles.formHeader}>
              <h3>Ghi lại cảm xúc của bạn để hiểu bản thân hơn nhé!</h3>
              <p>
                Hãy chọn mức độ cảm xúc và viết xuống những điều bạn đang nghĩ.
              </p>
            </div>

            <EmotionCheck
              mode="picker"
              value={selectedEmotion?.icon}
              onChange={(emo) => setSelectedEmotion(emo)}
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Hôm nay của bạn thế nào?"
            />

            <div className={styles.actions}>
              <button onClick={handleSave}>Lưu</button>
              <button
                className={styles.cancel}
                onClick={() => {
                  setShowForm(false);
                  setSelectedEmotion(null);
                  setContent("");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* LIST */}
        <div className={styles.list}>
          {notes.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{item.emotion}</div>
              <div>
                <h4>
                  {item.title} <span>{item.date}</span>
                </h4>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
