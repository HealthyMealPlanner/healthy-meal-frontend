import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useState } from "react";

function RecipeGridCard({ recipe }) {
  const [saved, setSaved] = useState(false);
  const { image, title, calories, time, price } = recipe;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
      <div className="h-44 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-text-primary truncate mb-1">{title}</h3>
        <p className="text-sm text-slate mb-3">
          {calories} kcal · {time} min
        </p>

        <div className="h-px bg-gray-100 mb-3" />

        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="text-primary font-bold">EGP {price}</span>{" "}
            <span className="text-slate">per serving</span>
          </p>
          <button
            onClick={() => setSaved((v) => !v)}
            className="w-8 h-8 rounded-full bg-light flex items-center justify-center hover:bg-primary-light/60 transition-colors"
          >
            {saved ? (
              <FaBookmark className="text-primary text-sm" />
            ) : (
              <FaRegBookmark className="text-slate text-sm" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeGridCard;