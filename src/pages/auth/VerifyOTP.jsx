import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/common/Button";
import authenticationImage from "../../assets/images/authentication.svg";
import {
  verifyOTP,
  forgotPassword,
} from "../../services/authService";

function VerifyOTP() {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // =========================
  // OTP Input Change
  // =========================
  const handleChange = (value, index) => {
    // السماح بالأرقام فقط
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);
    setError("");
    setSuccess("");

    // الانتقال للخانة التالية تلقائيًا
    if (value && index < code.length - 1) {
      document
        .getElementById(`otp-${index + 1}`)
        ?.focus();
    }
  };

  // =========================
  // Backspace
  // =========================
  const handleKeyDown = (e, index) => {
    // الرجوع للخانة السابقة عند Backspace
    if (
      e.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      document
        .getElementById(`otp-${index - 1}`)
        ?.focus();
    }
  };

  // =========================
  // Verify OTP
  // =========================
  const handleVerify = async () => {
    setError("");
    setSuccess("");

    const otp = code.join("");

    // الحصول على الإيميل المحفوظ من Forgot Password
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      setError(
        "Email not found. Please request a new reset code."
      );
      return;
    }

    if (otp.length !== 6) {
      setError(
        "Please enter the complete verification code."
      );
      return;
    }

    setLoading(true);

    try {
      // إرسال email + otp للـ API
      const data = await verifyOTP(email, otp);

      console.log(
        "OTP verified successfully:",
        data
      );

      // حفظ بيانات إعادة تعيين كلمة المرور
      localStorage.setItem("resetEmail", email);
      localStorage.setItem("resetOTP", otp);
      localStorage.setItem(
        "otpVerified",
        "true"
      );

      // الانتقال لإنشاء كلمة المرور الجديدة
      navigate("/new-password");
    } catch (error) {
      console.error(
        "Verify OTP error:",
        error
      );

      setError(
        error.message ||
          "Invalid verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Resend OTP
  // =========================
  const handleResend = async () => {
    setError("");
    setSuccess("");

    // الحصول على الإيميل المحفوظ
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      setError(
        "Email not found. Please go back and enter your email again."
      );
      return;
    }

    setResendLoading(true);

    try {
      // استخدام نفس Forgot Password API
      // لإرسال OTP جديد
      const data = await forgotPassword(email);

      console.log(
        "OTP resent successfully:",
        data
      );

      // مسح OTP القديم
      setCode(["", "", "", "", "", ""]);

      // إزالة OTP القديم من localStorage
      localStorage.removeItem("resetOTP");
      localStorage.removeItem("otpVerified");

      // رسالة نجاح
      setSuccess(
        "A new verification code has been sent to your email."
      );

      // وضع الـ focus على أول خانة
      setTimeout(() => {
        document
          .getElementById("otp-0")
          ?.focus();
      }, 100);

    } catch (error) {
      console.error(
        "Resend OTP error:",
        error
      );

      setError(
        error.message ||
          "Failed to resend the verification code."
      );
    } finally {
      setResendLoading(false);
    }
  };

  const isComplete = code.every(
    (digit) => digit !== ""
  );

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4 sm:px-0">

        {/* Illustration */}
        <div className="mb-6 flex justify-center">
          <img
            src={authenticationImage}
            alt="Verify email"
            className="h-36 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Check Your Email
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate">
            We've sent a verification code to
            <br />
            your registered email address.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="mt-8 flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  index
                )
              }
              className="h-12 w-11 rounded-xl border border-slate/20 bg-white text-center text-lg font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="mt-4 text-center text-sm text-primary">
            {success}
          </p>
        )}

        {/* Resend */}
        <div className="mt-5 text-center">
          <p className="text-xs text-slate">
            Didn't receive the code?{" "}

            <button
              type="button"
              onClick={handleResend}
              disabled={
                resendLoading ||
                loading
              }
              className={`font-semibold text-primary underline ${
                resendLoading ||
                loading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {resendLoading
                ? "Sending..."
                : "Resend"}
            </button>
          </p>
        </div>

        {/* Verify Button */}
        <div className="mt-10">
          <Button
            type="button"
            disabled={
              !isComplete ||
              loading ||
              resendLoading
            }
            onClick={handleVerify}
            className={
              !isComplete ||
              loading ||
              resendLoading
                ? "cursor-not-allowed opacity-50"
                : ""
            }
          >
            {loading
              ? "Verifying..."
              : "Verify Code"}
          </Button>
        </div>

      </div>
    </AuthLayout>
  );
}

export default VerifyOTP;