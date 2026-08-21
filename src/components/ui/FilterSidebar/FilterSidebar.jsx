const PREP_TIME_OPTIONS = [
  { key: "under15", label: "Under 15 min", test: (mins) => mins < 15 },
  { key: "15to30", label: "15–30 min", test: (mins) => mins >= 15 && mins <= 30 },
  { key: "over30", label: "30+ min", test: (mins) => mins > 30 },
];

function FilterSidebar({
  maxCalories,
  onChangeCalories,
  prepTimeFilters,
  onTogglePrepTime,
  onReset,
}) {
  return (
    <aside className="bg-white rounded-2xl shadow-sm p-5 h-fit border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-text-primary">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-text-primary">
            Max Calories
          </span>
          <span className="text-xs font-bold text-[#00C07F] bg-[#00C07F]/10 px-2.5 py-1 rounded-lg">
            {maxCalories} kcal
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="1200"
          step="50"
          value={maxCalories}
          onChange={(e) => onChangeCalories(Number(e.target.value))}
          className="w-full accent-[#00C07F] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>200 kcal</span>
          <span>1200 kcal</span>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-text-primary mb-2">
          Prep Time
        </p>
        <div className="flex flex-col gap-2">
          {PREP_TIME_OPTIONS.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm text-text-primary"
            >
              <input
                type="checkbox"
                checked={prepTimeFilters.includes(key)}
                onChange={() => onTogglePrepTime(key)}
                className="h-4 w-4 rounded border-gray-300 accent-[#00C07F]"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export { PREP_TIME_OPTIONS };
export default FilterSidebar;