import { FaBullseye, FaWallet, FaBalanceScale, FaBan, FaBoxOpen } from "react-icons/fa";

const PREFERENCES = [
  { icon: FaBullseye, label: "GOAL", value: "Weight Loss" },
  { icon: FaWallet, label: "DAILY BUDGET", value: "EGP 200 / day" },
  { icon: FaBalanceScale, label: "DIET", value: "Balanced" },
  { icon: FaBan, label: "RESTRICTIONS", value: "No Peanuts" },
  { icon: FaBoxOpen, label: "PANTRY", value: "3 items available" },
];

function PreferencesSidebar() {
  return (
    <div className="hidden lg:flex flex-col gap-5 w-[320px] shrink-0">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-4">Your Preferences</h3>

        <div className="flex flex-col gap-2">
          {PREFERENCES.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 bg-light rounded-xl px-3 py-3">
              <Icon className="text-slate text-base shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-slate tracking-wide">{label}</p>
                <p className="text-sm font-bold text-text-primary">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="text-sm font-semibold text-primary hover:underline mt-3">
          Edit preferences →
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-text-primary">Daily Goal Progress</h3>
          <span className="text-[10px] font-bold text-white bg-primary px-2 py-1 rounded-md">PRO</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <svg width="64" height="64" className="-rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#e2e8f0" strokeWidth="7" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#10b981"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26 * (1 - 0.75)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-text-primary">
              75%
            </div>
          </div>
          <div>
            <p className="text-xs text-slate mb-0.5">You have consumed</p>
            <p className="text-sm font-bold text-text-primary">150 / 200 EGP budget</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreferencesSidebar;