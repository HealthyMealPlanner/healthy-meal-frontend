import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PasswordInput from "../../components/common/PasswordInput";
import SocialButton from "../../components/common/SocialButton";
import logo from "../../assets/images/logo.svg";
function Login() {
  const navigate = useNavigate();

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
        <form className="mt-6">

          {/* Email */}
          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate/40"
            />

            <Input
              type="email"
              placeholder="Enter your email"
              className="h-14 pl-11"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <PasswordInput />
          </div>

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
          <Button type="submit" className="mt-6 h-14">
            Login
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