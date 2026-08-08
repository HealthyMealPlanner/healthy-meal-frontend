import { useState } from "react";
import { Check } from "lucide-react";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}) {
  const [internalValue, setInternalValue] = useState("");

  // Supports both controlled and uncontrolled usage
  const currentValue = value !== undefined ? value : internalValue;

  const isValidEmail =
    type === "email" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue);

  const handleChange = (e) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          type={type}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`h-14 w-full rounded-xl border border-slate/20 bg-white px-4 pr-12 text-sm text-text-primary outline-none transition placeholder:text-slate/50 focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        />

        {isValidEmail && (
          <Check
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
          />
        )}
      </div>
    </div>
  );
}

export default Input;