function NavigationButtons({
  onNext,
  onBack,
  step,
  totalSteps = 3,
  disabled,
}) {
  return (
    <div className="mt-6 flex justify-center">
      {step === 1 ? (
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          className={`w-[341px] h-[50px] rounded-[12px] text-[16px] font-bold transition-all duration-300 ${
            disabled
              ? "cursor-not-allowed bg-[#A7F3D0] text-white opacity-60"
              : "bg-[#10B981] text-white hover:bg-[#059669]"
          }`}
        >
          Continue
        </button>
      ) : (
        <div className="flex w-[341px] gap-[13px]">
          <button
            type="button"
            onClick={onBack}
            className="w-[164px] h-[50px] rounded-[12px] border border-[#10B981] bg-white text-[16px] font-semibold text-[#10B981]"
          >
            Back
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={disabled}
            className={`w-[164px] h-[50px] rounded-[12px] text-[16px] font-bold ${
              disabled
                ? "cursor-not-allowed bg-[#A7F3D0] text-white opacity-60"
                : "bg-[#10B981] text-white hover:bg-[#059669]"
            }`}
          >
            {step === totalSteps ? "Done" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

export default NavigationButtons;