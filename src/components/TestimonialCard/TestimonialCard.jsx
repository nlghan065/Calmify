import React from 'react'
import styles from './TestimonialCard.module.css'

export default function TestimonialCard({ quote, author }) {
  return (
    <div className={styles.card}>
      <p>“{quote}”</p>
      <span>- {author}</span>
    </div>
  )
}
