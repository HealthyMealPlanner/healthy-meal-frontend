import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

function PasswordInput({
  label = "Password",
  showLabel = true,
  placeholder = "Enter your password",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {showLabel && (
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <div className="relative">
        <KeyRound
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="h-14 w-full rounded-xl border border-slate/20 bg-white px-4 pl-11 pr-12 text-sm text-text-primary outline-none transition placeholder:text-slate/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate/40 transition hover:text-slate"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;