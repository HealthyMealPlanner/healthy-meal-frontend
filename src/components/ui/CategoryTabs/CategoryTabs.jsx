import { useState } from "react";
import { FaWalking, FaRunning, FaHeartbeat } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";

const categories = [
  { label: "Weight Loss", icon: FaWalking },
  { label: "Sports Nutrition", icon: FaRunning },
  { label: "Clinical Nutrition", icon: FaHeartbeat },
  { label: "Pediatric Nutrition", icon: BsEmojiSmile },
];

function CategoryTabs() {
  const [active, setActive] = useState("Weight Loss");

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Explore Nutrition Specialties
      </h2>

      <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-start gap-3 lg:gap-2">
        {categories.map((cat) => {
          const isActive = active === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setActive(cat.label)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2.5 rounded-xl border-b-2 transition w-full lg:w-auto ${
                isActive
                  ? "bg-white border-primary shadow-sm"
                  : "bg-transparent border-transparent hover:bg-white/60"
              }`}
            >
              <cat.icon
                className={`text-base ${isActive ? "text-primary" : "text-slate/60"}`}
              />
              <span
                className={`text-[11px] font-medium whitespace-nowrap ${
                  isActive ? "text-primary" : "text-slate/70"
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryTabs;