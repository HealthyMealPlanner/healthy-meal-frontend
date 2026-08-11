import { useEffect, useState } from "react";
import { Clock3, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const filters = ["Recipe", "Meal Kit", "Dietitians"];

function FavoriteRecipes() {
  const [activeFilter, setActiveFilter] = useState("Recipe");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchFavoriteRecipes();
  }, []);

  const fetchFavoriteRecipes = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://healthymealplanner-production.runasp.net/api/FavoriteRecipes",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite recipes");
      }

      const data = await response.json();

      setFavoriteRecipes(data);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      setError("Unable to load your favourite recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://healthymealplanner-production.runasp.net/api/FavoriteRecipes?RecipeId=${recipeId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.recipeId !== recipeId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            Favourites
          </h2>

          <p className="mt-1 text-xs text-slate">
            Everything you saved across recipes, budget meal kits and
            dietitians.
          </p>
        </div>

        {/* Filter */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-5 py-2 text-xs transition ${
                  active
                    ? "bg-white font-medium text-text-primary shadow-sm"
                    : "text-slate"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recipes */}
      {activeFilter === "Recipe" && (
        <div className="mt-5">
          {loading && (
            <p className="text-xs text-slate">
              Loading your favourite recipes...
            </p>
          )}

          {!loading && error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          {!loading && !error && favoriteRecipes.length === 0 && (
            <p className="text-xs text-slate">
              You don't have any favourite recipes yet.
            </p>
          )}

          {!loading && !error && favoriteRecipes.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteRecipes.map((recipe) => (
                <article
                  key={recipe.recipeId}
                  onClick={() => handleRecipeClick(recipe.recipeId)}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-[150px] overflow-hidden bg-emerald-100">
                    {recipe.imageUrl ? (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-100">
                        <span className="text-xs text-emerald-600">
                          No image available
                        </span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemoveFavorite(recipe.recipeId);
                      }}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm"
                      aria-label="Remove from favourites"
                    >
                      <Heart
                        size={14}
                        className="fill-primary text-primary"
                      />
                    </button>
                  </div>

                  {/* Recipe Info */}
                  <div className="p-3">
                    <h3 className="text-xs font-semibold text-text-primary">
                      {recipe.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate">
                      <Clock3 size={11} />

                      {recipe.preparationTimeMinutes +
                        recipe.cookingTimeMinutes}{" "}
                      min
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Meal Kits */}
      {activeFilter === "Meal Kit" && (
        <div className="mt-5">
          <p className="text-xs text-slate">
            Favourite meal kits will be connected to the API later.
          </p>
        </div>
      )}

      {/* Dietitians */}
      {activeFilter === "Dietitians" && (
        <div className="mt-5">
          <p className="text-xs text-slate">
            Favourite dietitians will be connected to the API later.
          </p>
        </div>
      )}
    </section>
  );
}

export default FavoriteRecipes;