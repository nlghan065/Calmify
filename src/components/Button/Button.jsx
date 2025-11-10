import React from "react";
import styles from "./Button.module.css";

export default function Button({ label, onClick, variant = "primary" }) {
  // Tạo className động dựa trên variant
  const className = styles[variant] || styles.primary;

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
