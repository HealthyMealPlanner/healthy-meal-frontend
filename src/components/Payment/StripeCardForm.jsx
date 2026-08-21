import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      color: "#0f172a",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#ef4444" },
  },
};

function StripeCardForm({ clientSecret, onSuccess, onCancel, submitting, setSubmitting }) {
  const stripe = useStripe();
  const elements = useElements();

  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret || submitting) {
      return;
    }

    setSubmitting(true);
    setCardError("");

    const cardElement = elements.getElement(CardElement);

    let result;

    try {
      result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch {
      setSubmitting(false);
      setCardError(
        "Something went wrong while contacting Stripe. Please try again."
      );
      return;
    }

    const { error, paymentIntent } = result;

    if (error) {
      setSubmitting(false);
      setCardError(
        error.message || "Your card couldn't be charged. Please try again."
      );
      return;
    }

    if (
      paymentIntent?.status === "succeeded" ||
      paymentIntent?.status === "processing"
    ) {
      onSuccess?.(paymentIntent);
      return;
    }

    setSubmitting(false);
    setCardError("Payment wasn't completed. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Card details
        </label>

        <div className="rounded-xl border border-slate/20 bg-white px-4 py-3.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            onChange={(event) => {
              setCardComplete(event.complete);
              setCardError(event.error ? event.error.message : "");
            }}
          />
        </div>
      </div>

      {cardError && <p className="text-xs text-red-500">{cardError}</p>}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="flex h-12 flex-1 items-center justify-center rounded-xl border border-slate/20 text-sm font-semibold text-text-primary transition hover:bg-slate/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!stripe || !cardComplete || submitting}
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Processing..." : "Confirm Payment"}
        </button>
      </div>

      <p className="text-center text-[11px] text-slate">
        Payments are securely processed by Stripe. Your card details are
        never sent to our servers.
      </p>
    </form>
  );
}

export default StripeCardForm;
