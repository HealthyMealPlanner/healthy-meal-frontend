import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share2, Star, X } from "lucide-react";
import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import RecipeImage from "../../components/Recipes/RecipeImage";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import Button from "../../components/common/Button";

const MEAL_TIMES = ["Breakfast", "Lunch", "Dinner"];

function RecipeComplete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipe, loading, error, refetch } = useRecipeDetails(id);
  const [mealTime, setMealTime] = useState("Lunch");
  const [rating, setRating] = useState(0);
  const [logged, setLogged] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

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
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!recipe) return null;

  const handleLogMeal = () => {
    setLogged(true);
  };

  const handleShare = async () => {
    const shareData = { title: recipe.name, url: window.location.href };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled the native share sheet, nothing to do
      }
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-main-bg/95 font-jakarta backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate/10">
          {/* Close */}
          <button
            type="button"
            onClick={() => navigate(`/recipes/${id}`)}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-light text-slate transition hover:bg-slate/10"
            aria-label="Close"
          >
            <X size={15} />
          </button>

          {/* Image */}
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-2xl ring-1 ring-slate/10">
            <RecipeImage
              src={recipe.imageUrl}
              alt={recipe.name}
              className="h-full w-full"
            />
          </div>

          {/* Title */}
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold text-text-primary">
              Time to Refuel 🍽️
            </h1>
            <p className="mt-1 text-sm text-slate">Your Meal is Ready 🎉</p>
          </div>

          {/* Nutrition summary */}
          <div className="mt-5 rounded-2xl bg-light p-4">
            <p className="text-center text-[10px] font-semibold uppercase tracking-wide text-slate">
              Nutritional Summary
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-text-primary">
                  {recipe.calories ?? "–"}
                </p>
                <p className="text-[10px] text-slate">KCAL</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">
                  {recipe.protein != null ? `${recipe.protein}g` : "–"}
                </p>
                <p className="text-[10px] text-slate">PROTEIN</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">
                  {recipe.carbs != null ? `${recipe.carbs}g` : "–"}
                </p>
                <p className="text-[10px] text-slate">CARBS</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">
                  {recipe.fat != null ? `${recipe.fat}g` : "–"}
                </p>
                <p className="text-[10px] text-slate">FATS</p>
              </div>
            </div>
          </div>

          {/* Meal time */}
          <div className="mt-5">
            <p className="text-sm font-medium text-text-primary">
              When did you eat?
            </p>
            <div className="mt-2 flex gap-2">
              {MEAL_TIMES.map((meal) => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setMealTime(meal)}
                  className={`flex-1 rounded-xl border py-2 text-xs font-medium transition ${
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

          {/* Rating */}
          <div className="mt-5">
            <p className="text-sm font-medium text-text-primary">
              Rate this recipe
            </p>
            <div className="mt-2 flex gap-1.5">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star
                    size={22}
                    className={
                      value <= rating
                        ? "fill-orange text-orange"
                        : "text-slate/25"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              onClick={handleLogMeal}
              className="h-12"
              disabled={logged}
            >
              {logged ? "Meal Logged" : "Log Meal to Today's Diary"}
            </Button>

            <button
              type="button"
              onClick={handleShare}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate/20 text-slate transition hover:bg-slate/5"
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
            onClick={() => navigate("/recipes")}
            className="mt-4 w-full text-center text-sm font-medium text-primary underline underline-offset-2"
          >
            Back to Recipes
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeComplete;
