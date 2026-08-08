function PreferenceCard({
  title,
  icon: Icon,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[70px] w-full flex-col items-start justify-center rounded-[14px] border px-3 py-2.5 text-left transition-all duration-200 sm:min-h-[72px] ${
        selected
          ? "border-[#10B981] bg-white shadow-sm"
          : "border-[#E2E8F0] bg-white hover:border-[#10B981]"
      }`}
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          selected ? "bg-[#D1FAE5]" : "bg-[#F1F5F9]"
        }`}
      >
        {Icon && (
          <Icon
            className={`h-4 w-4 ${
              selected ? "text-[#10B981]" : "text-[#94A3B8]"
            }`}
          />
        )}
      </div>

      <p className="mt-1.5 text-[10px] font-medium leading-[13px] text-[#0F172A] sm:text-[11px]">
        {title}
      </p>
    </button>
  );
}

export default PreferenceCard;