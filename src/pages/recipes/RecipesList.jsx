import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

import { useRecipes } from "../../hooks/useRecipes";

import RecipeCard from "../../components/Recipes/RecipeCard";
import RecipeFilters, {
  PREP_TIME_OPTIONS,
} from "../../components/Recipes/RecipeFilters";
import Pagination from "../../components/Recipes/Pagination";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import EmptyState from "../../components/Recipes/EmptyState";
const PAGE_SIZE = 10;
const MAX_CALORIES = 800;

function RecipesList() {
  const navigate = useNavigate();

  const {
    recipes,
    pageNumber,
    totalPages,
    totalCount,
    loading,
    error,
    goToPage,
    refetch,
  } = useRecipes(PAGE_SIZE);

  // NOTE: GET /Recipes only accepts pageNumber/pageSize — there's no
  // search or filter query param on the API, so search + filters here
  // refine the recipes already loaded on the current page rather than
  // querying the backend. See RecipeFilters.jsx for why "Budget" isn't
  // included (no price field exists on the Recipe model).
  const [search, setSearch] = useState("");
  const [maxCalories, setMaxCalories] = useState(MAX_CALORIES);
  const [prepTimeFilters, setPrepTimeFilters] = useState([]);

  const togglePrepTime = (key) => {
    setPrepTimeFilters((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setMaxCalories(MAX_CALORIES);
    setPrepTimeFilters([]);
  };

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return recipes.filter((recipe) => {
      if (query && !recipe.name?.toLowerCase().includes(query)) {
        return false;
      }

      if (
        recipe.calories != null &&
        Number(recipe.calories) > maxCalories
      ) {
        return false;
      }

      if (prepTimeFilters.length > 0) {
        const prepMinutes = Number(recipe.preparationTimeMinutes) || 0;

        const matchesAny = prepTimeFilters.some((key) => {
          const option = PREP_TIME_OPTIONS.find((item) => item.key === key);
          return option?.test(prepMinutes);
        });

        if (!matchesAny) return false;
      }

      return true;
    });
  }, [recipes, search, maxCalories, prepTimeFilters]);

  const handlePageChange = (page) => {
    goToPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta">
      <header className="border-b border-slate/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-text-primary shadow-sm transition hover:bg-slate/5"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
              Recipes
            </h1>

            {!loading && !error && (
              <p className="text-xs text-slate sm:text-sm">
                {totalCount} recipe
                {totalCount === 1 ? "" : "s"} to explore
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        {!loading && !error && recipes.length > 0 && (
          <div className="relative mb-5">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate/60"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search recipes..."
              className="h-11 w-full rounded-xl border border-slate/15 bg-white pl-10 pr-4 text-sm text-text-primary outline-none placeholder:text-slate/50 focus:border-primary"
            />
          </div>
        )}

        {loading && (
          <Loader label="Loading recipes..." />
        )}

        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={refetch}
          />
        )}

        {!loading &&
          !error &&
          recipes.length === 0 && (
            <EmptyState
              title="No recipes found"
              message="We couldn't find any recipes right now."
            />
          )}

        {!loading && !error && recipes.length > 0 && (
          <div className="flex flex-col gap-6 lg:flex-row">
            <RecipeFilters
              maxCalories={maxCalories}
              onMaxCaloriesChange={setMaxCalories}
              prepTimeFilters={prepTimeFilters}
              onTogglePrepTime={togglePrepTime}
              onReset={resetFilters}
            />

            <div className="flex-1">
              <p className="mb-3 text-xs font-medium text-slate sm:text-sm">
                {filteredRecipes.length} result
                {filteredRecipes.length === 1 ? "" : "s"} on this page
              </p>

              {filteredRecipes.length === 0 ? (
                <EmptyState
                  title="No recipes match your filters"
                  message="Try adjusting your search or filters."
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}

              <Pagination
                pageNumber={pageNumber}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default RecipesList;