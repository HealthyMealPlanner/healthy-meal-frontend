import apiClient from "./apiClient";

export const doctorService = {
  getAll: () => apiClient.get("/api/Doctor"),
  getById: (id) => apiClient.get(`/api/Doctor/${id}`),
};