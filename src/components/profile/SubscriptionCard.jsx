import { Crown, ArrowRight } from "lucide-react";

function SubscriptionCard({ profile, onUpgrade }) {
  const isPremium = profile?.subscriptionTier > 0;

  const planName = isPremium
    ? "Premium Plan"
    : "Free Plan";

  const expirationDate = profile?.subscriptionExpiresAt
    ? new Date(
        profile.subscriptionExpiresAt
      ).toLocaleDateString()
    : null;

  return (
    <section className="overflow-hidden rounded-2xl bg-emerald-900 p-5 text-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-emerald-200">
            Your Plan
          </p>

          <h2 className="mt-1 text-lg font-bold">
            {planName}
          </h2>

          {expirationDate && (
            <p className="mt-1 text-xs text-emerald-200">
              Renewal Date: {expirationDate}
            </p>
          )}

          {!isPremium && (
            <p className="mt-1 text-xs text-emerald-200">
              Enjoy your Healthy Meal Planner journey
            </p>
          )}
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <Crown size={15} />
        </div>
      </div>

      <button
        type="button"
        onClick={onUpgrade}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-primary-dark"
      >
        {isPremium ? "Manage Subscription" : "Upgrade Plan"}

        <ArrowRight size={14} />
      </button>
    </section>
  );
}

export default SubscriptionCard;