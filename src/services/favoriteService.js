const API_URL =
  "https://healthymealplanner-production.runasp.net/api";

// =========================
// Get JWT Token
// =========================
const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You must be logged in to use favorites.");
  }

  return token;
};

// =========================
// Build Headers
// =========================
const getAuthHeaders = () => {
  const token = getToken();

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

// =========================
// Get Favorite Recipes
// GET /FavoriteRecipes
// =========================
export const getFavorites = async () => {
  const response = await fetch(
    `${API_URL}/FavoriteRecipes`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    let message = "Failed to load favorite recipes.";

    try {
      const data = await response.json();

      message =
        data?.message ||
        data?.title ||
        message;
    } catch {
      // Ignore non-JSON response
    }

    throw new Error(message);
  }

  return response.json();
};

// =========================
// Add Favorite Recipe
// POST /FavoriteRecipes?RecipeId={id}
// =========================
export const addFavorite = async (recipeId) => {
  if (!recipeId) {
    throw new Error("Recipe ID is required.");
  }

  const response = await fetch(
    `${API_URL}/FavoriteRecipes?RecipeId=${encodeURIComponent(
      recipeId
    )}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    let message = "Failed to add favorite recipe.";

    try {
      const data = await response.json();

      message =
        data?.message ||
        data?.title ||
        message;
    } catch {
      // Ignore non-JSON response
    }

    throw new Error(message);
  }

  // API currently returns true
  try {
    return await response.json();
  } catch {
    return true;
  }
};

// =========================
// Remove Favorite Recipe
// DELETE /FavoriteRecipes?RecipeId={id}
// =========================
export const removeFavorite = async (recipeId) => {
  if (!recipeId) {
    throw new Error("Recipe ID is required.");
  }

  const response = await fetch(
    `${API_URL}/FavoriteRecipes?RecipeId=${encodeURIComponent(
      recipeId
    )}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    let message =
      "Failed to remove favorite recipe.";

    try {
      const data = await response.json();

      message =
        data?.message ||
        data?.title ||
        message;
    } catch {
      // Ignore non-JSON response
    }

    throw new Error(message);
  }

  // DELETE may return true, empty body, or JSON
  try {
    return await response.json();
  } catch {
    return true;
  }
};