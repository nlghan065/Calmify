/**
 * HomeIntro Section
 * -----------------
 * Mô tả: phần giới thiệu đầu trang (Hero section) của Calmify.
 * Ghi chú: chứa Navbar và HeroImage chính.
 */

import React from "react";
import styles from "./Style.module.css";
import personImg from "@/assets/images/home.png";

import Navbar from "@/components/Navbar/Navbar";
import HeroText from "@/components/HeroText/HeroText";
import HeroImage from "@/components/HeroImage/HeroImage";

export default function HomeIntro({ showNavbar = true }) {
  return (
    <>
      {showNavbar && <Navbar />}
      <section className={styles.heroSection}>
        <div className={styles.content}>
          <HeroText />
          <HeroImage src={personImg} alt="Calmify Hero" />
        </div>
      </section>
    </>
  );
}
