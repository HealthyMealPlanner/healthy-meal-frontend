import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import FilterSidebar from "../../components/ui/FilterSidebar/FilterSidebar";
import RecipeGridCard from "../../components/ui/RecipeGridCard/RecipeGridCard";
import { useRecipes } from "../../hooks/useRecipes";

function Explore() {
  const [query, setQuery] = useState("");
  const [maxCalories, setMaxCalories] = useState(800);

  const { recipes = [], loading, error, totalCount = 0 } = useRecipes(12);

  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  const filteredRecipes = safeRecipes.filter((r) => {
    if (!r) return false;
    const matchesQuery =
      query.trim() === "" ||
      (r.title && r.title.toLowerCase().includes(query.toLowerCase())) ||
      (r.name && r.name.toLowerCase().includes(query.toLowerCase()));
    const matchesCalories = r.calories == null || r.calories <= maxCalories;
    return matchesQuery && matchesCalories;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:pl-[110px] lg:pr-6 py-6 lg:py-8">
      <h1 className="text-3xl lg:text-[44px] font-bold text-text-primary mb-2">
        Explore
      </h1>
      <p className="text-slate text-base lg:text-lg mb-6">
        Discover meals, plans, and nutrition support tailored to your goals and budget.
      </p>

      {/* شريط البحث */}
      <div className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-3 mb-8 border border-gray-100">
        <FaSearch className="text-slate shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, meal kits, diet plans..."
          className="outline-none text-sm w-full placeholder:text-slate bg-transparent"
        />
      </div>

      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Diet Plans
      </h2>

      {/* التنسيق الجديد للشاشات الكبيرة */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* شريط الفلتر بعرض ثابت */}
        <div className="w-full lg:w-[260px] shrink-0">
          <FilterSidebar
            maxCalories={maxCalories}
            onChangeCalories={setMaxCalories}
          />
        </div>

        {/* كروت الوجبات تأخذ باقي المساحة بالكامل */}
        <div className="flex-1 w-full min-w-0">
          {loading ? (
            <p className="text-sm text-slate">Loading recipes...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Couldn't load recipes.</p>
          ) : (
            <>
              <p className="text-sm font-semibold text-[#00C07F] mb-4">
                {filteredRecipes.length} of {totalCount} results
              </p>

              {filteredRecipes.length === 0 ? (
                <p className="text-sm text-slate py-8 text-center">
                  No recipes found matching your criteria.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
                  {filteredRecipes.map((recipe, index) => (
                    <RecipeGridCard key={recipe?.id || index} recipe={recipe} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;