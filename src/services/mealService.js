import apiClient from "./apiClient";

export const mealService = {
  getDailyMetrics: () => apiClient.get("/Meal/daily-metrics"),
};