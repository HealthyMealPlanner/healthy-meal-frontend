import { UtensilsCrossed } from "lucide-react";

function EmptyState({
  title = "No recipes found",
  message = "Check back later for new recipes.",
}) {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
        <UtensilsCrossed size={22} className="text-primary" />
      </div>

      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      <p className="max-w-sm text-sm text-slate">{message}</p>
    </div>
  );
}

export default EmptyState;
