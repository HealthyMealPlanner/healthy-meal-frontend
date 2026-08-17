import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Clock,
  Info,
  Play,
  X,
} from "lucide-react";

import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import RecipeImage from "../../components/Recipes/RecipeImage";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import EmptyState from "../../components/Recipes/EmptyState";
import Button from "../../components/common/Button";

// ========================================
// Convert YouTube URL to embed URL
// ========================================
function getYoutubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsedUrl.pathname.includes("/embed/")) {
        return url;
      }
    }

    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function CookingMode() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    recipe,
    loading,
    error,
    refetch,
  } = useRecipeDetails(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkedIngredients, setCheckedIngredients] =
    useState({});

  // ========================================
  // API data
  // ========================================
  const steps = Array.isArray(recipe?.steps)
    ? recipe.steps
    : [];

  const totalSteps = steps.length;

  const step = steps[currentIndex];

  const youtubeEmbedUrl = getYoutubeEmbedUrl(
    recipe?.youtubeUrl
  );

  // ========================================
  // Progress
  // ========================================
  const progressPercent = totalSteps
    ? Math.round(
        ((currentIndex + 1) / totalSteps) * 100
      )
    : 0;

  // ========================================
  // Ingredients
  // ========================================
  const stepIngredients = Array.isArray(
    step?.ingredients
  )
    ? step.ingredients
    : [];

  const gatheredCount = useMemo(() => {
    return Object.values(checkedIngredients).filter(Boolean)
      .length;
  }, [checkedIngredients]);

  const gatheredPercent = stepIngredients.length
    ? Math.round(
        (gatheredCount / stepIngredients.length) * 100
      )
    : 0;

  // ========================================
  // Loading
  // ========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Loading cooking steps..." />
      </div>
    );
  }

  // ========================================
  // Error
  // ========================================
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

  // ========================================
  // No recipe
  // ========================================
  if (!recipe) {
    return null;
  }

  // ========================================
  // No steps
  // ========================================
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

  // ========================================
  // Navigation
  // ========================================
  const goNext = () => {
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((index) => index + 1);
      setCheckedIngredients({});
    } else {
      navigate(`/recipes/${id}/complete`);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
      setCheckedIngredients({});
    }
  };

  const toggleIngredient = (ingredientKey) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredientKey]: !prev[ingredientKey],
    }));
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-24 lg:ml-[88px] lg:pt-[77px]">
      <main className="mx-auto w-full max-w-[1120px] px-5 py-6 sm:px-8 lg:px-10">
        {/* ========================================
            Breadcrumb
        ======================================== */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate">
            <span>Home</span>
            <ChevronRight size={12} />
            <span>Recipe</span>
            <ChevronRight size={12} />
            <span className="font-medium text-text-primary">
              Steps
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/recipes/${id}`)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-sm ring-1 ring-slate/10 transition hover:bg-slate/5"
            aria-label="Close cooking mode"
          >
            <X size={17} />
          </button>
        </div>

        {/* ========================================
            Main Layout
        ======================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ======================================
              LEFT COLUMN
          ======================================= */}
          <section>
            {/* Recipe Image */}
            {recipe.imageUrl && (
              <div className="relative aspect-[1.45] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate/10">
                <RecipeImage
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="h-full w-full object-cover"
                />

                {recipe.youtubeUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        recipe.youtubeUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                    aria-label="Play recipe video"
                  >
                    <Play
                      size={19}
                      fill="currentColor"
                      className="ml-0.5 text-primary"
                    />
                  </button>
                )}
              </div>
            )}

            {/* No image message */}
            {!recipe.imageUrl && (
              <div className="flex aspect-[1.45] w-full items-center justify-center rounded-2xl bg-slate/5 ring-1 ring-slate/10">
                <p className="text-sm text-slate">
                  No recipe image available
                </p>
              </div>
            )}

            {/* Embedded YouTube */}
            {youtubeEmbedUrl && (
              <div className="mt-4 overflow-hidden rounded-2xl bg-black shadow-sm">
                <div className="aspect-video w-full">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${recipe.name} video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* All Steps Overview */}
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-slate">
                All Steps Overview
              </p>

              <div className="overflow-hidden rounded-xl border border-slate/10">
                {steps.map((item, index) => {
                  const isCurrent =
                    index === currentIndex;

                  const isCompleted =
                    index < currentIndex;

                  return (
                    <button
                      key={item.stepNumber ?? index}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(index);
                        setCheckedIngredients({});
                      }}
                      className={`flex w-full items-center gap-3 border-b border-slate/10 px-3 py-2.5 text-left last:border-b-0 transition ${
                        isCurrent
                          ? "bg-primary-light/40"
                          : "bg-white hover:bg-slate/5"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${
                          isCompleted || isCurrent
                            ? "bg-primary text-white"
                            : "border border-slate/20 text-slate"
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={11} />
                        ) : (
                          item.stepNumber ?? index + 1
                        )}
                      </span>

                      <span
                        className={`flex-1 text-[11px] font-medium ${
                          isCurrent
                            ? "text-primary"
                            : "text-text-primary"
                        }`}
                      >
                        Step {item.stepNumber ?? index + 1}
                      </span>

                      <ChevronRight
                        size={12}
                        className="text-slate"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ======================================
              RIGHT COLUMN
          ======================================= */}
          <section>
            {/* Step Progress */}
            <div className="mb-5">
              <div className="flex items-center justify-between">
                {steps.map((item, index) => {
                  const isCurrent =
                    index === currentIndex;

                  const isCompleted =
                    index < currentIndex;

                  return (
                    <div
                      key={item.stepNumber ?? index}
                      className="flex flex-1 items-center"
                    >
                      <div className="flex flex-col items-center">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold ${
                            isCurrent || isCompleted
                              ? "bg-primary text-white"
                              : "bg-slate/10 text-slate"
                          }`}
                        >
                          {isCompleted ? (
                            <Check size={11} />
                          ) : (
                            index + 1
                          )}
                        </span>

                        <span
                          className={`mt-1.5 text-[8px] ${
                            isCurrent
                              ? "font-semibold text-primary"
                              : "text-slate"
                          }`}
                        >
                          Step {item.stepNumber ?? index + 1}
                        </span>
                      </div>

                      {index < steps.length - 1 && (
                        <div
                          className={`mx-1 h-[2px] flex-1 ${
                            index < currentIndex
                              ? "bg-primary"
                              : "bg-slate/10"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Step */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                Step {step.stepNumber ?? currentIndex + 1}{" "}
                of {totalSteps}
              </p>

              <h1 className="mt-1 text-xl font-bold text-text-primary sm:text-2xl">
                Step {step.stepNumber ?? currentIndex + 1}
              </h1>
            </div>

            {/* Progress */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] text-slate">
                <span>
                  Step {currentIndex + 1} of {totalSteps}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {progressPercent}% complete
                </span>
              </div>

              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate/10">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </div>
            </div>

            {/* Instructions */}
            {step.instruction && (
              <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                  Instructions
                </p>

                <p className="mt-3 text-sm leading-relaxed text-text-primary">
                  {step.instruction}
                </p>
              </div>
            )}

            {/* Ingredients */}
            {stepIngredients.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                    Ingredients
                  </p>

                  <span className="text-[9px] text-slate">
                    Tap to check off
                  </span>
                </div>

                <div className="mt-2 overflow-hidden rounded-xl border border-slate/10 bg-white">
                  {stepIngredients.map(
                    (ingredient, index) => {
                      const ingredientKey =
                        ingredient.id ??
                        `${ingredient.name ?? "ingredient"}-${index}`;

                      const isChecked =
                        !!checkedIngredients[
                          ingredientKey
                        ];

                      return (
                        <button
                          key={ingredientKey}
                          type="button"
                          onClick={() =>
                            toggleIngredient(
                              ingredientKey
                            )
                          }
                          className={`flex w-full items-center gap-3 border-b border-slate/10 px-3 py-2.5 text-left last:border-b-0 ${
                            isChecked
                              ? "bg-primary-light/40"
                              : "bg-white"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              isChecked
                                ? "border-primary bg-primary text-white"
                                : "border-slate/30"
                            }`}
                          >
                            {isChecked && (
                              <Check size={10} />
                            )}
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

                          {(ingredient.amount ||
                            ingredient.unit) && (
                            <span className="text-xs text-slate">
                              {ingredient.amount}{" "}
                              {ingredient.unit}
                            </span>
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[9px] text-slate">
                    <span>
                      {gatheredCount} of{" "}
                      {stepIngredients.length} gathered
                    </span>

                    <span>
                      {gatheredPercent}%
                    </span>
                  </div>

                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate/10">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${gatheredPercent}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chef Tip */}
            {step.tip && (
              <div className="mt-5 flex gap-3 rounded-xl bg-light-purple/50 p-3.5">
                <Info
                  size={15}
                  className="mt-0.5 shrink-0 text-purple"
                />

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-purple">
                    Chef's Tip
                  </p>

                  <p className="mt-1 text-[10px] leading-relaxed text-text-primary">
                    {step.tip}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Bottom Buttons */}
      <div className="fixed bottom-6 right-8 z-20 flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={goBack}
          disabled={currentIndex === 0}
          className="h-10 w-[160px] text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={goNext}
          className="h-10 w-[160px] text-xs"
        >
          {currentIndex === totalSteps - 1
            ? "Finish"
            : "Next Step →"}
        </Button>
      </div>
    </div>
  );
}

export default CookingMode;