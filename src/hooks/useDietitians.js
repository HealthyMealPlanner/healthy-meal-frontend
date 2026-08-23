import { useEffect, useMemo, useState } from "react";
import { getDietitians } from "../services/dietitianService";

const DEFAULT_FILTERS = {
  search: "",
  availableToday: false,
  videoCall: false,
  topRated: false,
  maxFee: 300,
  specialties: [],
};

export function useDietitians(initialFilters = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getDietitians();

        if (!ignore) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.message || "Failed to load dietitians.");
          setItems([]);
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
  }, [reloadToken]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSpecialty = (specialty) => {
    setFilters((prev) => {
      const exists = prev.specialties.includes(specialty);

      return {
        ...prev,
        specialties: exists
          ? prev.specialties.filter((item) => item !== specialty)
          : [...prev.specialties, specialty],
      };
    });
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const refetch = () => {
    setReloadToken((token) => token + 1);
  };

  const dietitians = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return items.filter((item) => {
      if (
        search &&
        !item.name.toLowerCase().includes(search) &&
        !item.specialty.toLowerCase().includes(search)
      ) {
        return false;
      }

      if (filters.availableToday && !item.availableToday) return false;
      if (filters.videoCall && !item.videoCall) return false;
      if (filters.topRated && !item.topRated) return false;
      if (item.consultationFee > filters.maxFee) return false;

      if (
        filters.specialties.length > 0 &&
        !filters.specialties.some((specialty) =>
          item.specialties.includes(specialty)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [items, filters]);

  return {
    dietitians,
    totalCount: dietitians.length,
    loading,
    error,
    filters,
    updateFilter,
    toggleSpecialty,
    clearFilters,
    refetch,
  };
}
