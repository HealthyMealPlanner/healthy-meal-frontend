import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Info,
  X,
  Check,
  ChevronRight,
} from "lucide-react";

import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";
import Button from "../../components/common/Button";

// ======================================================
// YouTube URL -> Embed URL
// ======================================================
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

      // Already an embed URL
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

  // ======================================================
  // Hooks
  // ======================================================
  const [currentIndex, setCurrentIndex] = useState(0);

  const [checkedIngredients, setCheckedIngredients] =
    useState({});

  // ======================================================
  // Loading
  // ======================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Loading cooking steps..." />
      </div>
    );
  }

  // ======================================================
  // Error
  // ======================================================
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

  // ======================================================
  // No recipe
  // ======================================================
  if (!recipe) {
    return null;
  }

  // ======================================================
  // API Ingredients
  // Swagger:
  // id, name, quantity, unit, note
  // ======================================================
  const ingredients = Array.isArray(
    recipe.ingredients
  )
    ? recipe.ingredients
    : [];

  // ======================================================
  // API Steps
  // Swagger:
  // stepNumber, instruction
  // ======================================================
  const steps = Array.isArray(recipe.steps)
    ? recipe.steps
    : [];

  // ======================================================
  // If there are no steps from API
  // ======================================================
  if (steps.length === 0) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
          <div className="w-full rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate/10">
            <h1 className="text-lg font-semibold text-text-primary">
              No cooking steps available
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate">
              This recipe does not have cooking steps
              in the API yet.
            </p>

            <Button
              type="button"
              onClick={() =>
                navigate(`/recipes/${id}`)
              }
              className="mt-5 h-11"
            >
              Back to Recipe
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ======================================================
  // Current step safety
  // ======================================================
  const safeCurrentIndex = Math.min(
    currentIndex,
    steps.length - 1
  );

  const step = steps[safeCurrentIndex];

  // ======================================================
  // REAL API VIDEO ONLY
  // ======================================================
  const youtubeUrl = recipe.youtubeUrl || null;

  const youtubeEmbedUrl =
    getYoutubeEmbedUrl(youtubeUrl);

  // ======================================================
  // Progress
  // ======================================================
  const totalSteps = steps.length;

  const progressPercent = Math.round(
    ((safeCurrentIndex + 1) / totalSteps) * 100
  );

  // ======================================================
  // Ingredient Progress
  // ======================================================
  const gatheredCount = Object.values(
    checkedIngredients
  ).filter(Boolean).length;

  const gatheredPercent =
    ingredients.length > 0
      ? Math.round(
          (gatheredCount / ingredients.length) * 100
        )
      : 0;

  // ======================================================
  // Next
  // ======================================================
  const goNext = () => {
    if (safeCurrentIndex < totalSteps - 1) {
      setCurrentIndex(
        (index) => index + 1
      );

      setCheckedIngredients({});
      return;
    }

    navigate(`/recipes/${id}/complete`);
  };

  // ======================================================
  // Back
  // ======================================================
  const goBack = () => {
    if (safeCurrentIndex > 0) {
      setCurrentIndex(
        (index) => index - 1
      );

      setCheckedIngredients({});
    }
  };

  // ======================================================
  // Toggle ingredient
  // ======================================================
  const toggleIngredient = (ingredientKey) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [ingredientKey]:
        !prev[ingredientKey],
    }));
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-24 lg:ml-[88px] lg:pt-[77px]">
      <main className="mx-auto w-full max-w-[1120px] px-5 py-6 sm:px-8 lg:px-10">

        {/* ==================================================
            HEADER
        =================================================== */}
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
            onClick={() =>
              navigate(`/recipes/${id}`)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-sm ring-1 ring-slate/10 transition hover:bg-slate/5"
            aria-label="Close cooking mode"
          >
            <X size={17} />
          </button>
        </div>

        {/* ==================================================
            MAIN LAYOUT
        =================================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">

          {/* =================================================
              LEFT COLUMN
          ================================================== */}
          <section>

            {/* =================================================
                REAL API VIDEO ONLY
            ================================================== */}
            {youtubeEmbedUrl ? (
              <div className="overflow-hidden rounded-2xl bg-black shadow-sm ring-1 ring-slate/10">
                <div className="aspect-video w-full">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${recipe.name} cooking video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate/10">
                <div className="px-6 text-center">
                  <p className="text-sm font-medium text-text-primary">
                    No recipe video available
                  </p>

                  <p className="mt-1 text-xs text-slate">
                    Add a valid youtubeUrl to this
                    recipe in the API.
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                ALL STEPS OVERVIEW
            ================================================== */}
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                  All Steps Overview
                </p>

                <span className="text-[10px] text-slate">
                  {totalSteps} steps
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate/10">
                {steps.map((item, index) => {
                  const isCurrent =
                    index === safeCurrentIndex;

                  const isCompleted =
                    index < safeCurrentIndex;

                  return (
                    <button
                      key={
                        item?.stepNumber ??
                        `step-${index}`
                      }
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
                          isCompleted ||
                          isCurrent
                            ? "bg-primary text-white"
                            : "border border-slate/20 text-slate"
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={11} />
                        ) : (
                          item?.stepNumber ??
                          index + 1
                        )}
                      </span>

                      <span
                        className={`flex-1 text-[11px] font-medium ${
                          isCurrent
                            ? "text-primary"
                            : "text-text-primary"
                        }`}
                      >
                        Step{" "}
                        {item?.stepNumber ??
                          index + 1}
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

          {/* =================================================
              RIGHT COLUMN
          ================================================== */}
          <section>

            {/* =================================================
                STEP PROGRESS
            ================================================== */}
            <div className="mb-5">
              <div className="flex items-center justify-between">
                {steps.map((item, index) => {
                  const isCurrent =
                    index === safeCurrentIndex;

                  const isCompleted =
                    index < safeCurrentIndex;

                  return (
                    <div
                      key={
                        item?.stepNumber ??
                        `progress-${index}`
                      }
                      className="flex flex-1 items-center"
                    >
                      <div className="flex flex-col items-center">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold ${
                            isCurrent ||
                            isCompleted
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
                          Step{" "}
                          {item?.stepNumber ??
                            index + 1}
                        </span>
                      </div>

                      {index <
                        steps.length - 1 && (
                        <div
                          className={`mx-1 h-[2px] flex-1 ${
                            index < safeCurrentIndex
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

            {/* =================================================
                STEP TITLE
            ================================================== */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                Step{" "}
                {step?.stepNumber ??
                  safeCurrentIndex + 1}{" "}
                of {totalSteps}
              </p>

              <h1 className="mt-1 text-xl font-bold text-text-primary sm:text-2xl">
                Step{" "}
                {step?.stepNumber ??
                  safeCurrentIndex + 1}
              </h1>
            </div>

            {/* =================================================
                PROGRESS BAR
            ================================================== */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] text-slate">
                <span>
                  Step {safeCurrentIndex + 1} of{" "}
                  {totalSteps}
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

            {/* =================================================
                INSTRUCTIONS
            ================================================== */}
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                Instructions
              </p>

              <p className="mt-3 text-sm leading-relaxed text-text-primary">
                {step?.instruction ||
                  "No instructions are available for this step."}
              </p>
            </div>

            {/* =================================================
                INGREDIENTS
            ================================================== */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                  Ingredients
                </p>

                <span className="text-[9px] text-slate">
                  {ingredients.length} items
                </span>
              </div>

              {ingredients.length === 0 ? (
                <div className="mt-2 rounded-xl border border-slate/10 bg-white p-4">
                  <p className="text-sm text-slate">
                    No ingredients are available for
                    this recipe yet.
                  </p>
                </div>
              ) : (
                <div className="mt-2 overflow-hidden rounded-xl border border-slate/10 bg-white">
                  {ingredients.map(
                    (ingredient, index) => {
                      const ingredientKey =
                        ingredient?.id ??
                        `${ingredient?.name ?? "ingredient"}-${index}`;

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
                          className={`flex w-full items-start gap-3 border-b border-slate/10 px-3 py-2.5 text-left last:border-b-0 ${
                            isChecked
                              ? "bg-primary-light/40"
                              : "bg-white"
                          }`}
                        >
                          {/* Checkbox */}
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              isChecked
                                ? "border-primary bg-primary text-white"
                                : "border-slate/30"
                            }`}
                          >
                            {isChecked && (
                              <Check size={10} />
                            )}
                          </span>

                          {/* Name / Note */}
                          <span className="flex-1">
                            <span
                              className={`block text-sm ${
                                isChecked
                                  ? "text-slate/50 line-through"
                                  : "text-text-primary"
                              }`}
                            >
                              {ingredient?.name ||
                                "Ingredient"}
                            </span>

                            {ingredient?.note && (
                              <span className="mt-0.5 block text-[11px] text-slate">
                                {ingredient.note}
                              </span>
                            )}
                          </span>

                          {/* Quantity / Unit */}
                          <span className="shrink-0 text-xs text-slate">
                            {ingredient?.quantity ?? ""}
                            {ingredient?.unit
                              ? ` ${ingredient.unit}`
                              : ""}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              )}

              {/* Ingredient progress */}
              {ingredients.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[9px] text-slate">
                    <span>
                      {gatheredCount} of{" "}
                      {ingredients.length} gathered
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
              )}
            </div>

            {/* =================================================
                CHEF TIP
            ================================================== */}
            {step?.tip && (
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

      {/* ==================================================
          BOTTOM BUTTONS
      ================================================== */}
      <div className="fixed bottom-6 right-8 z-20 flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={goBack}
          disabled={safeCurrentIndex === 0}
          className="h-10 w-[160px] text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={goNext}
          className="h-10 w-[160px] text-xs"
        >
          {safeCurrentIndex === totalSteps - 1
            ? "Finish"
            : "Next Step →"}
        </Button>
      </div>
    </div>
  );
}

export default CookingMode;