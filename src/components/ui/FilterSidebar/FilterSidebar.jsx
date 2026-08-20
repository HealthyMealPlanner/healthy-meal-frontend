import { useState } from "react";

function FilterSidebar({ maxCalories, onChangeCalories }) {
  return (
    <aside className="bg-white rounded-2xl shadow-sm p-5 h-fit border border-gray-100">
      <h3 className="text-base font-bold text-text-primary mb-4">Filters</h3>

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
    </aside>
  );
}

export default FilterSidebar;