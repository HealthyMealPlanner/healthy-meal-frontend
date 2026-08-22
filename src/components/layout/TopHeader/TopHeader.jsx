import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mockNotifications = [
  {
    id: 1,
    title: "Appointment confirmed",
    message: "Your session with Dr. Amal Ibrahim is confirmed for today, 2:30 PM.",
    time: "10 min ago",
  },
  {
    id: 2,
    title: "New recipe recommendation",
    message: "Check out a new Mediterranean recipe picked for your goals.",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Weekly goal reminder",
    message: "You're 3 recipes away from completing this week's diet plan.",
    time: "1 day ago",
  },
];

function TopHeader() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed === "") return;
    navigate(`/explore?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // قفل الـ dropdown لما تدوسي بره
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="hidden lg:flex fixed top-0 left-0 right-0 z-50 items-center justify-between gap-6 px-10 py-5 h-[77px] bg-main-bg border-b border-gray-300/50">
      
      {/* قسم اللوجو والنص */}
      <div className="flex items-center shrink-0">
        <img
          src="/Frame 2085665220.svg"
          alt="E Bite"
          className="h-9 w-auto object-contain -mr-4"
        />
        <span className="text-xl font-bold text-text-primary">
          <span className="text-primary mr-0.5">E </span>Bite
        </span>
      </div>

      {/* حقل البحث */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="bg-transparent border border-slate/40 rounded-2xl px-4 py-2.5 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSearch}
            className="shrink-0"
          >
            <img
              src="/lineicons_search-2.svg"
              alt="Search"
              className="w-4 h-4 object-contain opacity-70"
            />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search doctor, specialty, or plan"
            className="outline-none text-sm w-full placeholder:text-text-primary/50 text-text-primary bg-transparent"
          />
        </div>
      </div>

      {/* أيقونة الإشعارات */}
      <div className="relative shrink-0" ref={notifRef}>
        <button
          onClick={() => setNotifOpen((v) => !v)}
          className="relative flex items-center justify-center"
        >
          <img 
            src="/flowbite_bell-active-solid.svg" 
            alt="Notifications" 
            className="w-6 h-6 object-contain" 
          />
          {mockNotifications.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
              {mockNotifications.length}
            </span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-text-primary">
                Notifications
              </h3>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className="px-4 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition"
                >
                  <p className="text-sm font-semibold text-text-primary mb-0.5">
                    {n.title}
                  </p>
                  <p className="text-xs text-slate mb-1">{n.message}</p>
                  <p className="text-[11px] text-slate/60">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </header>
  );
}

export default TopHeader;