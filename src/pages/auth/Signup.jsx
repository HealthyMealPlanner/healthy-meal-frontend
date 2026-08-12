import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Mail, Check, AlertCircle } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PasswordInput from "../../components/common/PasswordInput";
import SocialButton from "../../components/common/SocialButton";
import logo from "../../assets/images/logo.svg";
import { registerUser } from "../../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Validation
  // =========================

  const isNameValid = name.trim().length > 0;

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const isPasswordValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar;

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  // =========================
  // Password strength
  // =========================

  const getPasswordStrength = () => {
    if (!password) {
      return null;
    }

    const score = [
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    ].filter(Boolean).length;

    if (score <= 2) {
      return {
        label: "Too weak",
        color: "text-red-500",
        dot: "bg-red-500",
      };
    }

    if (score <= 4) {
      return {
        label: "Good, but could be stronger",
        color: "text-yellow-600",
        dot: "bg-yellow-400",
      };
    }

    return {
      label: "Strong password",
      color: "text-primary",
      dot: "bg-primary",
    };
  };

  const passwordStrength = getPasswordStrength();

  // =========================
  // Handle Signup
  // =========================

  const handleSignup = async () => {
    setError("");

    if (!isNameValid) {
      setError("Please enter your name.");
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid) {
      setError(
        "Password must be at least 8 characters and include an uppercase letter, a number, and a special character."
      );
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        fullName: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });

      console.log("Registration successful:", data);

      // ==========================================
      // Save token if registration API returns it
      // ==========================================

      const token =
        data?.token ||
        data?.accessToken ||
        data?.data?.token ||
        data?.data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }

      // ==========================================
      // New Account Flow
      // Signup → Onboarding → Home
      // ==========================================

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error?.message ||
          "Registration failed. Please check your information and try again."
      );
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

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Save Your Preferences
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate sm:text-base">
            Create an account to save your customized
            <br />
            budget, meal plans, and chat history.
          </p>
        </div>

        {/* Login / Create Account */}
        <div className="mt-8 flex rounded-xl bg-slate/10 p-1">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-1/2 rounded-lg py-3 text-sm font-medium text-slate transition hover:text-text-primary"
          >
            Login
          </button>

          <button
            type="button"
            className="w-1/2 rounded-lg bg-white py-3 text-sm font-medium text-text-primary shadow-sm"
          >
            Create Account
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* Name */}
          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate/40"
            />

            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="h-14 pl-11 pr-11"
            />

            {isNameValid && (
              <Check
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
              />
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate/40"
            />

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="h-14 pl-11 pr-11"
            />

            {isEmailValid && (
              <Check
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
              />
            )}
          </div>

          {/* Password */}
          <div>
            <PasswordInput
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            {passwordStrength && (
              <p
                className={`mt-1 flex items-center gap-1 text-[10px] ${passwordStrength.color}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${passwordStrength.dot}`}
                />

                {passwordStrength.label}
              </p>
            )}

            {/* Password requirements */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1 text-[10px]">
                <PasswordRequirement
                  valid={hasMinLength}
                  text="At least 8 characters"
                />

                <PasswordRequirement
                  valid={hasUppercase}
                  text="At least one uppercase letter"
                />

                <PasswordRequirement
                  valid={hasNumber}
                  text="At least one number"
                />

                <PasswordRequirement
                  valid={hasSpecialChar}
                  text="At least one special character"
                />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />

            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="mt-1 flex items-center gap-1 text-[10px] text-red-500">
                <AlertCircle size={11} />
                Passwords do not match
              </p>
            )}

            {passwordsMatch && (
              <p className="mt-1 flex items-center gap-1 text-[10px] text-primary">
                <Check size={11} />
                Passwords match
              </p>
            )}
          </div>

          {/* Create Account */}
          <Button
            type="button"
            className="h-14"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate/20" />

          <span className="whitespace-nowrap text-sm text-slate">
            or continue with
          </span>

          <div className="h-px flex-1 bg-slate/20" />
        </div>

        {/* Social */}
        <div className="flex gap-3 sm:gap-4">
          <SocialButton provider="google" />
          <SocialButton provider="apple" />
          <SocialButton provider="facebook" />
        </div>

        {/* Login */}
        <p className="mt-5 pb-4 text-center text-sm text-slate">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-primary underline underline-offset-2"
          >
            Login
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

function PasswordRequirement({ valid, text }) {
  return (
    <div
      className={`flex items-center gap-1.5 ${
        valid ? "text-primary" : "text-slate"
      }`}
    >
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
          valid ? "bg-primary text-white" : "border border-slate/30"
        }`}
      >
        {valid && <Check size={9} strokeWidth={3} />}
      </span>

      <span>{text}</span>
    </div>
  );
}

export default Signup;