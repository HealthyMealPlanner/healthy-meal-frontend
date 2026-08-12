import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PasswordInput from "../../components/common/PasswordInput";
import SocialButton from "../../components/common/SocialButton";
import logo from "../../assets/images/logo.svg";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log("Login successful:", data);

      const token = data?.token || data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }

      // Existing user:
      // Login → Home directly
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4 sm:px-0">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={logo}
            alt="Healthy Meal Planner"
            className="h-20 w-20 object-contain"
          />
        </div>

        {/* Welcome */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Welcome Back! 👋
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate sm:text-base">
            Sign in to access your saved recipes, pantry items, and expert
            chats.
          </p>
        </div>

        {/* Login / Create Account */}
        <div className="mt-8 flex rounded-xl bg-slate/10 p-1">
          <button
            type="button"
            className="w-1/2 rounded-lg bg-white py-3 text-sm font-medium text-text-primary shadow-sm"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-1/2 rounded-lg py-3 text-sm font-medium text-slate transition hover:text-text-primary"
          >
            Create Account
          </button>
        </div>

        {/* Login Form */}
        <form
          className="mt-6"
          onSubmit={handleLogin}
        >
          {/* Email */}
          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate/40"
            />

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 pl-11"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Forgot Password */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium text-primary"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="mt-6 h-14"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate/20" />

          <span className="whitespace-nowrap text-sm text-slate">
            or continue with
          </span>

          <div className="h-px flex-1 bg-slate/20" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3 sm:gap-4">
          <SocialButton provider="google" />
          <SocialButton provider="apple" />
          <SocialButton provider="facebook" />
        </div>

        {/* Create Account */}
        <p className="mt-7 pb-4 text-center text-sm text-slate">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-medium text-primary underline underline-offset-2"
          >
            Create one
          </button>
        </p>

      </div>
    </AuthLayout>
  );
}

export default Login;