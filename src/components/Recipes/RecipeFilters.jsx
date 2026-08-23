const PREP_TIME_OPTIONS = [
  { key: "under15", label: "Under 15 min", test: (mins) => mins < 15 },
  { key: "15to30", label: "15–30 min", test: (mins) => mins >= 15 && mins <= 30 },
  { key: "over30", label: "30+ min", test: (mins) => mins > 30 },
];

// NOTE: Figma also shows a "Budget (EGP / Serving)" range filter, but the
// Recipe data returned by GET /Recipes has no price/budget field anywhere
// in this codebase (see RecipeCard.jsx / RecipeDetails.jsx), so it isn't
// implemented here — adding it would mean filtering on fabricated data.

function RecipeFilters({ maxCalories, onMaxCaloriesChange, prepTimeFilters, onTogglePrepTime, onReset }) {
  return (
    <aside className="w-full shrink-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10 lg:w-64">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-text-primary">
          Calories (kcal)
        </p>
        <input
          type="range"
          min={0}
          max={800}
          step={10}
          value={maxCalories}
          onChange={(event) => onMaxCaloriesChange(Number(event.target.value))}
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary-light accent-primary"
        />
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate">
          <span>0 kcal</span>
          <span>{maxCalories} kcal</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-text-primary">Prep Time</p>
        <div className="mt-2 flex flex-col gap-2">
          {PREP_TIME_OPTIONS.map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-2 text-xs text-text-primary"
            >
              <input
                type="checkbox"
                checked={prepTimeFilters.includes(key)}
                onChange={() => onTogglePrepTime(key)}
                className="h-3.5 w-3.5 rounded border-slate/30 accent-primary"
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
export default RecipeFilters;
