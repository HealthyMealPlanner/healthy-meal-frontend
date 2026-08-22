import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaUserMd } from "react-icons/fa";

const actions = [
  { label: "Diet Plans", icon: FaLeaf, path: "/explore" },
  { label: "Book Doctor", icon: FaUserMd, path: null },
];

function QuickActions() {
  const navigate = useNavigate();
  const [comingSoonLabel, setComingSoonLabel] = useState(null);

  const handleClick = (item) => {
    if (item.path) {
      navigate(item.path);
      return;
    }

    // الصفحة دي لسه مش متاحة في المشروع
    setComingSoonLabel(item.label);
    setTimeout(() => setComingSoonLabel(null), 2000);
  };

  return (
    <div className="mb-5 lg:mb-10">
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
        {actions.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item)}
            className="flex items-center gap-2 lg:gap-2 bg-white rounded-xl lg:rounded-xl px-3 py-3 lg:px-4 lg:py-2.5 shadow-sm hover:shadow-md transition w-full lg:w-auto"
          >
            <span className="w-8 h-8 lg:w-7 lg:h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <item.icon className="text-white text-sm lg:text-xs" />
            </span>
            <span className="text-xs lg:text-sm font-semibold text-text-primary whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {comingSoonLabel && (
        <p className="mt-2 text-xs text-slate">
          {comingSoonLabel} is coming soon.
        </p>
      )}
    </div>
  );
}

export default QuickActions;