// src/config/stripeConfig.js
//
// Loads Stripe.js once (per Stripe's own recommendation: call `loadStripe`
// outside of any component so it isn't recreated on every render).
//
// Follows the same env-var convention already used in `authService.js`
// (`import.meta.env.VITE_API_URL`). If `VITE_STRIPE_PUBLISHABLE_KEY` isn't
// set in the environment, we fall back to the publishable key provided for
// this feature — it's a public/publishable key, so it's safe to ship in the
// frontend bundle either way. Only secret keys must never live here.

import { loadStripe } from "@stripe/stripe-js";

const FALLBACK_PUBLISHABLE_KEY =
  "pk_test_51U57wXPo7Yp509jcQlrqYuqSYGlOmNgh3Otzhi3HIG2qxiDzBlDvpzrzF9gH2uKgRSwTBPKNJ5UtmYFUpLcITYso00uSRWNPJp";

const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
