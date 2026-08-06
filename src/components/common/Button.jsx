function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark",
    secondary:
      "bg-white text-text-primary border border-slate/20 hover:bg-slate/5",
  };

  return (
    <button
      type={type}
      className={`flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;