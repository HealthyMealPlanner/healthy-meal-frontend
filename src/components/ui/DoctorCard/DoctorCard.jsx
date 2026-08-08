import { FaStar, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";

function DoctorCard({ doctor }) {
  const { image, name, specialty, price, rating, time, reviews = 174, recommended } = doctor;

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[3/4.2] shadow-sm hover:shadow-lg transition-shadow group cursor-pointer">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      {recommended && (
        <span className="absolute top-2 left-2 bg-black/60 text-white text-[9px] px-2 py-1 rounded-md">
          Recommended
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-2.5">
       <div className="bg-white/80 backdrop-blur-lg rounded-xl p-3">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className="text-sm font-bold text-text-primary leading-tight flex items-center gap-1">
              {name}
              <FaCheckCircle className="text-primary text-[11px] shrink-0" />
            </p>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-text-primary leading-none">
                {price} EGP
              </p>
              <p className="text-[9px] text-slate mt-0.5">Per consultation</p>
            </div>
          </div>

          <p className="text-[11px] text-slate mb-2.5 leading-snug">{specialty}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] text-text-primary">
                <FaStar className="text-orange text-[10px]" />
                <span className="font-semibold">{rating}</span>
                <span className="text-slate">{reviews} Review</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] text-text-primary">
                <HiOutlineClock className="text-primary text-xs" />
                {time}
              </span>
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