import { useState } from "react";

const days = [1, 2, 3, 4, 5];

function DaySelector() {
  const [activeDay, setActiveDay] = useState(4);

  return (
    <div className="border border-primary/40 lg:border-none lg:bg-white lg:rounded-2xl lg:shadow-sm lg:p-6 rounded-2xl p-2 mb-5 lg:mb-10">
      <div className="grid grid-cols-6 lg:grid-cols-5 gap-2 lg:gap-2.5">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`aspect-square lg:aspect-auto lg:py-3 rounded-xl border lg:border-0 flex flex-col items-center justify-center transition ${
              activeDay === day
                ? "bg-primary text-white border-primary lg:shadow-sm"
                : "bg-white text-text-primary border-primary/40 lg:bg-light lg:text-slate"
            }`}
          >
            <p className="text-[11px] lg:text-xs lg:opacity-80">Day</p>
            <p className="text-xl lg:text-base font-bold leading-none mt-1">{day}</p>
          </button>
        ))}

        <button className="aspect-square lg:aspect-auto lg:py-3 rounded-xl border lg:border-0 border-primary/40 bg-white lg:bg-light flex flex-col items-center justify-center text-text-primary lg:text-slate">
          <p className="text-[11px] lg:text-xs lg:opacity-80">More</p>
          <p className="text-xl lg:text-base font-bold leading-none mt-1">.</p>
        </button>
      </div>
    </div>
  );
}

export default DaySelector;