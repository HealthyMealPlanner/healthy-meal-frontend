import { Check } from "lucide-react";

function OptionCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[64px] w-full items-center rounded-[14px] border px-3 py-2.5 text-left transition-all duration-200 sm:min-h-[66px] sm:px-3.5 ${
        selected
          ? "border-[#10B981] bg-white shadow-sm"
          : "border-[#E2E8F0] bg-white hover:border-[#10B981]"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          selected ? "bg-[#D1FAE5]" : "bg-[#F1F5F9]"
        }`}
      >
        {Icon && (
          <Icon
            className={`h-[16px] w-[16px] ${
              selected ? "text-[#10B981]" : "text-[#94A3B8]"
            }`}
          />
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 px-2.5">
        <p className="text-[11px] font-semibold leading-[14px] text-[#0F172A] sm:text-[12px]">
          {title}
        </p>

        <p className="mt-0.5 line-clamp-2 text-[9px] leading-[12px] text-[#94A3B8] sm:text-[10px] sm:leading-[13px]">
          {description}
        </p>
      </div>

      {/* Check */}
      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
        {selected ? (
          <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#10B981]">
            <Check size={9} strokeWidth={3} className="text-white" />
          </div>
        ) : (
          <div className="h-[14px] w-[14px] rounded-full border border-[#E2E8F0]" />
        )}
      </div>
    </button>
  );
}

export default OptionCard;