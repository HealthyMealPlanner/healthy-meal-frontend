import { useState, useEffect } from "react";
import { mealService } from "../services/mealService";

export function useDailyMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    mealService
      .getDailyMetrics()
      .then((res) => setMetrics(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { metrics, loading, error };
}