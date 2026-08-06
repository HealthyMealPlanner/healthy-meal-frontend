function ProgressBar({ step, totalSteps }) {
  return (
    <div className="w-full">
      {/* Top Row */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[12px] font-medium uppercase tracking-wide text-[#475569]">
          STEP {step} OF {totalSteps}
        </span>

        <button
          type="button"
          className="text-[12px] font-semibold uppercase text-[#10B981]"
        >
          Skip
        </button>
      </div>

      {/* Progress Bars */}
      <div className="flex gap-[7px]">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-[8px] flex-1 rounded-full border transition-all duration-300 ${
              index < step
                ? "border-[#10B981] bg-[#10B981]"
                : "border-[#D9E2EC] bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;