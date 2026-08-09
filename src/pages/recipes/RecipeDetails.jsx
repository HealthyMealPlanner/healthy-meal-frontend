import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Check, Clock, Flame, Users } from "lucide-react";
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

  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Loading recipe..." />
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

  const totalTime =
    (recipe.preparationTimeMinutes || 0) + (recipe.cookingTimeMinutes || 0);
  const ingredientCount = recipe.ingredients.length;

  const toggleIngredient = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const badges = [recipe.isHealthy ? "Healthy" : null, recipe.category].filter(
    Boolean
  );

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-28 lg:pb-10">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-10 lg:py-8">
        {/* Left column: hero image + info */}
        <div>
          <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-[420px] lg:rounded-3xl">
            <RecipeImage
              src={recipe.imageUrl}
              alt={recipe.name}
              className="h-full w-full"
            />

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => setSaved((prev) => !prev)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-sm backdrop-blur transition hover:bg-white"
              aria-label={saved ? "Remove bookmark" : "Bookmark recipe"}
            >
              <Bookmark
                size={18}
                className={saved ? "fill-primary text-primary" : ""}
              />
            </button>
          </div>

          <div className="px-4 pt-5 sm:px-6 lg:px-0">
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
              {recipe.name}
            </h1>

            {badges.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary-dark"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate">
              {totalTime > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock size={16} /> {totalTime} mins
                </span>
              )}

              {recipe.calories != null && (
                <span className="flex items-center gap-1.5">
                  <Flame size={16} className="text-orange" /> {recipe.calories}{" "}
                  kcal
                </span>
              )}

              {recipe.servings != null && (
                <span className="flex items-center gap-1.5">
                  <Users size={16} /> {recipe.servings} servings
                </span>
              )}
            </div>

            {recipe.description && (
              <div className="mt-5 rounded-2xl bg-light-purple/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple">
                  Description
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-primary">
                  {recipe.description}
                </p>
              </div>
            )}

            {recipe.youTubeUrl && (
              <a
                href={recipe.youTubeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-2"
              >
                Watch video tutorial
              </a>
            )}
          </div>
        </div>

        {/* Right column: ingredients */}
        <div className="mt-6 px-4 sm:px-6 lg:mt-0 lg:px-0">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10 lg:sticky lg:top-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-primary">
                Ingredients
              </h2>
              <span className="text-xs text-slate">
                ({ingredientCount} items)
              </span>
            </div>

            {ingredientCount === 0 ? (
              <p className="mt-4 text-sm text-slate">
                Ingredient details aren't available for this recipe yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {recipe.ingredients.map((ingredient) => {
                  const isChecked = !!checked[ingredient.id];

                  return (
                    <li key={ingredient.id}>
                      <button
                        type="button"
                        onClick={() => toggleIngredient(ingredient.id)}
                        className="flex w-full items-center gap-3 text-left"
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-white transition ${
                            isChecked
                              ? "border-primary bg-primary"
                              : "border-slate/30"
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </span>

                        <span
                          className={`flex-1 text-sm ${
                            isChecked
                              ? "text-slate/50 line-through"
                              : "text-text-primary"
                          }`}
                        >
                          {ingredient.name}
                        </span>

                        {(ingredient.amount || ingredient.unit) && (
                          <span className="text-xs text-slate">
                            {ingredient.amount} {ingredient.unit}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-6 hidden lg:block">
              <Button
                type="button"
                onClick={() => navigate(`/recipes/${recipe.id}/cook`)}
                className="h-12"
              >
                Start Cooking
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate/10 bg-white p-4 lg:hidden">
        <Button
          type="button"
          onClick={() => navigate(`/recipes/${recipe.id}/cook`)}
          className="h-12"
        >
          Start Cooking
        </Button>
      </div>
    </div>
  );
}

export default RecipeDetails;
