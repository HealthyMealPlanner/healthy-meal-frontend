import { useEffect, useState } from "react";
import { getRecipeById } from "../services/recipeService";

export function useRecipeDetails(id) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!id) {
      setRecipe(null);
      setLoading(false);
      setError("Recipe ID is missing.");
      return;
    }

    let ignore = false;

    async function loadRecipe() {
      setLoading(true);
      setError("");

      try {
        const data = await getRecipeById(id);

        if (ignore) return;

        /*
         * In case the service returns:
         * { data: {...} }
         * instead of directly returning the recipe.
         */
        const recipeData = data?.data ?? data;

        if (!recipeData) {
          throw new Error("Recipe not found.");
        }

        setRecipe(recipeData);
      } catch (err) {
        if (ignore) return;

        console.error("Failed to fetch recipe:", err);

        setRecipe(null);

        setError(
          err?.message || "Failed to load recipe details."
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadRecipe();

    return () => {
      ignore = true;
    };
  }, [id, reloadToken]);

  const refetch = () => {
    setReloadToken((token) => token + 1);
  };

  return {
    recipe,
    loading,
    error,
    refetch,
  };
}