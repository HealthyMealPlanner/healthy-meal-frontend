import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import FilterSidebar from "../../components/ui/FilterSidebar/FilterSidebar";
import ActiveFilterChips from "../../components/ui/ActiveFilterChips/ActiveFilterChips";
import RecipeGridCard from "../../components/ui/RecipeGridCard/RecipeGridCard";
import DoctorListCard from "../../components/ui/DoctorListCard/DoctorListCard";
import { useDoctors } from "../../hooks/useDoctors";

const TABS = [
  { key: "diet-plans", label: "Diet Plans" },
  { key: "doctors", label: "Doctors" },
  { key: "articles", label: "Articles" },
];

// TODO: replace with real /Recipes call using the same pattern as Home.
const RECIPES = [
  { id: 1, title: "Honey Mustard Chicken Salad", calories: 320, time: 20, price: 45, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Spiced Lentil & Spinach Stew", calories: 450, time: 25, price: 35, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Classic Egyptian Koshary", calories: 580, time: 45, price: 22, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "Stuffed Sweet Potatoes", calories: 390, time: 35, price: 28, image: "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?q=80&w=600&auto=format&fit=crop" },
  { id: 5, title: "Grilled Chicken & Quinoa Bowl", calories: 410, time: 30, price: 55, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop" },
  { id: 6, title: "Mediterranean Chickpea Salad", calories: 280, time: 15, price: 30, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop" },
];

function Explore() {
  const [activeTab, setActiveTab] = useState("diet-plans");
  const [query, setQuery] = useState("");
  const { doctors, loading: doctorsLoading, error: doctorsError } = useDoctors();

  const [filters, setFilters] = useState({
    budget: 300,
    calories: 800,
    prepTime: ["15-30 min"],
    fee: 300,
    dateFrom: "",
    dateTo: "",
    specialties: ["Weight Mgmt", "Diabetes"],
  });

  const resetFilters = () =>
    setFilters({
      budget: 300,
      calories: 800,
      prepTime: [],
      fee: 300,
      dateFrom: "",
      dateTo: "",
      specialties: [],
    });

  const chips = useMemo(() => {
    if (activeTab !== "doctors") return [];
    const list = [];
    filters.specialties.forEach((s) => list.push({ key: `spec-${s}`, label: s }));
    if (filters.calories < 800) list.push({ key: "kcal", label: `Under ${filters.calories}kcal` });
    if (filters.fee < 300) list.push({ key: "fee", label: `Under ${filters.fee}EGP` });
    return list;
  }, [activeTab, filters]);

  const removeChip = (key) => {
    if (key.startsWith("spec-")) {
      const value = key.replace("spec-", "");
      setFilters((f) => ({ ...f, specialties: f.specialties.filter((s) => s !== value) }));
    } else if (key === "kcal") {
      setFilters((f) => ({ ...f, calories: 800 }));
    } else if (key === "fee") {
      setFilters((f) => ({ ...f, fee: 300 }));
    }
  };

  const filteredRecipes = RECIPES.filter(
    (r) => r.price <= filters.budget && r.calories <= filters.calories
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6 lg:py-8">
      <h1 className="text-3xl lg:text-[44px] font-bold text-text-primary mb-2">Explore</h1>
      <p className="text-slate text-base lg:text-lg mb-6">
        Discover meals, plans, and nutrition support tailored to your goals and budget.
      </p>

      <div className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-3 mb-6">
        <FaSearch className="text-slate shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes, meal kits, diet plans..."
          className="outline-none text-sm w-full placeholder:text-slate bg-transparent"
        />
      </div>

      <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-base font-semibold border-b-2 transition-colors ${
              activeTab === tab.key
                ? "text-primary border-primary"
                : "text-slate border-transparent hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "articles" ? (
        <p className="text-sm text-slate">Articles are coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <FilterSidebar tab={activeTab} filters={filters} onChange={setFilters} onReset={resetFilters} />

          <div>
            <ActiveFilterChips chips={chips} onRemove={removeChip} onClearAll={resetFilters} />

            {activeTab === "diet-plans" ? (
              <>
                <p className="text-sm font-semibold text-primary mb-4">{filteredRecipes.length} results</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredRecipes.map((recipe) => (
                    <RecipeGridCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : doctorsLoading ? (
              <p className="text-sm text-slate">Loading doctors...</p>
            ) : doctorsError ? (
              <p className="text-sm text-red-500">Couldn't load doctors.</p>
            ) : doctors.length === 0 ? (
              <p className="text-sm text-slate">No doctors found.</p>
            ) : (
              <>
                <p className="text-sm font-semibold text-primary mb-4">{doctors.length} results</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {doctors.map((doctor) => (
                    <DoctorListCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;