import { HiSparkles } from "react-icons/hi2";

function ConsultationBanner() {
  return (
    <div className="relative w-full max-w-[335px] h-[38px] mx-auto bg-white/60 border border-primary/30 rounded-2xl px-3 flex items-center justify-between mb-5
      lg:max-w-none lg:h-auto lg:mx-0 lg:bg-primary-light/60 lg:px-8 lg:py-6 lg:mb-10 lg:flex-row lg:items-center lg:gap-8">
      <HiSparkles className="absolute -top-2 -left-2 text-primary text-lg lg:hidden" />
      <HiSparkles className="absolute -bottom-2 -right-2 text-primary text-lg lg:hidden" />

      <div className="lg:flex-1">
        <p className="hidden lg:flex items-center gap-1.5 text-primary text-sm font-semibold uppercase tracking-wide mb-2">
          <HiSparkles size={14} />
          Limited offer
        </p>
        <p className="text-sm leading-none text-text-primary font-medium w-[232px] truncate lg:w-auto lg:whitespace-normal lg:text-2xl lg:font-bold lg:leading-snug lg:mb-1.5">
          First free initial consultation with a nutritionist
        </p>
      </div>

      <button className="bg-primary hover:bg-primary-dark active:bg-primary-dark text-white text-[10px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-colors
        lg:text-sm lg:px-6 lg:py-3.5 lg:rounded-xl">
        Book Now
      </button>
    </div>
  );
}

export default ConsultationBanner;