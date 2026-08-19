import { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Calendar, Check, Clock, Video } from "lucide-react";
import toast from "react-hot-toast";

import { useDietitianDetails } from "../../hooks/useDietitianDetails";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";

function AppointmentConfirmed() {
  const { id } = useParams();
  const location = useLocation();

  const { dietitian, loading, error, refetch } = useDietitianDetails(id);

  const [notes, setNotes] = useState("");
  const [historyAttached, setHistoryAttached] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Confirming your appointment..." />
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
  const dateLabel = date
    ? `${date.day} ${date.date}, ${time}`
    : dietitian.nextAvailable?.label;

  const handleAttachHistory = () => {
    // NOTE: there is no meal-history export/attach endpoint yet, so this
    // just toggles a local UI state. See summary for what's missing.
    setHistoryAttached(true);
    toast.success("AI Meal History attached.");
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-10">
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
            <Check size={26} className="text-primary" />
          </div>

          <h1 className="mt-4 text-xl font-bold text-text-primary sm:text-2xl">
            Appointment Confirmed!
          </h1>
          <p className="mt-1 text-sm text-slate">
            You&apos;re all set for your consultation.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10">
          <div className="flex items-center gap-3">
            <img
              src={dietitian.avatarUrl}
              alt={dietitian.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {dietitian.name}
              </p>
              <p className="text-xs text-primary">{dietitian.specialty}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-slate/10 pt-4 text-xs text-slate">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-primary" />
              <span className="uppercase tracking-wide text-slate/70">
                Date
              </span>
              <span className="ml-auto font-medium text-text-primary">
                {dateLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary" />
              <span className="uppercase tracking-wide text-slate/70">
                Time
              </span>
              <span className="ml-auto font-medium text-text-primary">
                {time} (30-Min Session)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Video size={14} className="text-primary" />
              <span className="uppercase tracking-wide text-slate/70">
                Type
              </span>
              <span className="ml-auto font-medium text-text-primary">
                Video Call via PureBite Hub
              </span>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <Video size={16} />
            Join Video Call
          </button>
          <p className="mt-2 text-center text-[11px] text-slate">
            Available 5 mins before session starts
          </p>

          <button
            type="button"
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate/20 text-sm font-semibold text-text-primary transition hover:bg-slate/5"
          >
            <Calendar size={16} />
            Add to Calendar
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10">
          <h2 className="text-sm font-semibold text-text-primary">
            Prepare for your session
          </h2>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-primary-light/50 p-3">
            <div>
              <p className="text-xs font-semibold text-text-primary">
                AI Meal History
              </p>
              <p className="text-[11px] text-slate">Share last 7 days of logs</p>
            </div>
            <button
              type="button"
              onClick={handleAttachHistory}
              disabled={historyAttached}
              className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {historyAttached ? "Attached" : "Attach"}
            </button>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
              Dietary Notes
            </label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Mention any allergies, recent blood tests, or specific goals..."
              className="w-full rounded-xl border border-slate/20 bg-light px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-slate/50 focus:border-primary"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate">
          Need to reschedule?{" "}
          <Link to="/dietitians" className="font-semibold text-primary">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AppointmentConfirmed;
