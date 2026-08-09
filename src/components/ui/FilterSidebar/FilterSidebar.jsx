function RangeField({ label, unit, min, max, value, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-text-primary mb-3">{label}</p>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, #10b981 ${pct}%, #e2e8f0 ${pct}%)`,
        }}
      />
      <div className="flex items-center justify-between text-xs text-slate mt-2">
        <span>{unit} {min}</span>
        <span className="text-primary font-semibold">{unit} {value}</span>
      </div>
    </div>
  );
}

function FilterSidebar({ tab, filters, onChange, onReset }) {
  const isDietPlans = tab === "diet-plans";

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-text-primary">Filters</h3>
        <button onClick={onReset} className="text-sm font-semibold text-primary hover:underline">
          Reset
        </button>
      </div>

      {isDietPlans ? (
        <>
          <RangeField
            label="Budget (EGP / Serving)"
            unit="EGP"
            min={0}
            max={300}
            value={filters.budget}
            onChange={(v) => onChange({ ...filters, budget: v })}
          />
          <RangeField
            label="Calories (kcal)"
            unit=""
            min={0}
            max={800}
            value={filters.calories}
            onChange={(v) => onChange({ ...filters, calories: v })}
          />

          <p className="text-sm font-semibold text-text-primary mb-3">Prep Time</p>
          <div className="flex flex-col gap-3">
            {["Under 15 min", "15-30 min", "30+ min"].map((option) => (
              <label key={option} className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.prepTime.includes(option)}
                  onChange={() => {
                    const next = filters.prepTime.includes(option)
                      ? filters.prepTime.filter((o) => o !== option)
                      : [...filters.prepTime, option];
                    onChange({ ...filters, prepTime: next });
                  }}
                  className="w-4 h-4 rounded accent-primary"
                />
                {option}
              </label>
            ))}
          </div>
        </>
      ) : (
        <>
          <RangeField
            label="Consultation Fee (EGP)"
            unit="EGP"
            min={0}
            max={300}
            value={filters.fee}
            onChange={(v) => onChange({ ...filters, fee: v })}
          />

          <p className="text-sm font-semibold text-text-primary mb-3">Search within fixed dates</p>
          <div className="flex items-center gap-2 mb-6">
            <select
              value={filters.dateFrom}
              onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-text-primary"
            >
              <option value="">From</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This week</option>
            </select>
            <select
              value={filters.dateTo}
              onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-text-primary"
            >
              <option value="">To</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This week</option>
            </select>
          </div>

          <p className="text-sm font-semibold text-text-primary mb-3">Specialties</p>
          <div className="flex flex-col gap-3">
            {["Clinical Nutritionist", "Weight Mgmt", "Diabetes"].map((option) => (
              <label key={option} className="flex items-center gap-2.5 text-sm text-text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.specialties.includes(option)}
                  onChange={() => {
                    const next = filters.specialties.includes(option)
                      ? filters.specialties.filter((o) => o !== option)
                      : [...filters.specialties, option];
                    onChange({ ...filters, specialties: next });
                  }}
                  className="w-4 h-4 rounded accent-primary"
                />
                {option}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FilterSidebar;