import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./pages/Loading";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPage from "./pages/auth/ForgotPage";
import ResetPassword from "./pages/auth/ResetPassword";
import OTPPage from "./pages/auth/OTPPage";

import Home from "./pages/Home";
import ChatAI from "./pages/chat/ChatAI";

import TestInfoPHQ9 from "./pages/test-PHQ9/TestInfoPHQ9";
import TestPHQ9 from "./pages/test-PHQ9/TestPHQ9";
import ResultPHQ9 from "./pages/test-PHQ9/ResultPHQ9";

import EmotionDiary from "./pages/emotional/EmotionDiary";
import StatisticsPage from "./pages/statistics/StatisticsPage";

import MethodsPage from "./pages/methods/MethodsPage";
import MethodDetailPage from "./pages/methods/MethodDetailPage";
import LessonDetailPage from "./pages/methods/LessonDetailPage";

import SupportCentersPage from "./pages/hotline/SupportCentersPage";

import ProfilePage from "./pages/profile/ProfilePage";

import Category from "./pages/test/Category";
import TestInfo from "./pages/test/TestInfo";
import TestStart from "./pages/test/TestStart";
import Result from "./pages/test/Result";
import DemoPlacementUI from "./pages/test";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang loading / home */}
        <Route path="/" element={<DemoPlacementUI />} />

        <Route path="/home" element={<Home />} />
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/verify-otp" element={<OTPPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/chat" element={<ChatAI />} />

        <Route path="/test-info-phq9" element={<TestInfoPHQ9 />} />
        <Route path="/test-phq9" element={<TestPHQ9 />} />
        <Route path="/result-phq9" element={<ResultPHQ9 />} />

        <Route path="/category" element={<Category />} />
        <Route path="/test-info/:id" element={<TestInfo />} />
        <Route path="/test-start/:id" element={<TestStart />} />
        <Route path="/result/:id" element={<Result />} />

        <Route path="/emotional" element={<EmotionDiary />} />
        <Route path="/statistics" element={<StatisticsPage />} />

        <Route path="/methods" element={<MethodsPage />} />
        <Route path="/detail/:methodId" element={<MethodDetailPage />} />
        <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
        <Route path="/hotline" element={<SupportCentersPage />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      {/* Toast container để hiển thị thông báo */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover={true}
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
