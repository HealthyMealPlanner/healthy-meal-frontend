import { FaClock, FaBolt, FaPlay, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function RecipeChatCard({ recipe }) {
  const navigate = useNavigate();
  const { id, image, title, description, time, calories, price } = recipe;

  return (
    <div className="max-w-md bg-white rounded-2xl shadow-sm overflow-hidden mt-3">
      <div className="relative h-56">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            <FaClock className="text-[10px]" /> {time} mins
          </span>
          <span className="flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            <FaBolt className="text-[10px]" /> {calories} kcal
          </span>
        </div>

        <span className="absolute bottom-3 right-3 bg-white text-text-primary text-xs font-bold px-3 py-1.5 rounded-lg">
          Est. {price} EGP
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-text-primary mb-1">{title}</h3>
        <p className="text-sm text-slate mb-4">{description}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/recipe/${id}`)}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            <FaPlay className="text-xs" />
            Start Cooking
          </button>
          <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-light transition-colors shrink-0">
            <FaRegHeart className="text-slate text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeChatCard;