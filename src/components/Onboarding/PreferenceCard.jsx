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
      className={`flex h-[104px] w-[104px] flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
        selected
          ? "border-[#10B981] bg-white shadow-sm"
          : "border-[#E2E8F0] bg-white hover:border-[#10B981]"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          selected ? "bg-[#D1FAE5]" : "bg-[#F8FAFC]"
        }`}
      >
        <Icon
          className={`h-6 w-6 transition-colors ${
            selected ? "text-[#10B981]" : "text-[#94A3B8]"
          }`}
        />
      </div>

      <p className="mt-3 text-center text-[12px] font-medium text-[#0F172A]">
        {title}
      </p>
    </button>
  );
}

export default PreferenceCard;