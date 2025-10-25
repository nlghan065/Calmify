import React from 'react'
import styles from './Button.module.css'

export default function Button({ label, onClick, variant = 'primary' }) {
  const className = variant === 'outline' ? styles.outline : styles.primary
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  )
}
