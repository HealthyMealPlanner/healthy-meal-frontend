import { FaStar, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";

function DoctorCard({ doctor }) {
  const { imageUrl, name, specialization, rating, experience, availableAppointments } = doctor;

  const nextSlot = availableAppointments?.[0];
  const price = nextSlot?.price;
  const time = nextSlot?.timeStart;

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[3/4.2] shadow-sm hover:shadow-lg transition-shadow group cursor-pointer">
      <img
        src={imageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-3">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className="text-sm font-bold text-text-primary leading-tight flex items-center gap-1">
              {name}
              <FaCheckCircle className="text-primary text-[11px] shrink-0" />
            </p>
            {price != null && (
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-text-primary leading-none">
                  {price} EGP
                </p>
                <p className="text-[9px] text-slate mt-0.5">Per consultation</p>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate mb-2.5 leading-snug">{specialization}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {rating != null && (
                <span className="flex items-center gap-1 text-[11px] text-text-primary">
                  <FaStar className="text-orange text-[10px]" />
                  <span className="font-semibold">{rating}</span>
                </span>
              )}
              {experience && (
                <span className="text-[11px] text-slate">{experience}</span>
              )}
              {time && (
                <span className="flex items-center gap-1 text-[11px] text-text-primary">
                  <HiOutlineClock className="text-primary text-xs" />
                  {time.slice(0, 5)}
                </span>
              )}
            </div>

            <button className="w-6 h-6 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center shrink-0 transition-colors">
              <FaArrowRight className="text-white text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;