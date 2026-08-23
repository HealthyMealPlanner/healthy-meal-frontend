import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import {
  ArrowLeft,
  Check,
  Crown,
  Loader2,
  Sparkles,
} from "lucide-react";

import { stripePromise } from "../../config/stripeConfig";
import { createPaymentIntent } from "../../services/paymentService";
import { useSubscription } from "../../hooks/useSubscription";
import StripeCardForm from "../../components/Payment/StripeCardForm";
import Loader from "../../components/Recipes/Loader";

// NOTE: `POST /payment/create-payment-intent` requires an `orderId`, but this
// project has no "orders" concept anywhere else (it's not an e-commerce
// app). We use a fixed placeholder id for the Pro subscription "product"
// until the backend clarifies what `orderId` should represent for
// subscription purchases — see the chat summary for details.
const PRO_PLAN = {
  name: "PureBite Pro",
  priceLabel: "EGP 199",
  period: "/ month",
  amountInCents: 19900,
  orderId: 1,
  benefits: [
    "Unlimited AI-personalized recipes",
    "Priority booking with dietitians",
    "Advanced nutrition & meal-history insights",
    "Ad-free experience across the app",
  ],
};

function ProSubscription() {
  const navigate = useNavigate();

  const {
    subscription,
    isPro,
    loading,
    error: subscriptionError,
    polling,
    refetch,
    startPolling,
  } = useSubscription();

  const [step, setStep] = useState("plan"); // plan | checkout | pending
  const [clientSecret, setClientSecret] = useState("");
  const [initializing, setInitializing] = useState(false);
  const [intentError, setIntentError] = useState("");
  const [confirmSubmitting, setConfirmSubmitting] = useState(false);

  const handleSubscribeClick = async () => {
    setIntentError("");
    setInitializing(true);

    try {
      const { clientSecret: secret } = await createPaymentIntent(
        PRO_PLAN.amountInCents,
        PRO_PLAN.orderId
      );

      setClientSecret(secret);
      setStep("checkout");
    } catch (err) {
      setIntentError(
        err?.message || "Failed to start the payment. Please try again."
      );
    } finally {
      setInitializing(false);
    }
  };

  const handleCancelCheckout = () => {
    setStep("plan");
    setClientSecret("");
    setConfirmSubmitting(false);
  };

  const handlePaymentSuccess = () => {
    setConfirmSubmitting(false);
    setStep("pending");
    startPolling();
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-10">
      <div className="mx-auto max-w-xl px-4 py-6 sm:px-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-sm ring-1 ring-slate/10 transition hover:bg-slate/5"
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light">
            <Crown size={18} className="text-primary" />
          </div>
          <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
            PureBite Pro
          </h1>
        </div>
        <p className="mt-1 text-sm text-slate">
          Unlock unlimited AI meal planning and priority dietitian access.
        </p>

        {loading && (
          <div className="mt-6">
            <Loader label="Checking your subscription..." />
          </div>
        )}

        {!loading && subscriptionError && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-600">
            {subscriptionError}
          </div>
        )}

        {!loading && isPro && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate/10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
              <Check size={26} className="text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text-primary">
              You&apos;re a Pro member!
            </h2>
            <p className="mt-1 text-sm text-slate">
              {subscription?.expiresAt
                ? `Your plan renews on ${new Date(
                    subscription.expiresAt
                  ).toLocaleDateString()}.`
                : "Enjoy full access to every Pro feature."}
            </p>

            <ul className="mt-5 flex flex-col gap-2 text-left">
              {PRO_PLAN.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm text-text-primary"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && !isPro && step === "plan" && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate/10">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                Pro Plan
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-text-primary">
                {PRO_PLAN.priceLabel}
              </span>
              <span className="text-sm text-slate">{PRO_PLAN.period}</span>
            </div>

            <ul className="mt-5 flex flex-col gap-2.5">
              {PRO_PLAN.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm text-text-primary"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>

            {intentError && (
              <p className="mt-4 text-xs text-red-500">{intentError}</p>
            )}

            <button
              type="button"
              onClick={handleSubscribeClick}
              disabled={initializing}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {initializing && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {initializing ? "Preparing checkout..." : "Subscribe to Pro"}
            </button>
          </div>
        )}

        {!loading && !isPro && step === "checkout" && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate/10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">
                Complete your payment
              </h2>
              <span className="text-sm font-bold text-primary">
                {PRO_PLAN.priceLabel}
                {PRO_PLAN.period}
              </span>
            </div>

            <div className="mt-4">
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeCardForm
                    clientSecret={clientSecret}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handleCancelCheckout}
                    submitting={confirmSubmitting}
                    setSubmitting={setConfirmSubmitting}
                  />
                </Elements>
              ) : (
                <p className="text-sm text-red-500">
                  We couldn&apos;t initialize the payment form. Please go
                  back and try again.
                </p>
              )}
            </div>
          </div>
        )}

        {!loading && !isPro && step === "pending" && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate/10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
              <Loader2 size={24} className="animate-spin text-primary" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text-primary">
              Your subscription is being activated...
            </h2>
            <p className="mt-1 text-sm text-slate">
              Payment received. We&apos;re waiting for confirmation from
              Stripe — this usually takes just a few seconds.
            </p>

            {!polling && (
              <div className="mt-4">
                <p className="text-xs text-slate">
                  Still not showing as active? You can keep using PureBite
                  on the Free plan in the meantime.
                </p>
                <button
                  type="button"
                  onClick={refetch}
                  className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-slate/20 text-sm font-semibold text-text-primary transition hover:bg-slate/5"
                >
                  Check again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProSubscription;
