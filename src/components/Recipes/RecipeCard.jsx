import { useNavigate } from "react-router-dom";
import { Clock, Flame, Users } from "lucide-react";
import RecipeImage from "./RecipeImage";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const totalTime =
    (recipe.preparationTimeMinutes || 0) +
    (recipe.cookingTimeMinutes || 0);

  return (
    <button
      type="button"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate/10 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden sm:h-52">
        <RecipeImage
          src={recipe.imageUrl}
          alt={recipe.name}
          className="h-full w-full transition duration-300 group-hover:scale-105"
        />

        {recipe.isHealthy && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            Healthy
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-primary">
          {recipe.category || recipe.mealType}
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold text-text-primary sm:text-base">
          {recipe.name}
        </h3>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs text-slate">
          {totalTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {totalTime} mins
            </span>
          )}

          {recipe.calories != null && (
            <span className="flex items-center gap-1">
              <Flame size={14} className="text-orange" />
              {recipe.calories} kcal
            </span>
          )}

          {recipe.servings != null && (
            <span className="flex items-center gap-1">
              <Users size={14} />
              {recipe.servings}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default RecipeCard;