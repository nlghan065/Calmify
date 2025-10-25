import React from 'react'
import styles from './HeroImage.module.css'

export default function HeroImage({ src, alt }) {
  return (
    <div className={styles.imageContainer}>
      <img src={src} alt={alt} />
    </div>
  )
}
