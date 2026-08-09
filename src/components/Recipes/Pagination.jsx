import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ pageNumber, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) =>
      page === 1 || page === totalPages || Math.abs(page - pageNumber) <= 1
  );

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-1.5"
      aria-label="Recipes pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(pageNumber - 1)}
        disabled={pageNumber === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate/20 text-slate transition hover:bg-slate/5 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, idx) => {
        const prevPage = pages[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <span key={page} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-slate/50">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === pageNumber ? "page" : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                page === pageNumber
                  ? "bg-primary text-white"
                  : "text-slate hover:bg-slate/5"
              }`}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(pageNumber + 1)}
        disabled={pageNumber === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate/20 text-slate transition hover:bg-slate/5 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

export default Pagination;
