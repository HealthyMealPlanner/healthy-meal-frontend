import { FaRegCalendarAlt } from "react-icons/fa";

const appointments = [
  { doctor: "Dr.Aml Ibrahim", time: "Today, 2:30PM", type: "Video call" },
  { doctor: "Dr.Aml Ibrahim", time: "Today, 11:00PM", type: "Video call" },
];

function UpcomingCard() {
  return (
    <div className="hidden lg:block bg-white rounded-2xl p-6 shadow-sm h-fit">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Upcomming</h3>
      <div className="flex flex-col gap-3">
        {appointments.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-primary-light/60 hover:bg-primary-light rounded-xl px-4 py-3.5 transition-colors cursor-pointer"
          >
            <span className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
              <FaRegCalendarAlt className="text-primary text-sm" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">
                {item.doctor}
              </p>
              <p className="text-xs text-slate">
                {item.time} · {item.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingCard;