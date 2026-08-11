import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import {
  FaCompass,
  FaUserMd,
  FaCog,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { RiChatAiLine } from "react-icons/ri";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: HiOutlineHome, end: true },
  { to: "/explore", label: "Explore", icon: FaCompass },
  { to: "/chat-ai", label: "chatAI", icon: RiChatAiLine },
  { to: "/dietitians", label: "Dietitians", icon: FaUserMd },
];

const MENU_ITEMS = [
  { label: "Settings", icon: FaCog },
  { label: "Help & Support", icon: FaQuestionCircle },
  { label: "About Us", icon: FaInfoCircle },
];

function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside
      className="flex items-center lg:items-stretch justify-around lg:justify-between
        fixed bottom-0 left-0 right-0 lg:top-[77px] lg:bottom-auto lg:right-auto
        z-40 h-16 lg:h-[calc(100vh-77px)] w-full lg:w-[88px]
        flex-row lg:flex-col
        py-0 lg:py-8 px-2 lg:px-2
        bg-white border-t lg:border-t-0 lg:border-r border-gray-100"
    >
      <nav className="flex flex-row lg:flex-col items-center gap-1 lg:gap-3 w-full lg:w-full">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 flex-1 lg:w-full lg:flex-none py-2 lg:py-2.5 rounded-xl text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-primary bg-primary-light/60"
                  : "text-slate hover:bg-light hover:text-text-primary"
              }`
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Profile trigger — desktop only; mobile keeps just the 4 nav icons */}
      <div className="hidden lg:block relative">
        {profileOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
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