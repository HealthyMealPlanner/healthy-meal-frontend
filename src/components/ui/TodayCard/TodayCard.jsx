import { useState } from "react";
import { useDailyMetrics } from "../../../hooks/useDailyMetrics";

const DAYS = [
  { label: "SAT", date: 1 },
  { label: "SAT", date: 1 },
  { label: "SAT", date: 1 },
  { label: "SAT", date: 1 },
  { label: "SAT", date: 1 },
  { label: "SAT", date: 1 },
  { label: "SAT", date: 1 },
];

function CalorieRing({ value = 0, total = 2000, size = 140, stroke = 13 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? Math.min(value / total, 1) : 0;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-text-primary leading-none">
          {value.toLocaleString()}
        </span>
        <span className="text-xs text-slate mt-1">of {total.toLocaleString()} kcal</span>
      </div>
    </div>
  );
}

function MacroRow({ label, current, total }) {
  const pct = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-slate capitalize">{label}</span>
        <span className="text-text-primary font-medium">
          {current}g/{total}g
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function TodayCard() {
  const [activeDay, setActiveDay] = useState(4);
  const { metrics, loading, error } = useDailyMetrics();

  // Real field names confirmed from GET /api/Meal/daily-metrics:
  // consumedCalories, dailyCaloriesGoal, proteinGrams, carbsGrams, fatGrams
  const calories = metrics?.consumedCalories ?? 0;
  const caloriesGoal = metrics?.dailyCaloriesGoal || 2000;

  // The API only returns *consumed* grams, not per-macro goals — using
  // reasonable defaults for the "total" side of each bar until the
  // backend exposes macro goals too.
  const macros = [
    { label: "protein", current: metrics?.proteinGrams ?? 0, total: 120 },
    { label: "carbs", current: metrics?.carbsGrams ?? 0, total: 250 },
    { label: "fat", current: metrics?.fatGrams ?? 0, total: 70 },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 lg:p-8 shadow-sm mb-5 lg:mb-10">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-text-primary">Today</h3>
        <span className="text-xs lg:text-sm text-slate">
          {new Date().toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 lg:gap-2.5 mb-6 lg:mb-8">
        {DAYS.map((day, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`flex flex-col items-center justify-center rounded-xl py-2 lg:py-3 text-xs lg:text-sm font-medium transition-colors ${
              activeDay === i ? "bg-primary text-white shadow-sm" : "bg-light text-slate hover:bg-primary-light/50"
            }`}
          >
            <span className="text-[10px] lg:text-xs opacity-80">{day.label}</span>
            <span className="text-sm lg:text-base font-bold">{day.date}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate">Loading today's data...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Couldn't load today's metrics.</p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="flex-1 flex flex-col gap-5 lg:gap-6">
            {macros.map((m, i) => (
              <MacroRow key={i} {...m} />
            ))}
          </div>
          <div className="self-center">
            <CalorieRing value={calories} total={caloriesGoal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TodayCard;