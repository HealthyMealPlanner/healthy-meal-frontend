import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";

function DietitianCard({ dietitian, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <img
          src={dietitian.avatarUrl}
          alt={dietitian.name}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-text-primary">
                {dietitian.name}
              </h3>
              <p className="truncate text-xs text-slate">
                {dietitian.specialty}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onToggleFavorite?.(dietitian.id)}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className="shrink-0"
            >
              <Heart
                size={18}
                className={
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-slate/40 hover:text-red-400"
                }
              />
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-slate">
            <Star size={13} className="fill-orange text-orange" />
            <span className="font-medium text-text-primary">
              {dietitian.rating}
            </span>
            <span>&middot; {dietitian.yearsExperience} Yrs Exp</span>
          </div>
        </div>
      </div>

      {dietitian.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {dietitian.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs">
        <div>
          <p className="text-slate">Next Available</p>
          <p className="font-medium text-text-primary">
            {dietitian.nextAvailable?.label}
          </p>
        </div>

        <div className="text-right">
          <p className="text-slate">Consultation</p>
          <p className="font-semibold text-text-primary">
            {dietitian.consultationFee} {dietitian.currency}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(`/dietitians/${dietitian.id}`)}
          className="flex h-10 flex-1 items-center justify-center rounded-xl border border-slate/20 text-sm font-semibold text-text-primary transition hover:bg-slate/5"
        >
          Profile
        </button>

        <button
          type="button"
          onClick={() => navigate(`/dietitians/${dietitian.id}`)}
          className="flex h-10 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default DietitianCard;
