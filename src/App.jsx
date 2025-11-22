import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPage from "./pages/auth/ForgotPage";
import ResetPassword from "./pages/auth/ResetPassword";
import OTPPage from "./pages/auth/OTPPage";
import TestInfo from "./pages/test/TestInfo";
import Test from "./pages/test/Test";
import Test2 from "./pages/test/Test2";
import Result from "./pages/test/Result";
import Home from "./pages/Home";
import ChatAI from "./pages/ChatAI";

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
        <Route path="/test-info" element={<TestInfo />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/result" element={<Result />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<ChatAI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
