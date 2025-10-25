import React from 'react'
import styles from './Navbar.module.css'
import Button from '../Button/Button'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Calmify</div>
      <ul className={styles.navLinks}>
        <li>Giới thiệu</li>
        <li>Tính năng</li>
        <li>Cảm nhận</li>
        <li>Bảo mật</li>
        <li>Góc cảm xúc</li>
      </ul>
      <Button label="Trải nghiệm Calmify" />
    </nav>
  )
}
