import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaCog,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";

import { getProfile } from "../../../services/profileService";
import { logoutUser } from "../../../services/authService";

// =========================
// Sidebar Navigation Items
// =========================
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

// =========================
// Profile Menu Items
// =========================
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
  const [userName, setUserName] = useState("User");
  const [profileImage, setProfileImage] = useState(null);

  // =========================
  // Load Profile
  // =========================
  const loadProfile = async () => {
    try {
      const profile = await getProfile();

      console.log("SIDEBAR PROFILE:", profile);

      // =========================
      // Get User Name
      // =========================
      const name =
        profile?.fullName ||
        profile?.FullName ||
        profile?.name ||
        profile?.Name;

      if (name) {
        setUserName(name);
      }

      // =========================
      // Get Profile Image
      // =========================
      const image =
        profile?.image ||
        profile?.Image ||
        profile?.profilePicture ||
        profile?.ProfilePicture ||
        profile?.profileImage ||
        profile?.ProfileImage ||
        null;

      if (image) {
        // Already has data:image prefix
        if (image.startsWith("data:image")) {
          setProfileImage(image);
        } else {
          // Backend returns Base64
          setProfileImage(`data:image/jpeg;base64,${image}`);
        }
      } else {
        // No image
        setProfileImage(null);
      }
    } catch (error) {
      console.error(
        "Failed to load profile in Sidebar:",
        error
      );
    }
  };

  // =========================
  // Load Profile On Mount
  // + Listen For Profile Updates
  // =========================
  useEffect(() => {
    loadProfile();

    // Custom event from Profile page
    const handleProfileUpdated = () => {
      console.log("PROFILE UPDATED - RELOADING SIDEBAR");
      loadProfile();
    };

    window.addEventListener(
      "profileUpdated",
      handleProfileUpdated
    );

    // Storage event
    const handleStorageChange = (event) => {
      if (
        event.key === "profile" ||
        event.key === "profileImage"
      ) {
        loadProfile();
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdated
      );

      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    setProfileOpen(false);
    logoutUser();
  };

  // =========================
  // Profile Avatar
  // =========================
  const ProfileAvatar = ({
    size = "w-10 h-10",
    iconSize = 16,
  }) => {
    return (
      <div
        className={`
          ${size}
          rounded-full
          bg-primary
          shrink-0
          overflow-hidden
          flex
          items-center
          justify-center
        `}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUser
            className="text-white"
            size={iconSize}
          />
        )}
      </div>
    );
  };

  return (
    <aside
      className="
        fixed
        bottom-0
        left-0
        right-0

        lg:top-[77px]
        lg:bottom-auto
        lg:right-auto

        z-40

        h-16
        lg:h-[calc(100vh-77px)]

        w-full
        lg:w-[88px]

        flex
        flex-row
        lg:flex-col

        items-center
        lg:items-stretch

        justify-around
        lg:justify-between

        py-0
        lg:py-8

        px-2

        bg-white

        border-t
        lg:border-t-0
        lg:border-r

        border-gray-100
      "
    >
      {/* =========================
          TOP NAVIGATION
      ========================= */}
      <nav
        className="
          flex
          flex-row
          lg:flex-col
          items-center

          gap-1
          lg:gap-3

          w-full
        "
      >
        {NAV_ITEMS.map(
          ({ to, label, iconSrc, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) =>
                `
                flex
                flex-col
                items-center
                justify-center
                gap-1

                flex-1
                lg:flex-none

                lg:w-full

                py-2
                lg:py-2.5

                rounded-xl

                text-[10px]
                font-medium

                transition-colors

                ${
                  isActive
                    ? "bg-primary-light/60 text-primary"
                    : "text-slate hover:bg-light hover:text-text-primary"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 inline-block transition-colors ${
                      isActive ? "bg-primary" : "bg-slate-400"
                    }`}
                    style={{
                      WebkitMaskImage: `url(${iconSrc})`,
                      maskImage: `url(${iconSrc})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          )
        )}

        {/* =========================
            PROFILE - MOBILE
        ========================= */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `
            flex
            lg:hidden

            flex-col
            items-center
            justify-center

            gap-1

            flex-1

            py-2

            rounded-xl

            text-[10px]
            font-medium

            transition-colors

            ${
              isActive
                ? "bg-primary-light/60 text-primary"
                : "text-slate hover:bg-light hover:text-text-primary"
            }
            `
          }
        >
          <ProfileAvatar
            size="w-5 h-5"
            iconSize={11}
          />

          <span>Profile</span>
        </NavLink>
      </nav>

      {/* =========================
          DESKTOP PROFILE AREA
      ========================= */}
      <div className="hidden lg:block relative">

        {/* =========================
            PROFILE POPUP
        ========================= */}
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
            <div
              className="
                absolute
                bottom-16
                left-0

                z-50

                w-64

                bg-white

                rounded-2xl

                shadow-lg

                border
                border-gray-100

                p-2
              "
            >
              {/* User Header */}
              <NavLink
                to="/profile"
                onClick={() =>
                  setProfileOpen(false)
                }
                className="
                  flex
                  items-center
                  gap-3

                  px-2
                  py-2.5

                  mb-1

                  rounded-xl

                  hover:bg-light

                  transition-colors
                "
              >
                <ProfileAvatar
                  size="w-10 h-10"
                  iconSize={16}
                />

                <div className="min-w-0">
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-text-primary
                      truncate
                    "
                  >
                    {userName}
                  </p>

                  <p className="text-xs text-slate">
                    View profile
                  </p>
                </div>
              </NavLink>

              <div className="h-px bg-gray-100 my-1" />

              {/* Menu Items */}
              {MENU_ITEMS.map(
                ({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="
                      w-full

                      flex
                      items-center
                      justify-between

                      px-2
                      py-2.5

                      rounded-lg

                      text-sm
                      text-text-primary

                      hover:bg-light

                      transition-colors
                    "
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className="text-slate"
                        size={15}
                      />

                      {label}
                    </span>

                    <FaChevronRight
                      className="text-slate text-xs"
                    />
                  </button>
                )
              )}

              <div className="h-px bg-gray-100 my-1" />

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="
                  w-full

                  flex
                  items-center
                  justify-between

                  px-2
                  py-2.5

                  rounded-lg

                  text-sm
                  text-red-500

                  hover:bg-red-50

                  transition-colors
                "
              >
                <span className="flex items-center gap-3">
                  <FaSignOutAlt size={15} />

                  Logout
                </span>

                <FaChevronRight
                  className="text-red-400 text-xs"
                />
              </button>
            </div>
          </>
        )}

        {/* =========================
            DESKTOP PROFILE BUTTON
        ========================= */}
        <button
          type="button"
          onClick={() =>
            setProfileOpen((prev) => !prev)
          }
          className="
            w-full

            flex
            flex-col
            items-center
            justify-center

            gap-1

            py-2.5

            rounded-xl

            hover:bg-light

            transition-colors
          "
        >
          <ProfileAvatar
            size="w-10 h-10"
            iconSize={16}
          />

          <span
            className="
              text-[10px]
              font-medium
              text-slate
            "
          >
            Profile
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sideba