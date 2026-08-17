import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Check,
  Share2,
  Star,
} from "lucide-react";

import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import RecipeImage from "../../components/Recipes/RecipeImage";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import Button from "../../components/common/Button";

const MEAL_TIMES = [
  "Breakfast",
  "Lunch",
  "Dinner",
];

function RecipeComplete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    recipe,
    loading,
    error,
    refetch,
  } = useRecipeDetails(id);

  const [mealTime, setMealTime] =
    useState("Lunch");
  const [rating, setRating] =
    useState(0);
  const [logged, setLogged] =
    useState(false);
  const [shareCopied, setShareCopied] =
    useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Wrapping up..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <ErrorState
          message={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!recipe) return null;

  const handleLogMeal = () => {
    setLogged(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: recipe.name,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // cancelled
      }
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(
        window.location.href
      );
      setShareCopied(true);

      setTimeout(
        () => setShareCopied(false),
        2000
      );
    }
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-10">
      <div className="mx-auto max-w-md px-4 pt-6 sm:px-6">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Success! · Final Step
          </p>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate/10">
            <div className="h-full w-full rounded-full bg-primary" />
          </div>
        </div>

        {/* Real API image only */}
        <div className="relative mx-auto mt-6 h-56 w-56 overflow-hidden rounded-full ring-4 ring-white sm:h-64 sm:w-64">
          <RecipeImage
            src={recipe.imageUrl}
            alt={recipe.name || "Recipe"}
            className="h-full w-full"
          />

          <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-md">
            <Check size={18} strokeWidth={3} />
          </span>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Bon Appétit!
          </h1>

          <p className="mt-1 text-sm text-slate">
            Your {recipe.name} is ready 🎉
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate">
            Nutritional Summary
          </p>

          <div className="mt-3 grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-text-primary">
                {recipe.calories ?? "–"}
              </p>
              <p className="text-[11px] text-slate">
                CAL
              </p>
            </div>

            <div>
              <p className="text-lg font-bold text-text-primary">
                {recipe.protein != null
                  ? `${recipe.protein}g`
                  : "–"}
              </p>
              <p className="text-[11px] text-slate">
                PROT
              </p>
            </div>

            <div>
              <p className="text-lg font-bold text-text-primary">
                {recipe.carbs != null
                  ? `${recipe.carbs}g`
                  : "–"}
              </p>
              <p className="text-[11px] text-slate">
                CARB
              </p>
            </div>

            <div>
              <p className="text-lg font-bold text-text-primary">
                {recipe.fat != null
                  ? `${recipe.fat}g`
                  : "–"}
              </p>
              <p className="text-[11px] text-slate">
                FAT
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-text-primary">
            When did you eat?
          </p>

          <div className="mt-2 flex gap-2">
            {MEAL_TIMES.map((meal) => (
              <button
                key={meal}
                type="button"
                onClick={() =>
                  setMealTime(meal)
                }
                className={`flex-1 rounded-xl border py-2.5 text-sm font-medium ${
                  mealTime === meal
                    ? "border-primary bg-primary-light text-primary-dark"
                    : "border-slate/20 text-slate hover:bg-slate/5"
                }`}
              >
                {meal}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-text-primary">
            Rate this recipe
          </p>

          <div className="mt-2 flex gap-1.5">
            {[1, 2, 3, 4, 5].map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setRating(value)
                  }
                >
                  <Star
                    size={26}
                    className={
                      value <= rating
                        ? "fill-orange text-orange"
                        : "text-slate/25"
                    }
                  />
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button
            type="button"
            onClick={handleLogMeal}
            className="h-12"
            disabled={logged}
          >
            {logged
              ? "Meal Logged"
              : "Log Meal to Today's Diary"}
          </Button>

          <button
            type="button"
            onClick={handleShare}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate/20 text-slate"
            aria-label="Share recipe"
          >
            <Share2 size={18} />
          </button>
        </div>

        {shareCopied && (
          <p className="mt-2 text-center text-xs text-primary">
            Link copied to clipboard
          </p>
        )}

        <button
          type="button"
          onClick={() =>
            navigate("/recipes")
          }
          className="mt-4 w-full text-center text-sm font-medium text-primary underline underline-offset-2"
        >
          Back to Recipes
        </button>
      </div>
    </div>
  );
}

export default RecipeComplete;