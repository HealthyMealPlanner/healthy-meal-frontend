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
      className={`mx-auto w-[341px] h-[90px] rounded-2xl border transition-all duration-300 ${
        selected
          ? "border-[#10B981] bg-white shadow-sm"
          : "border-[#E2E8F0] bg-white hover:border-[#10B981]"
      }`}
    >
      <div className="flex h-full w-full items-center px-[28px]">

        {/* Left Side */}
<div className="flex flex-1 items-center gap-5 pl-[12px]">
          {/* Icon */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
              selected ? "bg-[#D1FAE5]" : "bg-[#F8FAFC]"
            }`}
          >
            <Icon
              className={`h-6 w-6 transition-colors ${
                selected ? "text-[#10B981]" : "text-[#94A3B8]"
              }`}
            />
          </div>

          {/* Text */}
<div className="flex-1 text-left">
                <h3 className="text-[16px] font-bold leading-5 text-[#0F172A]">
              {title}
            </h3>

            <p className="mt-1 text-[11px] leading-[14px] text-[#0F172A]/80">
              {description}
            </p>
          </div>
        </div>

        {/* Check */}
        <div className="mr-[4px] flex w-[28px] justify-center">
          {selected && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981]">
              <Check size={14} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export default OptionCard;