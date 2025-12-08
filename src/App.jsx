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
import TestInfoPHQ9 from "./pages/test-PHQ9/TestInfoPHQ9";
import TestPHQ9 from "./pages/test-PHQ9/TestPHQ9";
import Test2PHQ9 from "./pages/test-PHQ9/Test2PHQ9";
import ResultPHQ9 from "./pages/test-PHQ9/ResultPHQ9";
import Home from "./pages/Home";
import ChatAI from "./pages/chat/ChatAI";
import TestInfo from "./pages/test/TestInfo";
import Category from "./pages/test/Category";
import Test1 from "./pages/test/Test1";
import Test2 from "./pages/test/Test2";
import Result from "./pages/test/Result";
import EmotionDiary from "./pages/emotional/EmotionDiary";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import MethodsPage from "./pages/methods/MethodsPage";
import MethodDetailPage from "./pages/methods/MethodDetailPage";
import LessonDetailPage from "./pages/methods/LessonDetailPage";
import SupportCentersPage from "./pages/hotline/SupportCentersPage";
import ProfilePage from "./pages/profile/ProfilePage";

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
        <Route path="/test-info-phq9" element={<TestInfoPHQ9 />} />
        <Route path="/test-phq9" element={<TestPHQ9 />} />
        <Route path="/test2-phq9" element={<Test2PHQ9 />} />
        <Route path="/result-phq9" element={<ResultPHQ9 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatAI />} />
        <Route path="/test-info" element={<TestInfo />} />
        <Route path="/category" element={<Category />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/result" element={<Result />} />
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
