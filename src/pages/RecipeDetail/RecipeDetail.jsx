import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaBookmark, FaClock, FaFire, FaUtensils } from "react-icons/fa";

// TODO: replace with a real GET /api/Recipes/{id} call — static mock
// matching the design mockup for now.
const MOCK_RECIPE = {
  title: "Grilled Chicken & Quinoa Salad",
  image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
  tags: ["High Protein", "Gluten Free"],
  time: 20,
  calories: 450,
  servings: 2,
  healthBenefit:
    "This meal is rich in high-quality lean protein and complex carbohydrates, perfect for muscle recovery and sustained energy.",
  ingredients: [
    { id: 1, name: "Chicken Breast", amount: "1/2 cup" },
    { id: 2, name: "Quinoa", amount: "1/2 cup" },
    { id: 3, name: "Cherry tomatoes", amount: "1/2 cup" },
    { id: 4, name: "Cucumber", amount: "1/2 cup" },
    { id: 5, name: "Avocado", amount: "1/2 whole" },
    { id: 6, name: "Feta cheese", amount: "50g" },
    { id: 7, name: "Olive oil", amount: "2 tbsp" },
    { id: 8, name: "Lemon juice", amount: "1 tbsp" },
  ],
};

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checked, setChecked] = useState([1, 2]); // pre-checked to match mockup
  const [saved, setSaved] = useState(false);

  const toggleIngredient = (ingredientId) => {
    setChecked((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((i) => i !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const recipe = MOCK_RECIPE; // TODO: fetch by `id`

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden h-[420px] mb-5">
            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />

            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <button
              onClick={() => setSaved((v) => !v)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary/90 hover:bg-primary-dark flex items-center justify-center text-white transition-colors"
            >
              <FaBookmark className="text-sm" />
            </button>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-3">{recipe.title}</h1>

          <div className="flex items-center gap-4 mb-4">
            {recipe.tags.map((tag) => (
              <span key={tag} className="text-sm font-semibold text-primary">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm text-text-primary shadow-sm">
              <FaClock className="text-slate text-xs" /> {recipe.time} mins
            </span>
            <span className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm text-text-primary shadow-sm">
              <FaFire className="text-orange text-xs" /> {recipe.calories} kcal
            </span>
            <span className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm text-text-primary shadow-sm">
              <FaUtensils className="text-slate text-xs" /> {recipe.servings} servings
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5">
            <p className="text-sm font-bold text-text-primary mb-2">🍅 HEALTH BENEFIT</p>
            <p className="text-sm text-slate leading-relaxed">{recipe.healthBenefit}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Ingredients</h2>
            <span className="text-sm text-slate">({recipe.ingredients.length} items)</span>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden mb-5">
            {recipe.ingredients.map((ing, i) => {
              const isChecked = checked.includes(ing.id);
              return (
                <button
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-left ${
                    i !== recipe.ingredients.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isChecked ? "bg-primary text-white" : "border-2 border-gray-300"
                      }`}
                    >
                      {isChecked && "✓"}
                    </span>
                    <span
                      className={`text-sm ${
                        isChecked ? "line-through text-slate" : "text-text-primary"
                      }`}
                    >
                      {ing.name}
                    </span>
                  </span>
                  <span className="text-sm text-slate">{ing.amount}</span>
                </button>
              );
            })}
          </div>

          <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-base py-3.5 rounded-xl transition-colors">
            Start Cooking
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;