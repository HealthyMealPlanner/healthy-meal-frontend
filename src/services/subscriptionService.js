// src/services/subscriptionService.js
//
// Follows the same conventions as `favoriteService.js` / `paymentService.js`:
// hardcoded API base URL, Bearer token from `localStorage`.
//
// IMPORTANT (per backend docs): if the user has no subscription yet, this
// endpoint currently returns HTTP 500 instead of a normal "no subscription"
// payload. We treat that specific case as Free tier rather than a fatal
// error — see `getCurrentSubscription` below.

const API_URL = "https://healthymealplanner-production.runasp.net/api";

const getToken = () => localStorage.getItem("token");

export const FREE_TIER = {
  tier: "Free",
  isActive: false,
  expiresAt: null,
};

// =========================
// Get Current Subscription
// GET /api/subscription/current
// Response: { tier, isActive, expiresAt }
// =========================
export const getCurrentSubscription = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in to view your subscription.");
  }

  let response;

  try {
    response = await fetch(`${API_URL}/subscription/current`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  } catch {
    throw new Error(
      "Couldn't reach the server to check your subscription."
    );
  }

  // Documented backend quirk: no subscription yet => 500, not a real error.
  if (response.status === 500) {
    return FREE_TIER;
  }

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again.");
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    // Ignore non-JSON body
  }

  if (!response.ok) {
    throw new Error(
      data?.message || data?.title || "Failed to load your subscription."
    );
  }

  if (!data) {
    return FREE_TIER;
  }

  return {
    tier: data.tier || "Free",
    isActive: !!data.isActive,
    expiresAt: data.expiresAt ?? null,
  };
};
