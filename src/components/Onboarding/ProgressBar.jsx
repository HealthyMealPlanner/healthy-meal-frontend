function ProgressBar({ step, totalSteps }) {
  const steps = [
    "Your goal",
    "Meal budget",
    "Dietary needs",
  ];

  return (
    <div className="mx-auto w-full max-w-[560px] px-2 sm:px-0">
      <div className="flex w-full items-center">
        {steps.slice(0, totalSteps).map((label, index) => {
          const stepNumber = index + 1;

          const completed = stepNumber < step;
          const active = stepNumber === step;

          return (
            <div
              key={label}
              className="flex flex-1 items-center"
            >
              {/* Number */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[9px] font-medium ${
                  completed
                    ? "border-[#10B981] bg-[#10B981] text-white"
                    : active
                    ? "border-[#10B981] bg-white text-[#10B981]"
                    : "border-[#D9E2EC] bg-white text-[#64748B]"
                }`}
              >
                {completed ? "✓" : stepNumber}
              </div>

              {/* Label */}
              <span className="ml-1.5 whitespace-nowrap text-[8px] text-[#475569] sm:text-[9px]">
                {label}
              </span>

              {/* Line */}
              {index < totalSteps - 1 && (
                <div
                  className={`mx-2 h-[2px] flex-1 rounded-full ${
                    completed
                      ? "bg-[#10B981]"
                      : "bg-[#E2E8F0]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;