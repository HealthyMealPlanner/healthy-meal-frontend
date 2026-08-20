import { FaStar, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";

function DoctorCard({ doctor }) {
  const { imageUrl, name, specialization, rating, experience, availableAppointments } = doctor;

  const nextSlot = availableAppointments?.[0];
  const price = nextSlot?.price;
  const time = nextSlot?.timeStart;

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[3/4.2] shadow-sm hover:shadow-lg transition-shadow group cursor-pointer flex flex-col justify-end">
      <img
        src={imageUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      <div className="relative p-2.5 w-full z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-2.5 lg:p-3 h-[130px] flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-1 mb-1">
              <p className="text-xs lg:text-sm font-bold text-text-primary leading-tight flex items-center gap-1 line-clamp-1">
                {name}
                <FaCheckCircle className="text-primary text-[10px] shrink-0" />
              </p>
              {price != null && (
                <div className="text-right shrink-0">
                  <p className="text-xs lg:text-sm font-bold text-text-primary leading-none">
                    {price} EGP
                  </p>
                  <p className="text-[8px] lg:text-[9px] text-slate mt-0.5 whitespace-nowrap">Per consultation</p>
                </div>
              )}
            </div>

            <p className="text-[10px] lg:text-[11px] text-slate leading-snug line-clamp-2">
              {specialization}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 lg:gap-3">
              {rating != null && (
                <span className="flex items-center gap-0.5 text-[10px] lg:text-[11px] text-text-primary">
                  <FaStar className="text-orange text-[9px] lg:text-[10px]" />
                  <span className="font-semibold">{rating}</span>
                </span>
              )}
              {experience && (
                <span className="text-[10px] lg:text-[11px] text-slate whitespace-nowrap">{experience}</span>
              )}
              {time && (
                <span className="flex items-center gap-0.5 text-[10px] lg:text-[11px] text-text-primary">
                  <HiOutlineClock className="text-primary text-[10px] lg:text-xs" />
                  {time.slice(0, 5)}
                </span>
              )}
            </div>

            <button className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center shrink-0 transition-colors">
              <FaArrowRight className="text-white text-[9px] lg:text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;