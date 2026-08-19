const SPECIALTY_OPTIONS = ["Clinical Nutritionist", "Weight Management", "Diabetes"];

function DietitianFilters({ filters, onUpdateFilter, onToggleSpecialty, onClear }) {
  return (
    <aside className="w-full shrink-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10 lg:w-64">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-text-primary">
          Consultation Fee (EGP)
        </p>
        <input
          type="range"
          min={0}
          max={300}
          step={10}
          value={filters.maxFee}
          onChange={(event) =>
            onUpdateFilter("maxFee", Number(event.target.value))
          }
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary-light accent-primary"
        />
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate">
          <span>EGP 0</span>
          <span>EGP {filters.maxFee}</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-text-primary">
          Search within fixed dates
        </p>
        <div className="mt-2 flex items-center gap-2">
          <select className="h-9 w-full rounded-lg border border-slate/20 bg-white px-2 text-xs text-slate outline-none">
            <option>From</option>
          </select>
          <select className="h-9 w-full rounded-lg border border-slate/20 bg-white px-2 text-xs text-slate outline-none">
            <option>To</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-text-primary">Specialties</p>
        <div className="mt-2 flex flex-col gap-2">
          {SPECIALTY_OPTIONS.map((specialty) => (
            <label
              key={specialty}
              className="flex items-center gap-2 text-xs text-text-primary"
            >
              <input
                type="checkbox"
                checked={filters.specialties.includes(specialty)}
                onChange={() => onToggleSpecialty(specialty)}
                className="h-3.5 w-3.5 rounded border-slate/30 accent-primary"
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default DietitianFilters;
