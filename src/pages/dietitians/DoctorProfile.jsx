import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

import { useDietitianDetails } from "../../hooks/useDietitianDetails";
import Loader from "../../components/Recipes/Loader";
import ErrorState from "../../components/Recipes/ErrorState";

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { dietitian, loading, error, refetch } = useDietitianDetails(id);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [favorite, setFavorite] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-main-bg font-jakarta">
        <Loader label="Loading dietitian profile..." />
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

  const activeDate = selectedDate ?? dietitian.availableDates?.[0]?.date;
  const activeTime = selectedTime ?? dietitian.availableTimes?.[0];

  const handleBookSession = () => {
    const dateInfo = dietitian.availableDates?.find(
      (item) => item.date === activeDate
    );

    navigate(`/dietitians/${dietitian.id}/payment`, {
      state: {
        date: dateInfo,
        time: activeTime,
      },
    });
  };

  return (
    <div className="min-h-screen bg-main-bg font-jakarta pb-10">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <nav className="flex items-center gap-2 text-xs text-slate">
          <Link to="/" className="hover:text-text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/dietitians" className="hover:text-text-primary">
            Dietitians
          </Link>
          <span>/</span>
          <span className="text-text-primary">Doctor Profile</span>
        </nav>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-sm ring-1 ring-slate/10 transition hover:bg-slate/5 lg:hidden"
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <img
                    src={dietitian.avatarUrl}
                    alt={dietitian.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h1 className="text-lg font-bold text-text-primary">
                        {dietitian.name}
                      </h1>
                      <CheckCircle2
                        size={16}
                        className="fill-primary text-white"
                      />
                    </div>
                    <p className="text-sm text-slate">
                      {dietitian.specialty}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate">
                      <span className="flex items-center gap-1">
                        <Star
                          size={13}
                          className="fill-orange text-orange"
                        />
                        <span className="font-medium text-text-primary">
                          {dietitian.rating}
                        </span>
                        ({dietitian.reviewsCount} reviews)
                      </span>
                      <span>&middot;</span>
                      <span>{dietitian.yearsExperience} Years Exp</span>
                    </div>

                    {dietitian.tags?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
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
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFavorite((prev) => !prev)}
                  aria-label={
                    favorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-light"
                >
                  <Heart
                    size={16}
                    className={
                      favorite
                        ? "fill-red-500 text-red-500"
                        : "text-slate/50"
                    }
                  />
                </button>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-semibold text-text-primary">
                  About
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {dietitian.about}
                </p>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-semibold text-text-primary">
                  Dietitian Specialties
                </h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {dietitian.specialties?.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary-dark"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-semibold text-text-primary">
                  Credentials &amp; Verification
                </h2>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {dietitian.credentials?.map((credential) => (
                    <li
                      key={credential}
                      className="flex items-start gap-2 text-xs text-slate"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text-primary">
                  Patient Reviews
                </h2>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View all reviews
                </button>
              </div>

              <div className="mt-3 flex flex-col divide-y divide-slate/10">
                {dietitian.reviews?.map((review) => (
                  <div key={review.id} className="py-3 first:pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary-light" />
                        <p className="text-sm font-medium text-text-primary">
                          {review.name}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-text-primary">
                        <Star size={12} className="fill-orange text-orange" />
                        {review.rating}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate">
                      {review.comment}
                    </p>
                    <p className="mt-1 text-[11px] text-slate/60">
                      {review.timeAgo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate/10 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate">Consultation Fee</p>
                <p className="text-lg font-bold text-primary">
                  {dietitian.consultationFee}
                  <span className="ml-1 text-xs font-medium text-slate">
                    {dietitian.currency}
                  </span>
                </p>
              </div>

              <p className="mt-2 text-xs text-slate">
                Next Available:{" "}
                <span className="font-medium text-text-primary">
                  {dietitian.nextAvailable?.label}
                </span>
              </p>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-text-primary">
                    Select Date
                  </p>
                  <div className="flex items-center gap-1 text-slate">
                    <button type="button" aria-label="Previous month">
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-xs">July</span>
                    <button type="button" aria-label="Next month">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-5 gap-1.5">
                  {dietitian.availableDates?.map((dateItem) => (
                    <button
                      key={dateItem.date}
                      type="button"
                      onClick={() => setSelectedDate(dateItem.date)}
                      className={`flex flex-col items-center rounded-lg py-2 text-[11px] transition ${
                        activeDate === dateItem.date
                          ? "bg-primary text-white"
                          : "bg-light text-text-primary hover:bg-slate/10"
                      }`}
                    >
                      <span>{dateItem.day}</span>
                      <span className="font-semibold">{dateItem.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-text-primary">
                  Select Time
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {dietitian.availableTimes?.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition ${
                        activeTime === time
                          ? "bg-primary text-white"
                          : "bg-light text-text-primary hover:bg-slate/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleBookSession}
                className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Book Session
              </button>

              <p className="mt-2 text-center text-[11px] text-slate">
                Easy rescheduling up to 4 hours before slot
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
