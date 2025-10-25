import React from "react";
import styles from "./Style.module.css";
import plantImg from "@/assets/images/plant.jpg";
const CalmifySteps = () => {
  return (
    <section className={styles.container}>
      {/* Cột trái - nội dung */}
      <div className={styles.left}>
        <h2 className={styles.title}>
          Bắt đầu nhỏ – Hiệu quả to <br />
          Calmify cùng bạn đi qua từng bước hiểu chính mình.
        </h2>
        <p className={styles.quote}>
          “Tự kiểm tra cảm xúc, nói chuyện cùng AI và theo dõi tâm trạng – mọi
          thứ bạn cần để thấu hiểu bản thân mỗi ngày, đều ở đây.”
        </p>

        <img src={plantImg} alt="Calmify plant" className={styles.plant} />
      </div>

      {/* Cột phải - sơ đồ bước */}
      <div className={styles.right}>
        <div className={styles.stepLine}></div>

        <div className={styles.step}>
          <div className={`${styles.shape} ${styles.greenCircle}`}></div>
          <div>
            <p className={styles.stepTitle}>“Hiểu bản thân”</p>
            <p className={styles.stepDesc}>Để tiến về phía trước</p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={`${styles.shape} ${styles.yellowDiamond}`}></div>
          <div>
            <p className={styles.stepTitle}>TEST</p>
            <p className={styles.stepDesc}>
              “Dành vài phút để biết thêm về mình”
            </p>
          </div>
        </div>

        <div className={styles.step}>
          <div className={`${styles.shape} ${styles.orangeCircle}`}></div>
          <div>
            <p className={styles.stepTitle}>AI</p>
            <p className={styles.stepDesc}>
              “Không ai biết bạn – chỉ lắng nghe bạn”
            </p>
          </div>
        </div>

        <p className={styles.footerText}>
          “Chỉ cần một bước – Calmify sẽ cùng bạn.”
        </p>
      </div>
    </section>
  );
};

export default CalmifySteps;
