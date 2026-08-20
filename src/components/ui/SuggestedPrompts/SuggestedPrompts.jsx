import { FaShoppingCart, FaSun, FaBoxOpen, FaFire } from "react-icons/fa";

const PROMPTS = [
  { icon: FaShoppingCart, label: "Suggest a dinner under EGP 100" },
  { icon: FaSun, label: "Find a low-calorie breakfast" },
  { icon: FaBoxOpen, label: "Use what I have in my pantry" },
  { icon: FaFire, label: "Create a high-protein meal plan" },
];

function SuggestedPrompts({ onSelect }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate tracking-wide mb-3">SUGGESTED PROMPTS</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROMPTS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition text-left"
          >
            <span className="w-8 h-8 rounded-full bg-primary-light/60 flex items-center justify-center shrink-0">
              <Icon className="text-primary text-sm" />
            </span>
            <span className="text-sm font-medium text-text-primary">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestedPrompts;