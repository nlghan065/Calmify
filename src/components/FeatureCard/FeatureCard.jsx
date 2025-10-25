import React from 'react'
import styles from './FeatureCard.module.css'

export default function FeatureCard({ title, text, icon }) {
  return (
    <div className={styles.card}>
      {icon && (
        <div className={styles.icon}>
          <img src={icon} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
