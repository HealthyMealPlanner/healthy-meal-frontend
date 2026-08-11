const tabs = [
  "Overview",
  "Favourites",
  "Preference",
  "Booking",
];

function ProfileTabs({ activeTab, onChange }) {
  return (
    <div className="border-b border-slate-200">
      <div className="flex items-center gap-8">
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={`relative pb-3 text-xs transition ${
                active
                  ? "font-semibold text-primary"
                  : "text-slate hover:text-text-primary"
              }`}
            >
              {tab}

              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileTabs;