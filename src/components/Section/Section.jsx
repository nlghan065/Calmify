import React from 'react'
import styles from './Section.module.css'

export default function Section({
  title,
  description,
  children,
  bgColor = '#fff',
  className = '' // 👈 thêm dòng này
}) {
  return (
    <section
      className={`${styles.section} ${className}`} // 👈 gộp 2 class
      style={{ backgroundColor: bgColor }}
    >
      {title && <h2 className={styles.title}>{title}</h2>}

      {description && (
        <p className={styles.description}>
          {Array.isArray(description)
            ? description.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))
            : description}
        </p>
      )}

      <div className={styles.content}>{children}</div>
    </section>
  )
}
