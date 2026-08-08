import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

const NAV_ITEMS = [
  { 
    to: "/", 
    label: "Home", 
    iconSrc: "/solar_home-2-bold.svg", 
    end: true 
  },
  { 
    to: "/explore", 
    label: "Explore", 
    iconSrc: "/Group.svg" 
  },
  { 
    to: "/chat-ai", 
    label: "chatAI", 
    iconSrc: "/ri_chat-ai-line.svg" 
  },
  { 
    to: "/dietitians", 
    label: "Dietitians", 
    iconSrc: "/arcticons_doctor-care-anywhere.svg" 
  },
];

const MENU_ITEMS = [
  { label: "Settings", icon: FaCog },
  { label: "Help & Support", icon: FaQuestionCircle },
  { label: "About Us", icon: FaInfoCircle },
];

function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="hidden lg:flex flex-col items-center justify-between fixed top-[77px] left-0 z-40 w-[88px] h-[calc(100vh-77px)] py-8 px-2 bg-white border-r border-gray-100">
      <nav className="flex flex-col items-center gap-3 w-full">
        {NAV_ITEMS.map(({ to, label, iconSrc, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 w-full py-2.5 rounded-xl text-[11px] font-medium transition-colors ${
                isActive
                  ? "text-primary bg-primary-light/60"
                  : "text-slate hover:bg-light hover:text-text-primary"
              }`
            }
          >
            <img 
              src={iconSrc} 
              alt={label} 
              className="w-5 h-5 object-contain"
            />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="relative">
        {profileOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setProfileOpen(false)}
            />
            <div className="absolute bottom-16 left-0 z-50 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
              <div className="flex items-center gap-3 px-2 py-2.5 mb-1">
                <div className="w-10 h-10 rounded-full bg-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    Sarah Ahmed Shalaby
                  </p>
                  <p className="text-xs text-slate">View profile</p>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-1" />

              {MENU_ITEMS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="w-full flex items-center justify-between px-2 py-2.5 rounded-lg text-sm text-text-primary hover:bg-light transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="text-slate" size={15} />
                    {label}
                  </span>
                  <FaChevronRight className="text-slate text-xs" />
                </button>
              ))}

              <div className="h-px bg-gray-100 my-1" />

              <button className="w-full flex items-center justify-between px-2 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                <span className="flex items-center gap-3">
                  <FaSignOutAlt size={15} />
                  Logout
                </span>
                <FaChevronRight className="text-red-400 text-xs" />
              </button>
            </div>
          </>
        )}

        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="relative z-50 flex items-center gap-3 rounded-xl p-1 hover:bg-light transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary ring-2 ring-white" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;