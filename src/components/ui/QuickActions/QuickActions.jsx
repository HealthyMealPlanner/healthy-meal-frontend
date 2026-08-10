const actions = [
  { label: "Diet Plans" },
  { label: "Diet Plans" },
  { label: "Diet Plans" },
];

function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-5 lg:mb-10">
      {actions.map((item, i) => (
        <button
          key={i}
          className="flex items-center gap-2 lg:gap-3 bg-white rounded-2xl px-3 py-3 lg:px-5 lg:py-4 shadow-sm hover:shadow-md transition text-left"
        >
          <span className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <img
              src="/streamline-flex_salad-vegetable-diet-remix.svg"
              alt="Diet Plan Icon"
              className="w-5 h-5 lg:w-6 lg:h-6 object-contain brightness-0 invert"
            />
          </span>
          <span className="text-xs lg:text-base font-semibold text-text-primary whitespace-nowrap">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default QuickActions;