import { useState, useEffect } from "react";
import { doctorService } from "../services/doctorService";

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    doctorService
      .getAll()
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw)
          ? raw
          : raw?.items ?? raw?.data ?? raw?.result ?? [];
        setDoctors(Array.isArray(list) ? list : []);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { doctors, loading, error };
}