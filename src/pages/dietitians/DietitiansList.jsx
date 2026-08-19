import { useState } from "react";
import { Search, X } from "lucide-react";

import { useDietitians } from "../../hooks/useDietitians";
import DietitianCard from "../../components/Dietitians/DietitianCard";
import DietitianFilters from "../../components/Dietitians/DietitianFilters";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import EmptyState from "../../components/Recipes/EmptyState";

const TABS = [
  { key: "availableToday", label: "Available Today" },
  { key: "videoCall", label: "Video Call" },
  { key: "topRated", label: "Top Rated" },
];

function DietitiansList() {
  const {
    dietitians,
    totalCount,
    loading,
    error,
    filters,
    updateFilter,
    toggleSpecialty,
    clearFilters,
    refetch,
  } = useDietitians();

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeChips = [
    ...filters.specialties.map((specialty) => ({
      key: `specialty-${specialty}`,
      label: specialty,
      onRemove: () => toggleSpecialty(specialty),
    })),
    filters.maxFee < 300
      ? {
          key: "fee",
          label: `Under ${filters.maxFee}EGP`,
          onRemove: () => updateFilter("maxFee", 300),
        }
      : null,
  ].filter(Boolean);

  const hasActiveFilters =
    activeChips.length > 0 ||
    filters.availableToday ||
    filters.videoCall ||
    filters.topRated;

  return (
    <div className="min-h-screen bg-main-bg font-jakarta">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
          Dietitians
        </h1>
        <p className="mt-1 text-xs text-slate sm:text-sm">
          Empowering nutrition experts with tailored plans and tools to
          support every patient&apos;s journey
        </p>

        <div className="relative mt-5">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate/60"
          />
          <input
            type="text"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search for a Dietitian"
            className="h-11 w-full rounded-xl border border-slate/15 bg-white pl-10 pr-4 text-sm text-text-primary outline-none placeholder:text-slate/50 focus:border-primary"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => updateFilter(key, !filters[key])}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filters[key]
                  ? "bg-primary text-white"
                  : "bg-white text-text-primary ring-1 ring-slate/15 hover:bg-slate/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-[11px] font-medium text-primary-dark"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            <button
              type="button"
              onClick={clearFilters}
              className="text-[11px] font-semibold text-slate hover:text-text-primary"
            >
              Clear all
            </button>
          </div>
        )}

        {!loading && !error && (
          <p className="mt-4 text-xs font-medium text-slate sm:text-sm">
            {totalCount} result{totalCount === 1 ? "" : "s"}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-6 lg:flex-row">
          <DietitianFilters
            filters={filters}
            onUpdateFilter={updateFilter}
            onToggleSpecialty={toggleSpecialty}
            onClear={clearFilters}
          />

          <div className="flex-1">
            {loading && <Loader label="Loading dietitians..." />}

            {!loading && error && (
              <ErrorState message={error} onRetry={refetch} />
            )}

            {!loading && !error && dietitians.length === 0 && (
              <EmptyState
                title="No dietitians found"
                message="Try adjusting your filters or search terms."
              />
            )}

            {!loading && !error && dietitians.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {dietitians.map((dietitian) => (
                  <DietitianCard
                    key={dietitian.id}
                    dietitian={dietitian}
                    isFavorite={favorites.includes(dietitian.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DietitiansList;
