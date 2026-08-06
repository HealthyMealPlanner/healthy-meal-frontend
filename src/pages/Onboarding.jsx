import { useState } from "react";

import ProgressBar from "../components/onboarding/ProgressBar";
import OptionCard from "../components/onboarding/OptionCard";
import PreferenceStep from "../components/onboarding/PreferenceStep";
import NavigationButtons from "../components/onboarding/NavigationButtons";

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

    // احذفي السطر ده لو الـ Preferences اختيارية
    if (step === 3 && selectedPreference.length === 0) return;

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-8">
      <div className="w-[375px] rounded-[32px] bg-[#F4FAF6] px-4 py-6">

        {/* Progress */}
        <ProgressBar step={step} totalSteps={3} />

        {/* Logo */}
        <div className="mt-9 flex justify-center">
          <img
            src={Logo}
            alt="PureBite Logo"
            className="h-[59px] w-[69px] object-contain"
          />
        </div>

        {/* Title */}
        <div className="mx-auto mt-4 flex flex-col items-center">
          <h1 className="text-center text-[24px] font-semibold leading-6 text-[#0F172A]">
            {step === 1 ? (
              <>
                What is your main goal
                <br />
                with PureBite?
              </>
            ) : step === 2 ? (
              <>
                What's your typical
                <br />
                budget per meal?
              </>
            ) : (
              <>
                Any dietary preferences
                <br />
                or allergies?
              </>
            )}
          </h1>

          <p className="mx-auto mt-4 w-[256px] text-center text-[14px] leading-[18px] text-[#0F172A]/70">
            {step === 1
              ? "We'll tailor your AI recipe and budget recommendations based on this."
              : step === 2
              ? "This sets the default cost threshold for AI meal suggestions."
              : "Select all that apply so the AI never suggests food you can't eat."}
          </p>
        </div>

        {/* Content */}
        <div className="mt-8">
          {step === 1 ? (
            <div className="flex flex-col items-center gap-4">
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
            <div className="flex flex-col items-center gap-4">
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
            <PreferenceStep
              selectedPreference={selectedPreference}
              handlePreference={handlePreference}
            />
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          <NavigationButtons
            step={step}
            totalSteps={3}
            onNext={handleNext}
            onBack={handleBack}
            disabled={
              (step === 1 && !selectedGoal) ||
              (step === 2 && !selectedBudget) ||
              (step === 3 && selectedPreference.length === 0)
            }
          />
        </div>

      </div>
    </div>
  );
}

export default Onboarding;