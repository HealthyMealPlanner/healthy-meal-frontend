import apiClient from "./apiClient";

export const mealService = {
  getDailyMetrics: () => apiClient.get("/api/Meal/daily-metrics"),
};