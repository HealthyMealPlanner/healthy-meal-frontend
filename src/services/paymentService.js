// src/services/paymentService.js
//
// Follows the same conventions as `favoriteService.js`: hardcoded API base
// URL, Bearer token read from `localStorage` (same "token" key set by
// `Login.jsx` / `SocialButton.jsx`), and JSON error parsing with a
// friendly fallback message. Does NOT touch `authService.js`.

const API_URL = "https://healthymealplanner-production.runasp.net/api";

const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You must be logged in to subscribe.");
  }

  return token;
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});

// =========================
// Create Payment Intent
// POST /api/payment/create-payment-intent
// Body: { amountInCents, orderId }
// Response: { clientSecret }
// =========================
export const createPaymentIntent = async (amountInCents, orderId) => {
  let response;

  try {
    response = await fetch(`${API_URL}/payment/create-payment-intent`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ amountInCents, orderId }),
    });
  } catch {
    throw new Error(
      "Couldn't reach the payment server. Check your connection and try again."
    );
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    // Non-JSON or empty body — fall through to status-based handling below.
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Your session has expired. Please log in again.");
    }

    throw new Error(
      data?.message ||
        data?.title ||
        "Failed to start the payment. Please try again."
    );
  }

  if (!data?.clientSecret) {
    throw new Error(
      "The payment couldn't be initialized. Please try again."
    );
  }

  return data;
};
