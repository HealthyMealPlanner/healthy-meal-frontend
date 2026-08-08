import { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const data = await forgotPassword(trimmedEmail);

      console.log("Forgot password successful:", data);

      // Save email so Verify OTP can use it
      localStorage.setItem("resetEmail", trimmedEmail);

      // Go to OTP page
      navigate("/verify-otp");
    } catch (error) {
      console.error("Forgot password error:", error);

      setError(
        error.message || "Failed to send reset code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4 sm:px-0">

        {/* Icon / Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Mail
              size={42}
              className="text-primary"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Forgot Password?
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate sm:text-base">
            No worries! Enter your registered email
            <br />
            address and we'll send you a code to
            <br />
            reset it.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleForgotPassword}>

          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Enter your registered email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Send Reset Code */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-6 h-14"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-slate/30" />

          <span className="text-sm text-slate">
            or
          </span>

          <span className="h-px w-12 bg-slate/30" />
        </div>

        <p className="mt-4 text-center text-sm text-slate">
          Back to{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-text-primary underline"
          >
            Sign In
          </button>
        </p>

      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;