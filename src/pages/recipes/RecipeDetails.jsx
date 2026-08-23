import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Users,
} from "lucide-react";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../services/favoriteService";
import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import RecipeImage from "../../components/Recipes/RecipeImage";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import Button from "../../components/common/Button";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { recipe, loading, error, refetch } = useRecipeDetails(id);

  const [checked, setChecked] = useState({});
  const [saved, setSaved] = useState(false);
const [favoriteLoading, setFavoriteLoading] = useState(false);
const [favoriteError, setFavoriteError] = useState("");

useEffect(() => {
  const loadFavoriteState = async () => {
    if (!recipe?.id) return;

    try {
      const favorites = await getFavorites();

      const favoriteList = Array.isArray(favorites)
        ? favorites
        : Array.isArray(favorites?.items)
          ? favorites.items
          : [];

      const exists = favoriteList.some((item) => {
        const favoriteRecipeId =
          item?.recipeId ??
          item?.RecipeId ??
          item?.id ??
          item?.recipe?.id;

        return String(favoriteRecipeId) === String(recipe.id);
      });

      setSaved(exists);
    } catch (error) {
      console.error("Failed to load favorite state:", error);
    }
  };

  loadFavoriteState();
}, [recipe?.id]);

const handleFavorite = async () => {
  if (!recipe?.id || favoriteLoading) return;

  try {
    setFavoriteLoading(true);
    setFavoriteError("");

    if (saved) {
      await removeFavorite(recipe.id);
      setSaved(false);
    } else {
      await addFavorite(recipe.id);
      setSaved(true);
    }
  } catch (error) {
    console.error("Favorite action failed:", error);
    setFavoriteError(
      error?.message || "Unable to update favorite."
    );
  } finally {
    setFavoriteLoading(false);
  }
};
  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Loading recipe..." />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  // No recipe
  if (!recipe) {
    return null;
  }

  // --------------------------------
  // Safe data handling
  // --------------------------------

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : [];

  const ingredientCount = ingredients.length;

  const totalTime =
    (Number(recipe.preparationTimeMinutes) || 0) +
    (Number(recipe.cookingTimeMinutes) || 0);

  // Category can be string OR object
  const category =
    typeof recipe.category === "string"
      ? recipe.category
      : recipe.category?.name ||
        recipe.category?.title ||
        recipe.category?.categoryName ||
        null;

  // Badges
  const badges = [
    recipe.isHealthy ? "Healthy" : null,
    category,
  ].filter(Boolean);

  // --------------------------------
  // Ingredient check
  // --------------------------------

  const toggleIngredient = (key) => {
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-28 lg:pb-10">
      {/* Breadcrumb */}
      <div className="mx-auto hidden max-w-6xl items-center gap-2 px-4 pt-6 text-xs text-slate sm:px-6 lg:flex lg:px-10 lg:pt-8">
        <Link to="/" className="hover:text-text-primary">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-medium text-text-primary">Recipe</span>
      </div>

      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-10 lg:py-8">

        {/* =====================================
            LEFT COLUMN
        ===================================== */}

        <div>
          {/* Hero Image */}
          <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-[420px] lg:rounded-3xl">
            <RecipeImage
              src={recipe.imageUrl}
              alt={recipe.name || "Recipe"}
              className="h-full w-full"
            />

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Bookmark */}
<button
  type="button"
  onClick={handleFavorite}
  disabled={favoriteLoading}
  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
  aria-label={saved ? "Remove bookmark" : "Bookmark recipe"}
>
  <Bookmark
    size={18}
    className={saved ? "fill-primary text-primary" : ""}
  />
</button>
          </div>

          {/* Recipe Info */}
          <div className="px-4 pt-5 sm:px-6 lg:px-0">

            {/* Name */}
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
              {recipe.name || "Untitled Recipe"}
            </h1>
{favoriteError && (
  <p className="mt-2 text-xs text-red-500">
    {favoriteError}
  </p>
)}
            {/* Badges */}
            {badges.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <span
                    key={`${badge}-${index}`}
                    className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary-dark"
                  >
                    {String(badge)}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate">

              {/* Time */}
              {totalTime > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {totalTime} mins
                </span>
              )}

              {/* Calories */}
              {recipe.calories != null && (
                <span className="flex items-center gap-1.5">
                  <Flame
                    size={16}
                    className="text-orange"
                  />
                  {recipe.calories} kcal
                </span>
              )}

              {/* Servings */}
              {recipe.servings != null && (
                <span className="flex items-center gap-1.5">
                  <Users size={16} />
                  {recipe.servings} servings
                </span>
              )}
            </div>

            {/* Description */}
            {recipe.description && (
              <div className="mt-5 rounded-2xl bg-light-purple/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple">
                  Description
                </p>

                <p className="mt-1.5 text-sm leading-relaxed text-text-primary">
                  {String(recipe.description)}
                </p>
              </div>
            )}

            {/* YouTube */}
 {recipe.youtubeUrl && (
  <a
    href={recipe.youtubeUrl}
    target="_blank"
    rel="noreferrer"
    className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-2"
  >
    Watch video tutorial
  </a>
)}
          </div>
        </div>

        {/* =====================================
            RIGHT COLUMN
        ===================================== */}

        <div className="mt-6 px-4 sm:px-6 lg:mt-0 lg:px-0">

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10 lg:sticky lg:top-8">

            {/* Ingredients Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-primary">
                Ingredients
              </h2>

              <span className="text-xs text-slate">
                ({ingredientCount} items)
              </span>
            </div>

            {/* No ingredients */}
            {ingredientCount === 0 ? (
              <p className="mt-4 text-sm text-slate">
                Ingredient details aren't available for this recipe yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">

                {ingredients.map((ingredient, index) => {
                  const ingredientId =
                    ingredient?.id || `ingredient-${index}`;

                  const isChecked = !!checked[ingredientId];

                  const ingredientName =
                    typeof ingredient?.name === "string"
                      ? ingredient.name
                      : ingredient?.name?.name ||
                        ingredient?.ingredientName ||
                        "Ingredient";

                  return (
                    <li key={ingredientId}>

                      <button
                        type="button"
                        onClick={() =>
                          toggleIngredient(ingredientId)
                        }
                        className="flex w-full items-center gap-3 text-left"
                      >

                        {/* Checkbox */}
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-white transition ${
                            isChecked
                              ? "border-primary bg-primary"
                              : "border-slate/30"
                          }`}
                        >
                          {isChecked && (
                            <Check
                              size={12}
                              strokeWidth={3}
                            />
                          )}
                        </span>

                        {/* Name */}
                        <span
                          className={`flex-1 text-sm ${
                            isChecked
                              ? "text-slate/50 line-through"
                              : "text-text-primary"
                          }`}
                        >
                          {String(ingredientName)}
                        </span>

                        {/* Amount */}
                        {(ingredient?.amount != null ||
                          ingredient?.unit) && (
                          <span className="text-xs text-slate">
                            {ingredient?.amount ?? ""}
                            {ingredient?.unit
                              ? ` ${ingredient.unit}`
                              : ""}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Desktop Start Cooking */}
            <div className="mt-6 hidden lg:block">
              <Button
                type="button"
                onClick={() =>
                  navigate(`/recipes/${recipe.id}/cook`)
                }
                className="h-12"
              >
                Start Cooking
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          MOBILE START COOKING
      ===================================== */}

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate/10 bg-white p-4 lg:hidden">
        <Button
          type="button"
          onClick={() =>
            navigate(`/recipes/${recipe.id}/cook`)
          }
          className="h-12"
        >
          Start Cooking
        </Button>
      </div>
    </div>
  );
}

export default RecipeDetails;