import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import SubscriptionCard from "../../components/profile/SubscriptionCard";
import ProfileTabs from "../../components/profile/ProfileTabs";
import FavoriteRecipes from "../../components/profile/FavoriteRecipes";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("Overview");

  // =========================
  // Get Profile
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProfile();

        setProfile(data);
      } catch (err) {
        console.error("Profile error:", err);

        setError(
          err.message || "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================
  // Update Profile
  // =========================
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      setError("");

      const profileData = {
        fullName: updatedProfile.name,
        age: updatedProfile.age,
        gender: updatedProfile.gender,
        heightCm: updatedProfile.heightCm,
        weightKg: updatedProfile.weightKg,
        goal: updatedProfile.goal,
        dailyCaloriesGoal:
          updatedProfile.dailyCaloriesGoal,
        allergies: updatedProfile.allergies,
        profilePictureUrl:
          updatedProfile.profilePictureUrl,
      };

      await updateProfile(profileData);

      // Update the page immediately
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...updatedProfile,
      }));
    } catch (err) {
      console.error("Update profile error:", err);

      setError(
        err.message || "Failed to update profile"
      );

      // Show error to user
      alert(
        err.message || "Failed to update profile"
      );
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <main className="w-full">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-slate">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // Error
  // =========================
  if (error && !profile) {
    return (
      <main className="w-full">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // No Profile
  // =========================
  if (!profile) {
    return null;
  }

  return (
    <main className="w-full">
      {/* =========================
          Profile Header
      ========================== */}
      <ProfileHeader
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />

      {/* =========================
          Profile Tabs
      ========================== */}
      <div className="mt-5">
        <ProfileTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* =========================
          Tab Content
      ========================== */}
      <div className="mt-5">
        {/* =========================
            Overview
        ========================== */}
        {activeTab === "Overview" && (
          <>
            <ProfileStats profile={profile} />

            <div className="mt-5">
              <SubscriptionCard
                profile={profile}
              />
            </div>
          </>
        )}

        {/* =========================
            Favourites
        ========================== */}
        {activeTab === "Favourites" && (
          <FavoriteRecipes />
        )}

        {/* =========================
            Preference
        ========================== */}
        {activeTab === "Preference" && (
          <section>
            <h2 className="text-sm font-semibold text-text-primary">
              Dietary Preferences
            </h2>

            <p className="mt-1 text-xs text-slate">
              Your saved dietary preferences.
            </p>

            <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs text-slate">
                Allergies
              </p>

              <p className="mt-2 text-sm font-semibold text-text-primary">
                {profile.allergies || "None"}
              </p>
            </div>
          </section>
        )}

        {/* =========================
            Booking
        ========================== */}
        {activeTab === "Booking" && (
          <section>
            <h2 className="text-sm font-semibold text-text-primary">
              Booking
            </h2>

            <div className="mt-4 flex min-h-[180px] items-center justify-center rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs text-slate">
                Your bookings will appear here.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default Profile;