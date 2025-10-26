import React from "react";
import { Star } from "lucide-react";
import styles from "./TestimonialCard.module.css";

export default function TestimonialCard({ img, quote, author, rating = 5 }) {
  return (
    <div className={styles.card}>
      <img src={img} alt={author} className={styles.avatar} />
      <h3 className={styles.author}>{author}</h3>
      <p className={styles.quote}>“{quote}”</p>

      <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? styles.starFilled : styles.starEmpty}
          />
        ))}
      </div>
    </div>
  );
}
