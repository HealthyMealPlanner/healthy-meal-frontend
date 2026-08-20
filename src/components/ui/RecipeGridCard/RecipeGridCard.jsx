import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Flame, Bookmark } from "lucide-react";
import RecipeImage from "../../Recipes/RecipeImage";

function RecipeGridCard({ recipe }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const totalTime =
    (recipe.preparationTimeMinutes || 0) + (recipe.cookingTimeMinutes || 0);

  return (
    <div
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="h-44 overflow-hidden">
        <RecipeImage
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-text-primary truncate mb-1">
          {recipe.name}
        </h3>

        <p className="flex items-center gap-3 text-sm text-slate mb-3">
          {recipe.calories != null && (
            <span className="flex items-center gap-1">
              <Flame size={13} className="text-orange" />
              {recipe.calories} kcal
            </span>
          )}
          {totalTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {totalTime} min
            </span>
          )}
        </p>

        <div className="h-px bg-gray-100 mb-3" />

        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {recipe.category || recipe.mealType}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved((v) => !v);
            }}
            className="w-8 h-8 rounded-full bg-light flex items-center justify-center hover:bg-primary-light/60 transition-colors"
          >
            <Bookmark
              size={15}
              className={saved ? "fill-primary text-primary" : "text-slate"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeGridCard;