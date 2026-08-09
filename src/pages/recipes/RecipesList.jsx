import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useRecipes } from "../../hooks/useRecipes";

import RecipeCard from "../../components/Recipes/RecipeCard";
import Pagination from "../../components/Recipes/Pagination";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import EmptyState from "../../components/Recipes/EmptyState";
const PAGE_SIZE = 10;

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

        {!loading &&
          !error &&
          recipes.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                  />
                ))}
              </div>

              <Pagination
                pageNumber={pageNumber}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
      </main>
    </div>
  );
}

export default RecipesList;