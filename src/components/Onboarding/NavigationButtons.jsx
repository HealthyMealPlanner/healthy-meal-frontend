function NavigationButtons({
  onNext,
  onBack,
  step,
  totalSteps = 3,
  disabled,
}) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        disabled={step === 1}
        className={`h-[32px] min-w-[100px] rounded-[8px] border px-4 text-[9px] font-medium transition-all sm:h-[34px] sm:min-w-[105px] sm:text-[10px] ${
          step === 1
            ? "cursor-not-allowed border-[#E2E8F0] text-[#CBD5E1]"
            : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#10B981]"
        }`}
      >
        ← Back
      </button>

      {/* Next / Done */}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className={`h-[32px] min-w-[108px] rounded-[8px] px-4 text-[9px] font-semibold transition-all sm:h-[34px] sm:min-w-[110px] sm:text-[10px] ${
          disabled
            ? "cursor-not-allowed bg-[#A7F3D0] text-white opacity-70"
            : "bg-[#10B981] text-white shadow-sm hover:bg-[#059669]"
        }`}
      >
        {step === totalSteps ? "Done" : "Continue"} →
      </button>
    </div>
  );
}

export default NavigationButtons;