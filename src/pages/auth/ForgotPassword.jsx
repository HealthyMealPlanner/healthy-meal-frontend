import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import forgotPasswordImage from "../../assets/images/forgot-password.svg";

function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Illustration */}
        <div className="mb-6 flex justify-center">
          <img
            src={forgotPasswordImage}
            alt="Forgot password"
            className="h-36 w-auto object-contain"
          />
        </div>

        {/* Title & Description */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Forgot Password?
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate">
            No worries! Enter your registered email
            <br />
            address and we'll send you a code to
            <br />
            reset it.
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder="Enter your registered email"
            icon={Mail}
          />
        </div>

        {/* Send Reset Code */}
        <Button
          type="button"
          onClick={() => navigate("/verify-otp")}
        >
          Send Reset Code
        </Button>

        {/* Back to Login */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-slate/30" />
          <span className="text-sm text-slate">or</span>
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