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

// ========================================
// Defensive helpers for optional step fields.
// The current API always provides `stepNumber`, `instruction`,
// `ingredients` and `tip` on a step (see useRecipeDetails/recipeService).
// These helpers only render extra Figma-style details (a step title, a
// duration badge, or selectable choices) when the API response actually
// contains that data — nothing here is fabricated or hardcoded.
// ========================================
function getStepTitle(step, index) {
  return (
    step?.title ||
    step?.name ||
    step?.stepTitle ||
    `Step ${step?.stepNumber ?? index + 1}`
  );
}

function getStepDuration(step) {
  return (
    step?.durationMinutes ??
    step?.timeMinutes ??
    step?.duration ??
    null
  );
}

// Multiple-choice options for a step, e.g. alternative ingredients or
// techniques. Only used if the API actually returns an array for one of
// these field names — never invented.
function getStepOptions(step) {
  const options = step?.options ?? step?.choices ?? step?.alternatives;
  return Array.isArray(options) ? options : [];
}

function getOptionLabel(option, index) {
  return (
    (typeof option === "string" ? option : null) ??
    option?.label ??
    option?.name ??
    option?.title ??
    `Option ${index + 1}`
  );
}

function getOptionId(option, index) {
  return option?.id ?? option?.value ?? `option-${index}`;
}

// The API currently returns `instruction` as a single string per step.
// Some steps encode multiple actions in that string separated by line
// breaks — when that's the case we render them as a numbered list (as in
// the Figma design); a single-line instruction still renders as plain
// text exactly as before.
function getInstructionLines(instruction) {
  if (!instruction) return [];

  return String(instruction)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
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
  // Keyed by step index so a choice made on an earlier step isn't lost
  // when navigating back to it.
  const [selectedOptionByStep, setSelectedOptionByStep] = useState({});
  // Toggles the single media area between the image thumbnail (with a
  // play button) and the embedded video, so there is only ever ONE
  // video/media area on screen at a time.
  const [showVideo, setShowVideo] = useState(false);

  // ========================================
  // API data
  // ========================================
  // The Cooking Mode UI is a 5-step flow. We never fabricate steps: if
  // the recipe has fewer than 5 real steps from the API, all of them are
  // shown as-is (no padding). If it has more than 5, only the first 5
  // real steps are shown (no fake content is created — every step shown
  // is still real API data, just capped at 5).
  const rawSteps = Array.isArray(recipe?.steps)
    ? recipe.steps
    : [];

  const steps = rawSteps.slice(0, 5);

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
  // Step title / duration / choices (only rendered when the API
  // actually provides them — see helpers above)
  // ========================================
  const stepOptions = getStepOptions(step);
  const selectedOptionId = selectedOptionByStep[currentIndex] ?? null;
  const instructionLines = getInstructionLines(step?.instruction);

  const selectOption = (optionId) => {
    setSelectedOptionByStep((prev) => ({
      ...prev,
      [currentIndex]: optionId,
    }));
  };

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
    <div className="min-h-screen bg-main-bg font-jakarta pb-10 lg:ml-[88px] lg:pt-[77px]">
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
            {/* Recipe Media — ONE area only: shows the image with a play
                button when a video is available (tap to play it inline),
                falls back to the embedded video directly if there's no
                image, and to a placeholder if there's neither. */}
            {recipe.imageUrl && !(showVideo && youtubeEmbedUrl) && (
              <div className="relative aspect-[1.45] w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate/10">
                <RecipeImage
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="h-full w-full object-cover"
                />

                {youtubeEmbedUrl && (
                  <button
                    type="button"
                    onClick={() => setShowVideo(true)}
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

            {showVideo && youtubeEmbedUrl && (
              <div className="aspect-[1.45] w-full overflow-hidden rounded-2xl bg-black shadow-sm">
                <iframe
                  src={youtubeEmbedUrl}
                  title={`${recipe.name} video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}

            {!recipe.imageUrl && !youtubeEmbedUrl && (
              <div className="flex aspect-[1.45] w-full items-center justify-center rounded-2xl bg-slate/5 ring-1 ring-slate/10">
                <p className="text-sm text-slate">
                  No recipe image available
                </p>
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

                  const itemDuration = getStepDuration(item);

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
                        {getStepTitle(item, index)}
                      </span>

                      {itemDuration != null && (
                        <span className="text-[10px] text-slate">
                          {itemDuration} min
                        </span>
                      )}

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
                          className={`mt-1.5 max-w-[52px] truncate text-[8px] ${
                            isCurrent
                              ? "font-semibold text-primary"
                              : "text-slate"
                          }`}
                        >
                          {getStepTitle(item, index)}
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
                {getStepDuration(step) != null &&
                  ` · ~${getStepDuration(step)} min`}
              </p>

              <h1 className="mt-1 text-xl font-bold text-text-primary sm:text-2xl">
                {getStepTitle(step, currentIndex)}
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

                {instructionLines.length > 1 ? (
                  <ol className="mt-3 flex flex-col gap-2.5">
                    {instructionLines.map((line, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-text-primary"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-[11px] font-semibold text-primary-dark">
                          {index + 1}
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-text-primary">
                    {step.instruction}
                  </p>
                )}
              </div>
            )}

            {/* Choices — only rendered when the API provides options for
                this step (see getStepOptions). Nothing shown otherwise. */}
            {stepOptions.length > 0 && (
              <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                  Choose an Option
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {stepOptions.map((option, index) => {
                    const optionId = getOptionId(option, index);
                    const isSelected = selectedOptionId === optionId;

                    return (
                      <button
                        key={optionId}
                        type="button"
                        onClick={() => selectOption(optionId)}
                        aria-pressed={isSelected}
                        className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
                          isSelected
                            ? "border-primary bg-primary-light text-primary-dark"
                            : "border-slate/20 text-text-primary hover:bg-slate/5"
                        }`}
                      >
                        {getOptionLabel(option, index)}
                      </button>
                    );
                  })}
                </div>
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

            {/* Navigation */}
            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={goBack}
                disabled={currentIndex === 0}
                className="flex-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </Button>

              <Button type="button" onClick={goNext} className="flex-1">
                {currentIndex === totalSteps - 1
                  ? "Finish"
                  : "Next Step →"}
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CookingMode;