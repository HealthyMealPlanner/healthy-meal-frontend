import apiClient from "./apiClient";

export const categoryService = {
  getAll: () => apiClient.get("/Categories"),
};