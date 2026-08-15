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
import ProtectedRoute from "./ProtectedRoute";
function AppRoutes() {
  return (
    <Routes>

  {/* Public */}
  <Route path="/" element={<SplashScreen />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/onboarding" element={<Onboarding />} />

  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/verify-otp" element={<VerifyOTP />} />
  <Route path="/new-password" element={<NewPassword />} />
  <Route path="/reset-success" element={<ResetSuccess />} />

  {/* Protected */}
  <Route element={<ProtectedRoute />}>
    <Route path="/home" element={<Home />} />
    <Route path="/explore" element={<Explore />} />

    <Route path="/recipes" element={<RecipesList />} />
    <Route path="/recipes/:id" element={<RecipeDetails />} />
    <Route path="/recipes/:id/cook" element={<CookingMode />} />
    <Route path="/recipes/:id/complete" element={<RecipeComplete />} />

    <Route path="/profile" element={<Profile />} />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<Navigate to="/" replace />} />

</Routes>
  );
}

export default AppRoutes;