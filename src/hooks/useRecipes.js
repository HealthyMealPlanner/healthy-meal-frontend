import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipeService";

const DEFAULT_PAGE_SIZE = 10;

export function useRecipes(
  pageSize = DEFAULT_PAGE_SIZE
) {
  const [pageNumber, setPageNumber] = useState(1);
  const [reloadToken, setReloadToken] = useState(0);

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getRecipes(
          pageNumber,
          pageSize
        );

        if (!ignore) {
          setItems(data?.items ?? []);
          setTotalCount(data?.totalCount ?? 0);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err?.message ||
              "Failed to load recipes."
          );

          setItems([]);
          setTotalCount(0);
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
  }, [pageNumber, pageSize, reloadToken]);

  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / pageSize)
  );

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === pageNumber
    ) {
      return;
    }

    setPageNumber(page);
  };

  const refetch = () => {
    setReloadToken((token) => token + 1);
  };

  return {
    recipes: items,
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    loading,
    error,
    goToPage,
    refetch,
  };
}