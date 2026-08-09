import { useState, useEffect } from "react";
import { categoryService } from "../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => {
        const raw = res.data;

        // Handle every common response shape the API might return:
        // a plain array, or an array nested under a wrapper key.
        const list = Array.isArray(raw)
          ? raw
          : raw?.data ?? raw?.items ?? raw?.categories ?? raw?.result ?? [];

        setCategories(Array.isArray(list) ? list : []);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}