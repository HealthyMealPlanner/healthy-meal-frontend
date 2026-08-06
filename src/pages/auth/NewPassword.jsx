import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check } from "lucide-react";
import AuthLayout from "../../components/layout/AuthLayout";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";
import enterPasswordImage from "../../assets/images/enter-password.svg";

function NewPassword() {
    const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordIsValid = password.length >= 8;
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const canReset = passwordIsValid && passwordsMatch;

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Illustration */}
        <div className="mb-6 flex justify-center">
          <img
            src={enterPasswordImage}
            alt="Create new password"
            className="h-40 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Create New Password🔑
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate">
            Your new password must be different
            <br />
            from previously used passwords.
          </p>
        </div>

        {/* Form */}
        <div className="mt-9 space-y-5">
          <div>
            <PasswordInput
              showLabel={false}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {password.length > 0 && (
              <div className="mt-1.5 flex items-center gap-1.5 px-3">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    passwordIsValid ? "bg-primary" : "bg-yellow-400"
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

          <div>
            <PasswordInput
              showLabel={false}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        </div>

        {/* Reset Button */}
        <div className="mt-10">
         <Button
  type="button"
  onClick={() => {
    console.log("RESET CLICKED");
    navigate("/reset-success");
  }}
  className="h-12 rounded-xl"
>
  Reset Password
</Button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default NewPassword;