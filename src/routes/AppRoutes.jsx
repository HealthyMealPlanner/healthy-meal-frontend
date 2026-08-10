import { Routes, Route, Navigate } from "react-router-dom";

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

import Profile from "../pages/profile/Profile";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";

function AppRoutes() {
  return (
    <Routes>
      {/* Onboarding */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Home & Explore */}
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<Explore />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/reset-success" element={<ResetSuccess />} />

      {/* Recipes */}
      <Route path="/recipes" element={<RecipesList />} />
      <Route path="/recipes/:id" element={<RecipeDetails />} />
      <Route path="/recipes/:id/cook" element={<CookingMode />} />
      <Route path="/recipes/:id/complete" element={<RecipeComplete />} />

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;