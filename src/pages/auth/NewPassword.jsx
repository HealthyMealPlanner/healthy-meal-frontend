import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";
import enterPasswordImage from "../../assets/images/enter-password.svg";
import { resetPassword } from "../../services/authService";

function NewPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordIsValid = password.length >= 8;

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const canReset =
    passwordIsValid && passwordsMatch;

  const handleResetPassword = async () => {
    setError("");

    // Get email and OTP saved during the reset process
    const email = localStorage.getItem("resetEmail");
    const otp = localStorage.getItem("resetOTP");

    // Make sure the user came through the correct reset flow
    if (!email || !otp) {
      setError(
        "Reset information is missing. Please request a new reset code."
      );
      return;
    }

    // Validate password
    if (!passwordIsValid) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Validate matching passwords
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Send reset password request to the API
      const data = await resetPassword(
        email,
        otp,
        password,
        confirmPassword
      );

      console.log("Password reset successful:", data);

      // Remove temporary reset data
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOTP");
      localStorage.removeItem("otpVerified");

      // Go to success page
      navigate("/reset-success");
    } catch (error) {
      console.error("Reset password error:", error);

      setError(
        error.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4 sm:px-0">

        {/* Illustration */}
        <div className="mb-6 flex justify-center">
          <img
            src={enterPasswordImage}
            alt="Create new password"
            className="h-36 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Create New Password 🔑
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate">
            Your new password must be different
            <br />
            from previously used passwords.
          </p>
        </div>

        {/* Form */}
        <div className="mt-9 space-y-5">

          {/* New Password */}
          <div>
            <PasswordInput
              showLabel={false}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            {password.length > 0 && (
              <div className="mt-1.5 flex items-center gap-1.5 px-3">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    passwordIsValid
                      ? "bg-primary"
                      : "bg-yellow-400"
                  }`}
                />

                <span className="text-[9px] text-slate">
                  {passwordIsValid
                    ? "Good password"
                    : "Good, but could be stronger"}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <PasswordInput
              showLabel={false}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />

            {confirmPassword.length > 0 && (
              <div className="mt-1.5 px-3">

                {!passwordsMatch && (
                  <p className="text-[9px] text-red-500">
                    Passwords do not match
                  </p>
                )}

                {passwordsMatch && (
                  <div className="flex items-center gap-1 text-[9px] text-primary">
                    <Check size={10} />
                    Passwords match
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-500">
              {error}
            </p>
          )}

        </div>

        {/* Reset Button */}
        <div className="mt-10">
          <Button
            type="button"
            onClick={handleResetPassword}
            disabled={!canReset || loading}
            className={`h-12 rounded-xl ${
              !canReset || loading
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </Button>
        </div>

      </div>
    </AuthLayout>
  );
}

export default NewPassword;