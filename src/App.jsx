import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPage from "./pages/auth/ForgotPage";
import ResetPassword from "./pages/auth/ResetPassword";
import OTPPage from "./pages/auth/OTPPage";
import HomeIntro from "./features/loading/HomeIntro";
import HighlightFeatures from "./features/loading/HighlightFeatures";
import CalmifySteps from "./features/loading/CalmifySteps";
import TestimonialsSection from "./features/loading/TestimonialsSection";
import FinalSection from "./features/loading/FinalSection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/verify-otp" element={<OTPPage />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/about" element={<HomeIntro />} />
        <Route path="/features" element={<HighlightFeatures />} />
        <Route path="/journey" element={<CalmifySteps />} />
        <Route path="/feedback" element={<TestimonialsSection />} />
        <Route path="/start" element={<FinalSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
