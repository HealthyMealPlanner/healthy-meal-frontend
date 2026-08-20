import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import {
  FaCog,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";

import { getProfile } from "../../../services/profileService";

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
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    logout();
    setProfileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  // =========================
  // Get Profile
  // =========================
  const loadProfile = async () => {
    try {
      const data = await getProfile();

      console.log("SIDEBAR PROFILE:", data);

      setProfile(data);
    } catch (error) {
      console.error(
        "Failed to load sidebar profile:",
        error
      );
    }
  };

  // =========================
  // Load Profile
  // =========================
  useEffect(() => {
    loadProfile();
  }, []);

  // =========================
  // Listen for Profile Update
  // =========================
  useEffect(() => {
    const handleProfileUpdated = () => {
      loadProfile();
    };

    window.addEventListener(
      "profile-updated",
      handleProfileUpdated
    );

    return () => {
      window.removeEventListener(
        "profile-updated",
        handleProfileUpdated
      );
    };
  }, []);

  // =========================
  // Profile Name
  // =========================
  const profileName =
    profile?.fullName ??
    profile?.name ??
    "User";

  // =========================
  // First Letter
  // =========================
  const firstLetter =
    profileName
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "U";

  // =========================
  // Profile Image
  // =========================
  const getProfileImage = () => {
    const image =
      profile?.image ??
      profile?.imageUrl ??
      profile?.profilePictureUrl ??
      profile?.profilePicture ??
      null;

    if (!image) {
      return null;
    }

    // Already a complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:image/")
    ) {
      return image;
    }

    // Backend returns Base64
    return `data:image/jpeg;base64,${image}`;
  };

  const profileImage = getProfileImage();

  // =========================
  // Profile Avatar
  // =========================
  const ProfileAvatar = ({
    size = "h-10 w-10",
  }) => {
    return (
      <div
        className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary ring-2 ring-white`}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt={profileName}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-white">
            {firstLetter}
          </span>
        )}
      </div>
    );
  };

  return (
    <aside className="fixed left-0 top-[77px] z-40 hidden h-[calc(100vh-77px)] w-[88px] flex-col items-center justify-between border-r border-gray-100 bg-white px-2 py-8 lg:flex">

      {/* =========================
          Main Navigation
      ========================= */}
      <nav className="flex w-full flex-col items-center gap-3">
        {NAV_ITEMS.map(
          ({ to, label, iconSrc, end }) => (
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
          )
        )}

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
              onClick={() =>
                setProfileOpen(false)
              }
            />

            {/* Popup */}
            <div className="absolute bottom-16 left-0 z-50 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">

              {/* =========================
                  User
              ========================= */}
              <div className="mb-1 flex items-center gap-3 px-2 py-2.5">

                <ProfileAvatar size="h-10 w-10" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {profileName}
                  </p>

                  {/* View Profile */}
                  <NavLink
                    to="/profile"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                    className="text-xs text-slate transition-colors hover:text-primary"
                  >
                    View profile
                  </NavLink>
                </div>
              </div>

              <div className="my-1 h-px bg-gray-100" />

              {/* =========================
                  Menu
              ========================= */}
              {MENU_ITEMS.map(
                ({ label, icon: Icon }) => (
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

                    <FaChevronRight className="text-xs text-slate" />
                  </button>
                )
              )}

              <div className="my-1 h-px bg-gray-100" />

              {/* =========================
                  Logout
              ========================= */}
              <button
                type="button"
                onClick={handleLogout}
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

        {/* =========================
            Profile Avatar
        ========================= */}
        <button
          type="button"
          onClick={() =>
            setProfileOpen((v) => !v)
          }
          className="relative z-50 flex items-center gap-3 rounded-xl p-1 transition-colors hover:bg-light"
        >
          <ProfileAvatar size="h-10 w-10" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;