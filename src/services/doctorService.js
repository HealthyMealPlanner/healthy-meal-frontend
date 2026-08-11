import apiClient from "./apiClient";

export const doctorService = {
  getAll: () => apiClient.get("/Doctor"),
  getById: (id) => apiClient.get(`/Doctor/${id}`),
};
