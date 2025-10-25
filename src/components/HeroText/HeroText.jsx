import React from 'react'
import styles from './HeroText.module.css'
import Button from '../Button/Button'

export default function HeroText() {
  return (
    <div className={styles.textContent}>
      <h1>Calmify lắng nghe bạn – vì chúng tôi tin rằng bên trong bạn vẫn luôn có sức mạnh để bắt đầu lại.</h1>
      <p>“Giúp bạn nhận biết sớm dấu hiệu trầm cảm, an toàn, ẩn danh và đồng hành từng ngày”</p>
      <Button label="Trải nghiệm Calmify" variant="outline" />
    </div>
  )
}
