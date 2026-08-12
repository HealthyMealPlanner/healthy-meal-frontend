import apiClient from "./apiClient";

// =========================
// Get Profile
// =========================
export const getProfile = async () => {
  try {
    const response = await apiClient.get("/api/Profile");

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

    if (profileData.fullName !== undefined) {
      formData.append(
        "FullName",
        profileData.fullName
      );
    }

    if (profileData.age !== undefined) {
      formData.append(
        "Age",
        profileData.age
      );
    }

    if (profileData.gender !== undefined) {
      formData.append(
        "Gender",
        profileData.gender
      );
    }

    if (profileData.heightCm !== undefined) {
      formData.append(
        "HeightCm",
        profileData.heightCm
      );
    }

    if (profileData.weightKg !== undefined) {
      formData.append(
        "WeightKg",
        profileData.weightKg
      );
    }

    if (profileData.goal !== undefined) {
      formData.append(
        "Goal",
        profileData.goal
      );
    }

    if (profileData.dailyCaloriesGoal !== undefined) {
      formData.append(
        "DailyCaloriesGoal",
        profileData.dailyCaloriesGoal
      );
    }

    formData.append(
      "Allergies",
      profileData.allergies || ""
    );

    if (profileData.profilePictureUrl) {
      formData.append(
        "ProfilePictureUrl",
        profileData.profilePictureUrl
      );
    }

    const response = await apiClient.put(
      "/api/Profile",
      formData
    );

    return response.data;
  } catch (error) {
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
    const response = await apiClient.get(
      "/api/FavoriteRecipes"
    );

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
      `/api/FavoriteRecipes?RecipeId=${recipeId}`
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