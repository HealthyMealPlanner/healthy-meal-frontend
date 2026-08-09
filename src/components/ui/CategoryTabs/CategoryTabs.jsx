import { useState } from "react";
import { FaWalking, FaRunning, FaHeartbeat, FaLeaf } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { useCategories } from "../../../hooks/useCategories";

// The API doesn't return icons — cycle through a fixed icon set by index
// so every category still gets a visual, regardless of its name.
const ICONS = [FaWalking, FaRunning, FaHeartbeat, BsEmojiSmile, FaLeaf];

function CategoryTabs() {
  const { categories, loading, error } = useCategories();
  const [activeId, setActiveId] = useState(null);

  if (loading) {
    return <div className="mb-5 lg:mb-4 text-sm text-slate">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="mb-5 lg:mb-4 text-sm text-red-500">
        Couldn't load categories.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 lg:gap-3 mb-5 lg:mb-4 w-full lg:flex-wrap">
      {categories.map((cat, i) => {
        const Icon = ICONS[i % ICONS.length];
        const isActive = activeId ? activeId === cat.id : i === 0;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className={`flex items-center justify-center gap-1 lg:gap-2 py-2 lg:py-3 rounded-full lg:rounded-xl text-[11px] lg:text-sm border-b-2 lg:border transition ${
              isActive
                ? "flex-shrink-0 bg-white text-primary border-primary font-semibold px-3 lg:px-5 shadow-sm"
                : "flex-1 lg:flex-initial text-slate border-transparent font-medium px-1 lg:px-5 lg:hover:bg-white/60"
            }`}
          >
            <span className="text-xs lg:text-base flex-shrink-0">
              <Icon />
            </span>
            <span className="whitespace-nowrap">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;