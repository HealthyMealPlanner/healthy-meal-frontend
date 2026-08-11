import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";

const NAV_ITEMS = [
  {
    to: "/home",
    label: "Home",
    iconSrc: "/solar_home-2-bold.svg",
    end: true,
  },
  {
    to: "/explore",
    label: "Explore",
    iconSrc: "/Group.svg",
  },
  {
    to: "/chat-ai",
    label: "chatAI",
    iconSrc: "/ri_chat-ai-line.svg",
  },
  {
    to: "/dietitians",
    label: "Dietitians",
    iconSrc: "/arcticons_doctor-care-anywhere.svg",
  },
];

const MENU_ITEMS = [
  {
    label: "Settings",
    icon: FaCog,
  },
  {
    label: "Help & Support",
    icon: FaQuestionCircle,
  },
  {
    label: "About Us",
    icon: FaInfoCircle,
  },
];

function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-[77px] z-40 hidden h-[calc(100vh-77px)] w-[88px] flex-col items-center justify-between border-r border-gray-100 bg-white px-2 py-8 lg:flex">

      {/* =========================
          Main Navigation
      ========================= */}
      <nav className="flex w-full flex-col items-center gap-3">
        {NAV_ITEMS.map(({ to, label, iconSrc, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex w-full flex-col items-center gap-1 rounded-xl py-2.5 text-[11px] font-medium transition-colors ${
                isActive
                  ? "bg-primary-light/60 text-primary"
                  : "text-slate hover:bg-light hover:text-text-primary"
              }`
            }
          >
            <img
              src={iconSrc}
              alt={label}
              className="h-5 w-5 object-contain"
            />

            {label}
          </NavLink>
        ))}

        {/* =========================
            Profile
        ========================= */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex w-full flex-col items-center gap-1 rounded-xl py-2.5 text-[11px] font-medium transition-colors ${
              isActive
                ? "bg-primary-light/60 text-primary"
                : "text-slate hover:bg-light hover:text-text-primary"
            }`
          }
        >
          <FaUser size={19} />

          Profile
        </NavLink>
      </nav>

      {/* =========================
          Profile Menu
      ========================= */}
      <div className="relative">
        {profileOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setProfileOpen(false)}
            />

            {/* Popup */}
            <div className="absolute bottom-16 left-0 z-50 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">

              {/* User */}
              <div className="mb-1 flex items-center gap-3 px-2 py-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                  <FaUser className="text-white" size={16} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    Sarah Ahmed Shalaby
                  </p>

                  <p className="text-xs text-slate">
                    View profile
                  </p>
                </div>
              </div>

              <div className="my-1 h-px bg-gray-100" />

              {/* Menu */}
              {MENU_ITEMS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-sm text-text-primary transition-colors hover:bg-light"
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className="text-slate"
                      size={15}
                    />

                    {label}
                  </span>

                  <FaChevronRight
                    className="text-xs text-slate"
                  />
                </button>
              ))}

              <div className="my-1 h-px bg-gray-100" />

              {/* Logout */}
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                <span className="flex items-center gap-3">
                  <FaSignOutAlt size={15} />

                  Logout
                </span>

                <FaChevronRight className="text-xs text-red-400" />
              </button>
            </div>
          </>
        )}

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={() => setProfileOpen((v) => !v)}
          className="relative z-50 flex items-center gap-3 rounded-xl p-1 transition-colors hover:bg-light"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary ring-2 ring-white">
            <FaUser
              className="text-white"
              size={16}
            />
          </div>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;