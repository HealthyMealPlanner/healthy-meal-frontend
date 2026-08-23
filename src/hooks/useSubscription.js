import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCurrentSubscription,
  FREE_TIER,
} from "../services/subscriptionService";

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 20; // ~1 minute of polling after payment confirmation

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [polling, setPolling] = useState(false);

  const pollTimeoutRef = useRef(null);
  const pollAttemptsRef = useRef(0);

  // Stable fetch used both for the initial load and for polling.
  const fetchSubscription = useCallback(async () => {
    try {
      const data = await getCurrentSubscription();
      setSubscription(data);
      setError("");
      return data;
    } catch (err) {
      // getCurrentSubscription already treats "no subscription" (500) as
      // Free tier internally, so any error here is a real failure
      // (network / auth) — still fall back to Free so the UI never breaks.
      setError(err?.message || "Failed to load your subscription.");
      setSubscription(FREE_TIER);
      return FREE_TIER;
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      const data = await fetchSubscription();

      if (!ignore) {
        setLoading(false);
      }

      return data;
    }

    load();

    return () => {
      ignore = true;
      clearTimeout(pollTimeoutRef.current);
    };
  }, [fetchSubscription]);

  const stopPolling = useCallback(() => {
    clearTimeout(pollTimeoutRef.current);
    setPolling(false);
  }, []);

  // Call after a Stripe payment is confirmed: the backend activates the
  // subscription asynchronously via webhook, so we poll on a fixed
  // interval until it shows up as an active Pro tier (or we give up).
  const startPolling = useCallback(() => {
    pollAttemptsRef.current = 0;
    setPolling(true);

    const tick = async () => {
      pollAttemptsRef.current += 1;

      const data = await fetchSubscription();

      if (data?.tier === "Pro" && data?.isActive) {
        setPolling(false);
        return;
      }

      if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
        setPolling(false);
        return;
      }

      pollTimeoutRef.current = setTimeout(tick, POLL_INTERVAL_MS);
    };

    tick();
  }, [fetchSubscription]);

  const isPro = subscription?.tier === "Pro" && !!subscription?.isActive;

  return {
    subscription,
    isPro,
    loading,
    error,
    polling,
    refetch: fetchSubscription,
    startPolling,
    stopPolling,
  };
}
