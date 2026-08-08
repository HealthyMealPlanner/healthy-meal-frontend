import { useState } from "react";

import ProgressBar from "../components/Onboarding/ProgressBar";
import OptionCard from "../components/Onboarding/OptionCard";
import PreferenceStep from "../components/Onboarding/PreferenceStep";
import NavigationButtons from "../components/Onboarding/NavigationButtons";

import Logo from "../assets/icons/logo.png";

import { goalOptions } from "../data/onboardingData";
import { budgetOptions } from "../data/budgetData";

function Onboarding() {
  const [step, setStep] = useState(1);

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedPreference, setSelectedPreference] = useState([]);

  const handlePreference = (id) => {
    setSelectedPreference((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 1 && !selectedGoal) return;
    if (step === 2 && !selectedBudget) return;

    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      console.log({
        goal: selectedGoal,
        budget: selectedBudget,
        preferences: selectedPreference,
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const title =
    step === 1
      ? "What is your main goal with PureBite?"
      : step === 2
      ? "What’s your typical budget per meal?"
      : "What’s your dietary preference?";

  const description =
    step === 1
      ? "We'll tailor your AI recipe and budget recommendations based on this."
      : step === 2
      ? "This sets the default cost threshold for AI meal suggestions."
      : "Select all that apply so the AI never suggests food you can't eat.";

  const isDisabled =
    (step === 1 && !selectedGoal) ||
    (step === 2 && !selectedBudget);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#EAF8EC] px-4 py-4 sm:px-6 sm:py-5 md:px-8">

      {/* Main Container */}
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
            className="mt-1 text-[9px] font-semibold uppercase text-[#10B981] sm:text-[10px] md:text-[11px]"
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
                    onClick={() => setSelectedGoal(goal.id)}
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
                    onClick={() => setSelectedBudget(budget.id)}
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

        </main>
      </div>
    </div>
  );
}

export default Onboarding;