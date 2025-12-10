import { useState, useEffect } from "react";
import styles from "./EmotionDiary.module.css";
import LayoutContainer from "@/Layout/LayoutContainer";
import EmotionCheck from "@/components/Dashboard/EmotionCheck";
import { createDiaryNote, getDiaryNotes } from "@/api/emotion/emotionAPI";
import { toast } from "react-toastify";

export default function EmotionDiary() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Load danh sách nhật ký
  const fetchNotes = async () => {
    try {
      const data = await getDiaryNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải nhật ký!");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async () => {
    if (!selectedEmotion || !note.trim()) {
      toast.error("Bạn chưa chọn cảm xúc hoặc viết nội dung!");
      return;
    }

    // payload đúng BE: { mood, note }
    const payload = {
      mood: selectedEmotion.icon,
      note: note.trim(),
    };

    try {
      await createDiaryNote(payload);
      toast.success("Đã lưu nhật ký!");
      setShowForm(false);
      setSelectedEmotion(null);
      setNote("");
      fetchNotes(); // cập nhật danh sách mới
    } catch (err) {
      console.error(err);
      toast.error("Lưu thất bại!");
    }
  };

  return (
    <LayoutContainer>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Nhật ký cảm xúc</h2>
          <button
            className={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
            type="button"
          >
            {showForm ? "Thu gọn ↑" : "+ Thêm"}
          </button>
        </div>

        {showForm && (
          <div className={styles.form}>
            <div className={styles.formHeader}>
              <h3>Ghi lại cảm xúc của bạn để hiểu bản thân hơn nhé!</h3>
            </div>

            <EmotionCheck
              mode="picker"
              onChange={(emo) => setSelectedEmotion(emo)}
            />

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hôm nay của bạn thế nào?"
            />

            <div className={styles.actions}>
              <button type="button" onClick={handleSave}>
                Lưu
              </button>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  setShowForm(false);
                  setSelectedEmotion(null);
                  setNote("");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className={styles.list}>
          {notes.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{item.mood}</div>
              <div>
                <p>{item.note}</p>
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
