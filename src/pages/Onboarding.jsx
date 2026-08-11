import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/Onboarding/ProgressBar";
import OptionCard from "../components/Onboarding/OptionCard";
import PreferenceStep from "../components/Onboarding/PreferenceStep";
import NavigationButtons from "../components/Onboarding/NavigationButtons";

import Logo from "../assets/icons/logo.png";

import { goalOptions } from "../data/onboardingData";
import { budgetOptions } from "../data/budgetData";

function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedPreference, setSelectedPreference] = useState([]);

  const [loading, setLoading] = useState(false);

  // =========================
  // Dietary Preferences
  // =========================
  const handlePreference = (id) => {
    setSelectedPreference((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // =========================
  // Complete Onboarding
  // =========================
  const handleCompleteOnboarding = () => {
    if (loading) return;

    setLoading(true);

    // Save onboarding data locally for now.
    // We will send this data to the backend
    // later when the onboarding endpoint is available.
    const onboardingData = {
      goal: selectedGoal,
      budget: selectedBudget,
      preferences: selectedPreference,
    };

    localStorage.setItem(
      "onboardingData",
      JSON.stringify(onboardingData)
    );

    // Mark onboarding as completed
    localStorage.setItem(
      "onboardingCompleted",
      "true"
    );

    console.log(
      "Onboarding completed successfully:",
      onboardingData
    );

    // Go directly to Home
    navigate("/home", {
      replace: true,
    });

    setLoading(false);
  };

  // =========================
  // Next
  // =========================
  const handleNext = () => {
    // Step 1 validation
    if (step === 1 && !selectedGoal) {
      return;
    }

    // Step 2 validation
    if (step === 2 && !selectedBudget) {
      return;
    }

    // Step 1 → Step 2
    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    // Step 3 → Home
    handleCompleteOnboarding();
  };

  // =========================
  // Back
  // =========================
  const handleBack = () => {
    if (loading) return;

    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // =========================
  // Skip
  // =========================
  const handleSkip = () => {
    if (loading) return;

    // Mark onboarding as completed
    localStorage.setItem(
      "onboardingCompleted",
      "true"
    );

    navigate("/home", {
      replace: true,
    });
  };

  // =========================
  // Titles
  // =========================
  const title =
    step === 1
      ? "What is your main goal with PureBite?"
      : step === 2
      ? "What’s your typical budget per meal?"
      : "What’s your dietary preference?";

  // =========================
  // Descriptions
  // =========================
  const description =
    step === 1
      ? "We'll tailor your AI recipe and budget recommendations based on this."
      : step === 2
      ? "This sets the default cost threshold for AI meal suggestions."
      : "Select all that apply so the AI never suggests food you can't eat.";

  // =========================
  // Disable Next
  // =========================
  const isDisabled =
    loading ||
    (step === 1 && !selectedGoal) ||
    (step === 2 && !selectedBudget);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#EAF8EC] px-4 py-4 sm:px-6 sm:py-5 md:px-8">
      <div className="mx-auto w-full max-w-[820px]">

        {/* Header */}
        <header className="flex w-full items-start justify-between">

          {/* Logo */}
          <img
            src={Logo}
            alt="PureBite"
            className="h-auto w-[78px] object-contain sm:w-[88px] md:w-[96px]"
          />

          {/* Skip */}
          <button
            type="button"
            onClick={handleSkip}
            disabled={loading}
            className="mt-1 text-[9px] font-semibold uppercase text-[#10B981] disabled:cursor-not-allowed disabled:opacity-50 sm:text-[10px] md:text-[11px]"
          >
            Skip
          </button>
        </header>

        {/* Progress */}
        <div className="mt-7 w-full sm:mt-8">
          <ProgressBar
            step={step}
            totalSteps={3}
          />
        </div>

        {/* White Card */}
        <main className="mt-6 w-full rounded-[24px] bg-white px-6 py-6 shadow-sm sm:mt-7 sm:px-10 sm:py-7 md:px-12">

          {/* Step */}
          <p className="text-center text-[11px] font-medium uppercase text-[#10B981]">
            STEP {step} OF 3
          </p>

          {/* Title */}
          <h1 className="mx-auto mt-2 max-w-[650px] text-center text-[23px] font-semibold leading-[29px] text-[#0F172A] sm:text-[25px] md:text-[26px]">
            {title}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-1 max-w-[550px] text-center text-[11px] leading-[15px] text-[#94A3B8] sm:text-[12px]">
            {description}
          </p>

          {/* Content */}
          <div className="mt-7 sm:mt-8">

            {/* Step 1 */}
            {step === 1 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {goalOptions.map((goal) => (
                  <OptionCard
                    key={goal.id}
                    title={goal.title}
                    description={goal.description}
                    icon={goal.icon}
                    selected={selectedGoal === goal.id}
                    onClick={() =>
                      setSelectedGoal(goal.id)
                    }
                  />
                ))}
              </div>

            ) : step === 2 ? (

              /* Step 2 */
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {budgetOptions.map((budget) => (
                  <OptionCard
                    key={budget.id}
                    title={budget.title}
                    description={budget.description}
                    icon={budget.icon}
                    selected={selectedBudget === budget.id}
                    onClick={() =>
                      setSelectedBudget(budget.id)
                    }
                  />
                ))}
              </div>

            ) : (

              /* Step 3 */
              <PreferenceStep
                selectedPreference={selectedPreference}
                handlePreference={handlePreference}
              />
            )}
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-[#E2E8F0] sm:my-7" />

          {/* Navigation */}
          <NavigationButtons
            step={step}
            totalSteps={3}
            onNext={handleNext}
            onBack={handleBack}
            disabled={isDisabled}
          />

          {/* Saving message */}
          {loading && (
            <p className="mt-3 text-center text-xs text-[#10B981]">
              Finishing onboarding...
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Onboarding;