import { Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "../pages/SplashScreen";
import Onboarding from "../pages/Onboarding";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import NewPassword from "../pages/auth/NewPassword";
import ResetSuccess from "../pages/auth/ResetSuccess";

function AppRoutes() {
  return (
    <Routes>
      {/* Onboarding */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/reset-success" element={<ResetSuccess />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;