import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import { useDietitianDetails } from "../../hooks/useDietitianDetails";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";

const TAX_RATE = 0.08;
const DISCOUNT = 10;

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { dietitian, loading, error, refetch } = useDietitianDetails(id);

  const [method, setMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Loading payment details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!dietitian) {
    return null;
  }

  const date = location.state?.date;
  const time = location.state?.time || dietitian.nextAvailable?.time;
  const scheduleLabel = date
    ? `${date.day} ${date.date}, ${time}`
    : dietitian.nextAvailable?.label;

  const subtotal = dietitian.consultationFee;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal - DISCOUNT + tax;

  const handleConfirm = () => {
    // NOTE: there is no `/Payments` or `/Appointments` endpoint yet, so this
    // just simulates a successful confirmation locally. See summary for the
    // backend requirements needed to make this a real booking flow.
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast.success("Payment confirmed!");

      navigate(`/dietitians/${dietitian.id}/confirmation`, {
        state: { date, time, currency: dietitian.currency },
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-10">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-10">
        <nav className="flex items-center gap-2 text-xs text-slate">
          <Link to="/" className="hover:text-text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/dietitians" className="hover:text-text-primary">
            Dietitians
          </Link>
          <span>/</span>
          <span className="text-text-primary">Payment</span>
        </nav>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-sm ring-1 ring-slate/10 transition hover:bg-slate/5"
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate/10">
              <div className="flex items-center gap-3">
                <img
                  src={dietitian.avatarUrl}
                  alt={dietitian.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-text-primary">
                      {dietitian.name}
                    </p>
                    <span className="flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary-dark">
                      Video
                    </span>
                  </div>
                  <p className="text-xs text-slate">{dietitian.specialty}</p>
                  <p className="mt-0.5 text-xs text-slate">{scheduleLabel}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10">
              <h2 className="text-sm font-semibold text-text-primary">
                Payment Method
              </h2>

              <div className="mt-3 flex flex-col gap-3">
                <label
                  className={`block rounded-xl border p-4 transition ${
                    method === "card"
                      ? "border-primary ring-1 ring-primary/30"
                      : "border-slate/15"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={method === "card"}
                        onChange={() => setMethod("card")}
                        className="h-4 w-4 accent-primary"
                      />
                      Credit Card
                    </span>
                    <CreditCard size={18} className="text-slate/50" />
                  </span>

                  {method === "card" && (
                    <div className="mt-4 flex flex-col gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate">
                          Card Number
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0000 0000 0000 0000"
                          className="h-11 w-full rounded-lg border border-slate/20 bg-white px-3 text-sm text-text-primary outline-none placeholder:text-slate/40 focus:border-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="h-11 w-full rounded-lg border border-slate/20 bg-white px-3 text-sm text-text-primary outline-none placeholder:text-slate/40 focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="***"
                            className="h-11 w-full rounded-lg border border-slate/20 bg-white px-3 text-sm text-text-primary outline-none placeholder:text-slate/40 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="Name on card"
                          className="h-11 w-full rounded-lg border border-slate/20 bg-white px-3 text-sm text-text-primary outline-none placeholder:text-slate/40 focus:border-primary"
                        />
                      </div>
                    </div>
                  )}
                </label>

                <label
                  className={`flex items-center justify-between rounded-xl border p-4 transition ${
                    method === "apple-pay"
                      ? "border-primary ring-1 ring-primary/30"
                      : "border-slate/15"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <input
                      type="radio"
                      name="payment-method"
                      checked={method === "apple-pay"}
                      onChange={() => setMethod("apple-pay")}
                      className="h-4 w-4 accent-primary"
                    />
                    Apple Pay
                  </span>
                  <Smartphone size={18} className="text-slate/50" />
                </label>

                <label
                  className={`flex items-center justify-between rounded-xl border p-4 transition ${
                    method === "e-wallet"
                      ? "border-primary ring-1 ring-primary/30"
                      : "border-slate/15"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <input
                      type="radio"
                      name="payment-method"
                      checked={method === "e-wallet"}
                      onChange={() => setMethod("e-wallet")}
                      className="h-4 w-4 accent-primary"
                    />
                    E-Wallets
                  </span>
                  <Wallet size={18} className="text-slate/50" />
                </label>

                <div className="flex items-center gap-2 rounded-xl border border-slate/15 p-2 pl-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value)}
                    placeholder="Enter promo code"
                    className="h-9 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-slate/40"
                  />
                  <button
                    type="button"
                    className="h-9 shrink-0 rounded-lg bg-primary-light px-4 text-xs font-semibold text-primary-dark transition hover:bg-primary-light/70"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-text-primary">
                Payment Summary
              </h2>

              <div className="mt-3 flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between text-slate">
                  <span>Subtotal</span>
                  <span className="text-text-primary">
                    {subtotal} {dietitian.currency}
                  </span>
                </div>
                <div className="flex items-center justify-between text-primary">
                  <span>Discount</span>
                  <span>
                    -{DISCOUNT} {dietitian.currency}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate">
                  <span>Tax</span>
                  <span className="text-text-primary">
                    {tax} {dietitian.currency}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate/10 pt-3">
                <span className="text-sm font-semibold text-text-primary">
                  Total Price
                </span>
                <span className="text-lg font-bold text-primary">
                  {total} {dietitian.currency}
                </span>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={submitting}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting
                  ? "Processing..."
                  : `Pay ${total} ${dietitian.currency} & Confirm`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
