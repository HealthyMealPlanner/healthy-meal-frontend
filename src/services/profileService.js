import apiClient from "./apiClient";

// =========================
// Get Profile
// =========================
export const getProfile = async () => {
  try {
    const response = await apiClient.get("/Profile");

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.response?.data ||
      error.message ||
      "Failed to fetch profile";

    throw new Error(
      typeof message === "string"
        ? message
        : "Failed to fetch profile"
    );
  }
};

// =========================
// Update Profile
// =========================
export const updateProfile = async (profileData) => {
  try {
    const formData = new FormData();

    formData.append("FullName", profileData.fullName ?? "");
    formData.append("Age", String(profileData.age ?? 0));
    formData.append("Gender", String(profileData.gender ?? 0));
    formData.append("HeightCm", String(profileData.heightCm ?? 0));
    formData.append("WeightKg", String(profileData.weightKg ?? 0));
    formData.append("Goal", String(profileData.goal ?? 0));
    formData.append(
      "DailyCaloriesGoal",
      String(profileData.dailyCaloriesGoal ?? 0)
    );
    formData.append("Allergies", profileData.allergies ?? "");

    if (profileData.profilePicture instanceof File) {
      formData.append("ProfilePicture", profileData.profilePicture);
    }

    console.log("Updating profile with FormData:");

    for (const [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? value.name : value);
    }

    const response = await apiClient.put("/Profile", formData);

    return response.data;
  } catch (error) {
    console.error("Update profile API error:", error.response?.data || error);

    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.response?.data ||
      error.message ||
      "Failed to update profile";

    throw new Error(
      typeof message === "string"
        ? message
        : "Failed to update profile"
    );
  }
};

// =========================
// Get Favorite Recipes
// =========================
export const getFavoriteRecipes = async () => {
  try {
    const response = await apiClient.get("/FavoriteRecipes");

    return response.data || [];
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.response?.data ||
      error.message ||
      "Failed to fetch favorite recipes";

    throw new Error(
      typeof message === "string"
        ? message
        : "Failed to fetch favorite recipes"
    );
  }
};

// =========================
// Delete Favorite Recipe
// =========================
export const deleteFavoriteRecipe = async (recipeId) => {
  try {
    const response = await apiClient.delete(
      `/FavoriteRecipes?RecipeId=${recipeId}`
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      error.response?.data ||
      error.message ||
      "Failed to remove favorite recipe";

    throw new Error(
      typeof message === "string"
        ? message
        : "Failed to remove favorite recipe"
    );
  }
};