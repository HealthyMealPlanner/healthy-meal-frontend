import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Info, Play, X } from "lucide-react";
import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import RecipeImage from "../../components/Recipes/RecipeImage";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import EmptyState from "../../components/Recipes/EmptyState";
import Button from "../../components/common/Button";

function CookingMode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipe, loading, error, refetch } = useRecipeDetails(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const steps = recipe?.steps || [];
  const step = steps[currentIndex];
  const totalSteps = steps.length;

  const progressPercent = totalSteps
    ? Math.round((currentIndex / totalSteps) * 100)
    : 0;

  const gatheredCount = useMemo(
    () => Object.values(checkedIngredients).filter(Boolean).length,
    [checkedIngredients]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Loading cooking steps..." />
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

  if (totalSteps === 0) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <EmptyState
          title="No cooking steps available"
          message="This recipe doesn't have step-by-step instructions yet."
        />
      </div>
    );
  }

  const goNext = () => {
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((i) => i + 1);
      setCheckedIngredients({});
    } else {
      navigate(`/recipes/${id}/complete`);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setCheckedIngredients({});
    }
  };

  const toggleIngredient = (key) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const stepIngredientCount = step.ingredients.length;
  const gatheredPercent = stepIngredientCount
    ? Math.round((gatheredCount / stepIngredientCount) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-28">
      <div className="mx-auto max-w-2xl px-4 pt-5 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
              Cooking Mode
            </p>
            <h1 className="truncate text-lg font-bold text-text-primary">
              {recipe.name}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/recipes/${id}`)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-text-primary shadow-sm transition hover:bg-slate/5"
            aria-label="Close cooking mode"
          >
            <X size={18} />
          </button>
        </div>

        {/* Overall progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate">
            <span>
              Step {currentIndex + 1} of {totalSteps} · {progressPercent}%
              complete
            </span>
            {step.durationMinutes != null && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> ~{step.durationMinutes} min
              </span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate/10">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step image */}
        <div className="relative mt-4 h-56 w-full overflow-hidden rounded-2xl sm:h-72">
          <RecipeImage
            src={recipe.imageUrl}
            alt={step.title}
            className="h-full w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm">
              <Play size={20} fill="currentColor" />
            </span>
          </div>
        </div>

        {/* Step title */}
        <h2 className="mt-5 text-xl font-bold text-text-primary">
          {step.title}
        </h2>
        <p className="mt-1 text-sm text-slate">
          Step {currentIndex + 1} of {totalSteps}
          {step.durationMinutes != null && ` · ~${step.durationMinutes} min`}
        </p>

        {/* Instructions */}
        {step.instructions.length > 0 && (
          <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate">
              Instructions
            </p>
            <ol className="mt-3 space-y-3">
              {step.instructions.map((line, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-text-primary">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary-dark">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Step ingredients */}
        {stepIngredientCount > 0 && (
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                Ingredients
              </p>
              <span className="text-[11px] text-slate">Tap to check off</span>
            </div>

            <ul className="mt-3 space-y-2.5">
              {step.ingredients.map((ingredient) => {
                const isChecked = !!checkedIngredients[ingredient.id];

                return (
                  <li key={ingredient.id}>
                    <button
                      type="button"
                      onClick={() => toggleIngredient(ingredient.id)}
                      className="flex w-full items-center gap-3 text-left"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] text-white transition ${
                          isChecked
                            ? "border-primary bg-primary"
                            : "border-slate/30"
                        }`}
                      >
                        {isChecked && "✓"}
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

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-slate">
                <span>
                  {gatheredCount} of {stepIngredientCount} gathered
                </span>
                <span>{gatheredPercent}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate/10">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${gatheredPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tip */}
        {step.tip && (
          <div className="mt-4 flex gap-3 rounded-2xl bg-light-purple/60 p-4">
            <Info size={18} className="mt-0.5 shrink-0 text-purple" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple">
                Chef's Tip
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-primary">
                {step.tip}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate/10 bg-white p-4">
        <div className="mx-auto flex max-w-2xl gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={goBack}
            disabled={currentIndex === 0}
            className="h-12 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </Button>
          <Button type="button" onClick={goNext} className="h-12">
            {currentIndex === totalSteps - 1 ? "Finish" : "Next Step"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookingMode;
