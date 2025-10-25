/**
 * HomePage.jsx
 * -------------
 * Mô tả: trang chính của Calmify, kết hợp các section (Intro, Features, Testimonials)
 * và quản lý hành vi scroll toàn trang bằng fullpage.js.
 *
 * Ghi chú:
 * - Cần đảm bảo phần tử #fullpage tồn tại trong DOM.
 * - Thứ tự section phải trùng với cấu hình trong home.config.js.
 */

import React, { useEffect } from "react";
import useFullpage from "@/hooks/useFullpage";
import { homeSections } from "@/features/loading/Home.config";

import HomeIntro from "@/features/loading/HomeIntro";
import HighlightFeatures from "@/features/loading/HighlightFeatures";
import TestimonialsSection from "@/features/loading/TestimonialsSection";
import CalmifySteps from "@/features/loading/CalmifySteps";

export default function Loading() {
  // Khởi tạo fullpage.js khi trang load
  const fullpageRef = useFullpage({
    anchors: homeSections.map((s) => s.id),
    navigationTooltips: homeSections.map((s) => s.tooltip),
    scrollingSpeed: 700,
  });

  // Kiểm tra sau khi khởi tạo (debug hoặc để hiển thị log)
  useEffect(() => {
    if (!fullpageRef.current) {
      console.warn(" Fullpage chưa được khởi tạo đúng cách.");
    }
  }, [fullpageRef]);

  return (
    <div id="fullpage">
      {/* Section: Giới thiệu */}
      <div className="section" data-anchor="intro">
        <HomeIntro />
      </div>

      {/* Section: Tính năng */}
      <div className="section" data-anchor="features">
        <HighlightFeatures />
      </div>

      {/* Section: Cảm nhận */}
      <div className="section" data-anchor="testimonials">
        <TestimonialsSection />
      </div>

      <div className="section" data-anchor="calmifysteps">
        <CalmifySteps />
      </div>
    </div>
  );
}
