import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";

import SplashScreen from "../pages/SplashScreen";
import Onboarding from "../pages/Onboarding";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOTP";
import NewPassword from "../pages/auth/NewPassword";
import ResetSuccess from "../pages/auth/ResetSuccess";

import RecipesList from "../pages/recipes/RecipesList";
import RecipeDetails from "../pages/recipes/RecipeDetails";
import CookingMode from "../pages/recipes/CookingMode";
import RecipeComplete from "../pages/recipes/RecipeComplete";

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

      {/* Recipes */}
      <Route path="/recipes" element={    <AuthLayout><RecipesList /></AuthLayout>} />
      <Route path="/recipes/:id" element={    <AuthLayout><RecipeDetails /></AuthLayout>} />
      <Route path="/recipes/:id/cook" element={    <AuthLayout><CookingMode /></AuthLayout>} />
      <Route path="/recipes/:id/complete" element={    <AuthLayout><RecipeComplete /></AuthLayout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;