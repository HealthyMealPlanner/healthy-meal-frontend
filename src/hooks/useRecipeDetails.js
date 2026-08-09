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
      return;
    }

    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getRecipeById(id);

        if (!ignore) {
          setRecipe(data);
        }
      } catch (err) {
        if (!ignore) {
          setRecipe(null);
          setError(
            err?.message ||
              "Failed to load recipe details."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

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