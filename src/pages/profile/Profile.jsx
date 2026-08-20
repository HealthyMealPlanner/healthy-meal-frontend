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
  // Normalize Profile
  // =========================
  const normalizeProfile = (data) => {
    if (!data) return null;

    // =========================
    // Image
    // =========================
    const image =
      data.image ??
      data.imageUrl ??
      data.profilePictureUrl ??
      data.profilePicture ??
      null;

    let normalizedImage = null;

    if (image) {
      // Already a complete data URL
      if (
        typeof image === "string" &&
        image.startsWith("data:image/")
      ) {
        normalizedImage = image;
      }

      // Normal URL
      else if (
        typeof image === "string" &&
        (
          image.startsWith("http://") ||
          image.startsWith("https://") ||
          image.startsWith("/")
        )
      ) {
        normalizedImage = image;
      }

      // Backend returned Base64
      else if (typeof image === "string") {
        normalizedImage =
          `data:image/png;base64,${image}`;
      }
    }

    return {
      ...data,

      // =========================
      // Name
      // =========================
      name:
        data.name ??
        data.fullName ??
        "",

      fullName:
        data.fullName ??
        data.name ??
        "",

      // =========================
      // Image
      // =========================
      profilePictureUrl: normalizedImage,

      imageUrl: normalizedImage,

      // =========================
      // Nutrition
      // =========================
      age: data.age ?? null,

      gender: data.gender ?? null,

      heightCm: data.heightCm ?? null,

      weightKg: data.weightKg ?? null,

      goal: data.goal ?? null,

      dailyCaloriesGoal:
        data.dailyCaloriesGoal ?? null,

      allergies:
        data.allergies ?? "",

      // =========================
      // Subscription
      // =========================
      subscriptionTier:
        data.subscriptionTier ?? 0,

      subscriptionExpiresAt:
        data.subscriptionExpiresAt ?? null,
    };
  };

  // =========================
  // Get Profile
  // =========================
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      console.log("GET PROFILE:", data);

      const normalized =
        normalizeProfile(data);

      console.log(
        "NORMALIZED PROFILE:",
        normalized
      );

      setProfile(normalized);
    } catch (err) {
      console.error(
        "Profile error:",
        err
      );

      setError(
        err?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Load Profile
  // =========================
  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // Update Profile
  // =========================
  const handleProfileUpdate = async (
    updatedProfile
  ) => {
    try {
      setError("");

      /*
       * Keep existing values when needed.
       * This prevents sending 0 accidentally
       * and resetting saved backend values.
       */

      const profileData = {
        // =========================
        // Personal
        // =========================
        fullName:
          updatedProfile.name ??
          updatedProfile.fullName ??
          profile?.fullName ??
          "",

        // =========================
        // Age
        // =========================
        age:
          updatedProfile.age !== "" &&
          updatedProfile.age != null
            ? Number(updatedProfile.age)
            : Number(profile?.age ?? 0),

        // =========================
        // Gender
        // =========================
        gender:
          updatedProfile.gender !== "" &&
          updatedProfile.gender != null
            ? Number(
                updatedProfile.gender
              )
            : Number(
                profile?.gender ?? 0
              ),

        // =========================
        // Height
        // =========================
        heightCm:
          updatedProfile.heightCm !== "" &&
          updatedProfile.heightCm != null
            ? Number(
                updatedProfile.heightCm
              )
            : Number(
                profile?.heightCm ?? 0
              ),

        // =========================
        // Weight
        // =========================
        weightKg:
          updatedProfile.weightKg !== "" &&
          updatedProfile.weightKg != null
            ? Number(
                updatedProfile.weightKg
              )
            : Number(
                profile?.weightKg ?? 0
              ),

        // =========================
        // Goal
        // =========================
        goal:
          updatedProfile.goal !== "" &&
          updatedProfile.goal != null
            ? Number(
                updatedProfile.goal
              )
            : Number(
                profile?.goal ?? 0
              ),

        // =========================
        // Daily Calories
        // =========================
        dailyCaloriesGoal:
          updatedProfile.dailyCaloriesGoal !== "" &&
          updatedProfile.dailyCaloriesGoal != null
            ? Number(
                updatedProfile.dailyCaloriesGoal
              )
            : Number(
                profile?.dailyCaloriesGoal ?? 0
              ),

        // =========================
        // Allergies
        // =========================
        allergies:
          updatedProfile.allergies ??
          profile?.allergies ??
          "",
      };

      // =========================
      // Profile Picture
      // =========================
      /*
       * Only send a picture when the user
       * selected a NEW file.
       *
       * Do not send null.
       */
      if (
        updatedProfile.profilePicture instanceof
        File
      ) {
        profileData.profilePicture =
          updatedProfile.profilePicture;
      }

      console.log(
        "PROFILE DATA BEFORE UPDATE:",
        profileData
      );

      // =========================
      // PUT
      // =========================
      await updateProfile(
        profileData
      );

      // =========================
      // GET Fresh Profile
      // =========================
      const freshProfile =
        await getProfile();

      console.log(
        "PROFILE AFTER UPDATE:",
        freshProfile
      );

      // =========================
      // Normalize Fresh Profile
      // =========================
      const normalizedProfile =
        normalizeProfile(
          freshProfile
        );

      console.log(
        "NORMALIZED PROFILE AFTER UPDATE:",
        normalizedProfile
      );

      setProfile(
        normalizedProfile
      );
    } catch (err) {
      console.error(
        "Update profile error:",
        err
      );

      setError(
        err?.message ||
          "Failed to update profile"
      );

      throw err;
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
        onProfileUpdate={
          handleProfileUpdate
        }
      />

      {/* =========================
          Tabs
      ========================== */}
      <div className="mt-5">
        <ProfileTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* =========================
          Content
      ========================== */}
      <div className="mt-5">

        {/* =========================
            Overview
        ========================== */}
        {activeTab === "Overview" && (
          <>
            <ProfileStats
              profile={profile}
            />

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
                {profile.allergies?.trim()
                  ? profile.allergies
                  : "None"}
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