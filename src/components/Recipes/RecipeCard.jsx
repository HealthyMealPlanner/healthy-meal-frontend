import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Flame,
  Users,
  Bookmark,
} from "lucide-react";

import RecipeImage from "./RecipeImage";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../services/favoriteService";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const totalTime =
    (Number(recipe?.preparationTimeMinutes) || 0) +
    (Number(recipe?.cookingTimeMinutes) || 0);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!recipe?.id) return;

      try {
        const favorites = await getFavorites();

        const list = Array.isArray(favorites)
          ? favorites
          : Array.isArray(favorites?.items)
            ? favorites.items
            : [];

        const exists = list.some((item) => {
          const favoriteRecipeId =
            item?.recipeId ??
            item?.RecipeId ??
            item?.id;

          return (
            String(favoriteRecipeId) ===
            String(recipe.id)
          );
        });

        setSaved(exists);
      } catch (error) {
        console.error(
          "Failed to check favorite:",
          error
        );
      }
    };

    checkFavorite();
  }, [recipe?.id]);

  const handleFavorite = async (event) => {
    event.stopPropagation();

    if (!recipe?.id || favoriteLoading) return;

    try {
      setFavoriteLoading(true);

      if (saved) {
        await removeFavorite(recipe.id);
        setSaved(false);
      } else {
        await addFavorite(recipe.id);
        setSaved(true);
      }
    } catch (error) {
      console.error(
        "Favorite action failed:",
        error
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <article
      onClick={() =>
        navigate(`/recipes/${recipe.id}`)
      }
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate/10 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden sm:h-52">
        <RecipeImage
          src={recipe?.imageUrl}
          alt={recipe?.name || "Recipe"}
          className="h-full w-full transition duration-300 group-hover:scale-105"
        />

        {recipe?.isHealthy && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            Healthy
          </span>
        )}

        {/* Favorite */}
        <button
          type="button"
          onClick={handleFavorite}
          disabled={favoriteLoading}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={
            saved
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Bookmark
            size={17}
            className={
              saved
                ? "fill-primary text-primary"
                : ""
            }
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-primary">
          {recipe?.category ||
            recipe?.mealType ||
            "Recipe"}
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold text-text-primary sm:text-base">
          {recipe?.name || "Untitled Recipe"}
        </h3>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs text-slate">
          {totalTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {totalTime} mins
            </span>
          )}

          {recipe?.calories != null && (
            <span className="flex items-center gap-1">
              <Flame
                size={14}
                className="text-orange"
              />
              {recipe.calories} kcal
            </span>
          )}

          {recipe?.servings != null && (
            <span className="flex items-center gap-1">
              <Users size={14} />
              {recipe.servings}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;