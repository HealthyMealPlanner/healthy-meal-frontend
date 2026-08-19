// src/services/dietitianService.js
//
// NOTE FOR BACKEND INTEGRATION
// ---------------------------------------------------------------------
// The backend does not currently expose Dietitian endpoints, so this
// service reads from the local mock data (`src/data/dietitiansData.js`)
// instead of calling `fetch`. It intentionally mirrors the shape of
// `recipeService.js` (same function names, same async signatures) so
// that once the real endpoints exist, only the bodies of these two
// functions need to change — nothing in the hooks/pages that consume
// this service should need to change.
//
// Endpoints that would be needed (see chat for full list):
//   GET /Dietitians                (list, with filter/search query params)
//   GET /Dietitians/{id}           (single dietitian profile)
//   GET /Dietitians/{id}/slots     (available dates/times)
//   POST /Appointments             (book a session)
// ---------------------------------------------------------------------

import { dietitiansData } from "../data/dietitiansData";

// const BASE_URL = "https://healthymealplanner-production.runasp.net/api";

// Get dietitians (mock — no pagination/filtering on the server yet)
export const getDietitians = async () => {
  // TODO: replace with real call once the endpoint exists, e.g.
  // const response = await fetch(`${BASE_URL}/Dietitians`);
  // if (!response.ok) throw new Error("Failed to fetch dietitians");
  // return response.json();

  return Promise.resolve(dietitiansData);
};

// Get dietitian by ID (mock)
export const getDietitianById = async (id) => {
  // TODO: replace with real call once the endpoint exists, e.g.
  // const response = await fetch(`${BASE_URL}/Dietitians/${id}`);
  // const data = await response.json().catch(() => null);
  // if (!response.ok) throw new Error(data?.message || "Failed to fetch dietitian");
  // return data;

  const dietitian = dietitiansData.find(
    (item) => String(item.id) === String(id)
  );

  if (!dietitian) {
    throw new Error("Dietitian not found.");
  }

  return Promise.resolve(dietitian);
};
