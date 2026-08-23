import { useEffect, useState } from "react";
import { getDietitianById } from "../services/dietitianService";

export function useDietitianDetails(id) {
  const [dietitian, setDietitian] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!id) {
      setDietitian(null);
      setLoading(false);
      setError("Dietitian ID is missing.");
      return;
    }

    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getDietitianById(id);

        if (!ignore) {
          setDietitian(data ?? null);
        }
      } catch (err) {
        if (!ignore) {
          setDietitian(null);
          setError(err?.message || "Failed to load dietitian profile.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [id, reloadToken]);

  const refetch = () => {
    setReloadToken((token) => token + 1);
  };

  return { dietitian, loading, error, refetch };
}
