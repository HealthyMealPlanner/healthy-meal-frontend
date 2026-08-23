const BASE_URL = "https://healthymealplanner-production.runasp.net/api";

// Get recipes
export const getRecipes = async (pageNumber = 1, pageSize = 10) => {
  const response = await fetch(
    `${BASE_URL}/Recipes?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
};

// Get recipe by ID
export const getRecipeById = async (id) => {
  const response = await fetch(`${BASE_URL}/Recipes/${id}`);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.log("Recipe API Error:", response.status, data);
    throw new Error(
      data?.message || `Failed to fetch recipe (${response.status})`
    );
  }

  return data;
};
