import { FaLeaf, FaUserMd, FaTint } from "react-icons/fa";

const actions = [
  { label: "Diet Plans", icon: FaLeaf },
  { label: "Book Doctor", icon: FaUserMd },
  { label: "Calorie", icon: FaTint },
];

function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 mb-5 lg:mb-10">
      {actions.map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-2 lg:gap-3 bg-white rounded-2xl px-3 py-3 lg:px-5 lg:py-4 shadow-sm hover:shadow-md transition text-left"
        >
          <span className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <item.icon className="text-white text-sm" />
          </span>
          <span className="text-xs lg:text-base font-semibold text-text-primary whitespace-nowrap">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default QuickActions;