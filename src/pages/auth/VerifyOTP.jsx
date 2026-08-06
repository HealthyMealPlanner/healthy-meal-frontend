import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/common/Button";
import authenticationImage from "../../assets/images/authentication.svg";

function VerifyOTP() {
  const navigate = useNavigate();

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    // السماح بالأرقام فقط
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // الانتقال للخانة التالية تلقائيًا
    if (value && index < code.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // الرجوع للخانة السابقة عند Backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const isComplete = code.every((digit) => digit !== "");

  return (
    <AuthLayout>
      <div className="w-full">
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

        {/* OTP */}
        <div className="mt-8 flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-12 w-11 rounded-xl border border-slate/20 bg-white text-center text-lg font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="mt-5 text-center">
          <p className="text-xs text-slate">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-semibold text-primary underline"
            >
              Resend
            </button>
          </p>
        </div>

        {/* Verify */}
        <div className="mt-10">
          <Button
            type="button"
            disabled={!isComplete}
            onClick={() => navigate("/new-password")}
            className={!isComplete ? "cursor-not-allowed opacity-50" : ""}
          >
            Verify Code
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default VerifyOTP;