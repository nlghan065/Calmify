import React, { useEffect, useState } from "react";
import useFullpage from "@/hooks/useFullpage";
import { homeSections } from "@/features/loading/Home.config";

import HomeIntro from "@/features/loading/HomeIntro";
import HighlightFeatures from "@/features/loading/HighlightFeatures";
import TestimonialsSection from "@/features/loading/TestimonialsSection";
import CalmifySteps from "@/features/loading/CalmifySteps";
import FinalSection from "@/features/loading/FinalSection";

import { FullpageContext } from "@/context/FullpageContext";

export default function Loading() {
  const [fullpageAPI, setFullpageAPI] = useState(null);

  const fullpageRef = useFullpage({
    anchors: homeSections.map((s) => s.id),
    navigationTooltips: homeSections.map((s) => s.tooltip),
    scrollingSpeed: 700,
    afterRender: () => {
      console.log("✅ Fullpage.js khởi tạo xong!");
      // Lưu instance vào state để truyền cho Navbar
      setFullpageAPI(window.fullpage_api);
    },
  });

  useEffect(() => {
    if (!fullpageRef.current) {
      console.warn("⚠️ Fullpage chưa được khởi tạo đúng cách.");
    }
  }, [fullpageRef]);

  return (
    // 👇 Chỉ truyền context khi fullpageAPI sẵn sàng
    <FullpageContext.Provider value={fullpageAPI}>
      <div id="fullpage">
        <div className="section" data-anchor="intro">
          <HomeIntro />
        </div>

        <div className="section" data-anchor="features">
          <HighlightFeatures />
        </div>

        <div className="section" data-anchor="calmifysteps">
          <CalmifySteps />
        </div>

        <div className="section" data-anchor="testimonials">
          <TestimonialsSection />
        </div>

        <div className="section" data-anchor="final">
          <FinalSection />
        </div>
      </div>
    </FullpageContext.Provider>
  );
}
