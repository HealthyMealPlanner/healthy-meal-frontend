import { FaStar, FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

function DoctorListCard({ doctor }) {
  const [liked, setLiked] = useState(false);
  const { imageUrl, name, specialization, rating, experience, availableAppointments } = doctor;

  const nextSlot = availableAppointments?.[0];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={imageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"}
              alt={name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white">
              <FaCheckCircle className="text-white text-[10px]" />
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">{name}</h3>
            <p className="text-sm text-slate mb-1">{specialization}</p>
            <div className="flex items-center gap-2 text-sm text-slate">
              {rating != null && (
                <span className="flex items-center gap-1 text-text-primary font-medium">
                  <FaStar className="text-orange text-xs" />
                  {rating}
                </span>
              )}
              {experience && (
                <>
                  <span>·</span>
                  <span>{experience}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button onClick={() => setLiked((v) => !v)} className="shrink-0">
          {liked ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-400 text-lg" />
          )}
        </button>
      </div>

      {nextSlot && (
        <div className="flex items-center justify-between bg-light rounded-xl px-4 py-3 mb-4">
          <div>
            <p className="text-xs text-slate mb-0.5">Next Available</p>
            <p className="text-sm font-bold text-text-primary">
              {nextSlot.day} · {nextSlot.timeStart?.slice(0, 5)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate mb-0.5">Consultation</p>
            <p className="text-sm font-bold text-primary">EGP {nextSlot.price}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button className="flex-1 border border-gray-200 text-text-primary font-semibold text-sm py-2.5 rounded-xl hover:bg-light transition-colors">
          Profile
        </button>
        <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default DoctorListCard;