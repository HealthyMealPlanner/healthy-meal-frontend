import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Camera,
  Pencil,
  Check,
  X,
} from "lucide-react";

import profileCover from "../../assets/images/profile-cover.png";

function ProfileHeader({
  profile,
  onProfileUpdate,
}) {
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(0);
  const [heightCm, setHeightCm] =
    useState("");
  const [weightKg, setWeightKg] =
    useState("");
  const [goal, setGoal] = useState(0);
  const [dailyCaloriesGoal, setDailyCaloriesGoal] =
    useState("");
  const [allergies, setAllergies] =
    useState("");

  const [imagePreview, setImagePreview] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  // Error message inside modal
  const [formError, setFormError] =
    useState("");

  // =========================
  // Load Profile
  // =========================
  useEffect(() => {
    if (!profile) return;

    setName(
      profile.name ??
        profile.fullName ??
        ""
    );

    setAge(
      profile.age != null
        ? String(profile.age)
        : ""
    );

    setGender(
      profile.gender != null
        ? Number(profile.gender)
        : 0
    );

    setHeightCm(
      profile.heightCm != null
        ? String(profile.heightCm)
        : ""
    );

    setWeightKg(
      profile.weightKg != null
        ? String(profile.weightKg)
        : ""
    );

    setGoal(
      profile.goal != null
        ? Number(profile.goal)
        : 0
    );

    setDailyCaloriesGoal(
      profile.dailyCaloriesGoal != null
        ? String(
            profile.dailyCaloriesGoal
          )
        : ""
    );

    setAllergies(
      profile.allergies ?? ""
    );

    setImagePreview(
      profile.imageUrl ??
        profile.profilePictureUrl ??
        null
    );

    setSelectedImage(null);
    setFormError("");
  }, [profile]);

  // =========================
  // First Letter
  // =========================
  const firstLetter =
    name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "U";

  // =========================
  // Start Editing
  // =========================
  const handleEdit = () => {
    setName(
      profile?.name ??
        profile?.fullName ??
        ""
    );

    setAge(
      profile?.age != null
        ? String(profile.age)
        : ""
    );

    setGender(
      profile?.gender != null
        ? Number(profile.gender)
        : 0
    );

    setHeightCm(
      profile?.heightCm != null
        ? String(profile.heightCm)
        : ""
    );

    setWeightKg(
      profile?.weightKg != null
        ? String(profile.weightKg)
        : ""
    );

    setGoal(
      profile?.goal != null
        ? Number(profile.goal)
        : 0
    );

    setDailyCaloriesGoal(
      profile?.dailyCaloriesGoal != null
        ? String(
            profile.dailyCaloriesGoal
          )
        : ""
    );

    setAllergies(
      profile?.allergies ?? ""
    );

    setImagePreview(
      profile?.imageUrl ??
        profile?.profilePictureUrl ??
        null
    );

    setSelectedImage(null);
    setFormError("");

    setIsEditing(true);
  };

  // =========================
  // Camera
  // =========================
  const handleCameraClick = () => {
    if (saving) return;

    fileInputRef.current?.click();
  };

  // =========================
  // Select Image
  // =========================
  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      setFormError(
        "Please select a valid image file."
      );

      event.target.value = "";
      return;
    }

    // Maximum 5 MB
    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setFormError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setFormError("");

    // Keep the actual File
    setSelectedImage(file);

    // Show preview immediately
    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================
  // Cancel
  // =========================
  const handleCancel = () => {
    setName(
      profile?.name ??
        profile?.fullName ??
        ""
    );

    setAge(
      profile?.age != null
        ? String(profile.age)
        : ""
    );

    setGender(
      profile?.gender != null
        ? Number(profile.gender)
        : 0
    );

    setHeightCm(
      profile?.heightCm != null
        ? String(profile.heightCm)
        : ""
    );

    setWeightKg(
      profile?.weightKg != null
        ? String(profile.weightKg)
        : ""
    );

    setGoal(
      profile?.goal != null
        ? Number(profile.goal)
        : 0
    );

    setDailyCaloriesGoal(
      profile?.dailyCaloriesGoal != null
        ? String(
            profile.dailyCaloriesGoal
          )
        : ""
    );

    setAllergies(
      profile?.allergies ?? ""
    );

    setImagePreview(
      profile?.imageUrl ??
        profile?.profilePictureUrl ??
        null
    );

    setSelectedImage(null);
    setFormError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsEditing(false);
  };

  // =========================
  // Save
  // =========================
  const handleSave = async () => {
    setFormError("");

    const trimmedName =
      name.trim();

    // =========================
    // Name
    // =========================
    if (!trimmedName) {
      setFormError(
        "Name cannot be empty."
      );
      return;
    }

    // =========================
    // Keep old values if empty
    // =========================
    const finalAge =
      age !== ""
        ? Number(age)
        : Number(
            profile?.age ?? 0
          );

    const finalHeight =
      heightCm !== ""
        ? Number(heightCm)
        : Number(
            profile?.heightCm ?? 0
          );

    const finalWeight =
      weightKg !== ""
        ? Number(weightKg)
        : Number(
            profile?.weightKg ?? 0
          );

    const finalCalories =
      dailyCaloriesGoal !== ""
        ? Number(
            dailyCaloriesGoal
          )
        : Number(
            profile?.dailyCaloriesGoal ??
              0
          );

    // =========================
    // Validation
    // =========================
    if (
      !Number.isFinite(finalAge) ||
      finalAge <= 0
    ) {
      setFormError(
        "Please enter a valid age."
      );
      return;
    }

    if (
      !Number.isFinite(finalHeight) ||
      finalHeight <= 0
    ) {
      setFormError(
        "Please enter a valid height."
      );
      return;
    }

    if (
      !Number.isFinite(finalWeight) ||
      finalWeight <= 0
    ) {
      setFormError(
        "Please enter a valid weight."
      );
      return;
    }

    if (
      !Number.isFinite(finalCalories) ||
      finalCalories <= 0
    ) {
      setFormError(
        "Please enter a valid daily calories goal."
      );
      return;
    }

    // =========================
    // Prepare updated profile
    // =========================
    const updatedProfile = {
      ...profile,

      name: trimmedName,

      fullName: trimmedName,

      age: finalAge,

      gender: Number(gender),

      heightCm: finalHeight,

      weightKg: finalWeight,

      goal: Number(goal),

      dailyCaloriesGoal:
        finalCalories,

      allergies:
        allergies.trim(),
    };

    // =========================
    // IMPORTANT:
    // Send image ONLY if selected
    // =========================
    if (
      selectedImage instanceof File
    ) {
      updatedProfile.profilePicture =
        selectedImage;
    }

    try {
      setSaving(true);

      await onProfileUpdate(
        updatedProfile
      );

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }

      setSelectedImage(null);
      setFormError("");
      setIsEditing(false);
    } catch (error) {
      console.error(
        "Save profile error:",
        error
      );

      // NO ALERT
      setFormError(
        error?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* =========================
          Profile Header
      ========================== */}
      <section className="w-full">
        {/* Cover */}
        <div className="relative h-[190px] w-full overflow-hidden rounded-b-2xl">
          <img
            src={profileCover}
            alt="Profile cover"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Profile Information */}
        <div className="relative w-full bg-white">
          <div className="relative flex min-h-[85px] items-center justify-between px-6">

            {/* Avatar */}
            <div className="absolute left-6 top-0 z-20 -translate-y-1/2">
              <div className="relative">

                <div className="h-[92px] w-[92px] overflow-hidden rounded-full border-4 border-white bg-primary-light shadow-md">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={
                        name ||
                        "Profile"
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {firstLetter}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Name */}
            <div className="ml-[112px] min-w-0 py-4">
              <h2 className="truncate text-lg font-bold text-text-primary">
                {name || "User"}
              </h2>

              <p className="mt-1 text-xs text-slate">
                Nutrition & wellness enthusiast
              </p>
            </div>

            {/* Edit */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-text-primary shadow-sm transition hover:bg-light"
              >
                <Pencil size={13} />
                Edit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Edit Modal
      ========================== */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  Edit Profile
                </h2>

                <p className="mt-1 text-xs text-slate">
                  Update your personal and nutrition information.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6 p-6">

              {/* Form Error */}
              {formError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              {/* =========================
                  Profile Picture
              ========================== */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-primary">
                  Profile Picture
                </label>

                <div className="flex items-center gap-4">

                  <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-slate-200 bg-primary-light">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {firstLetter}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={
                        handleCameraClick
                      }
                      disabled={saving}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Camera size={16} />
                      Change Photo
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageChange
                      }
                      className="hidden"
                    />

                    <p className="mt-1 text-xs text-slate">
                      Maximum size: 5 MB
                    </p>
                  </div>
                </div>
              </div>

              {/* =========================
                  Full Name
              ========================== */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(
                      event.target.value
                    );
                    setFormError("");
                  }}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>

              {/* =========================
                  Age + Gender
              ========================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Age
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={age}
                    onChange={(event) => {
                      setAge(
                        event.target.value
                      );
                      setFormError("");
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Gender
                  </label>

                  <select
                    value={gender}
                    onChange={(event) => {
                      setGender(
                        Number(
                          event.target.value
                        )
                      );
                      setFormError("");
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value={0}>
                      Male
                    </option>

                    <option value={1}>
                      Female
                    </option>
                  </select>
                </div>
              </div>

              {/* =========================
                  Height + Weight
              ========================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Height (cm)
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={heightCm}
                    onChange={(event) => {
                      setHeightCm(
                        event.target.value
                      );
                      setFormError("");
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. 170"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={weightKg}
                    onChange={(event) => {
                      setWeightKg(
                        event.target.value
                      );
                      setFormError("");
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. 65"
                  />
                </div>
              </div>

              {/* =========================
                  Goal + Calories
              ========================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Goal
                  </label>

                  <select
                    value={goal}
                    onChange={(event) => {
                      setGoal(
                        Number(
                          event.target.value
                        )
                      );
                      setFormError("");
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value={0}>
                      Maintain Weight
                    </option>

                    <option value={1}>
                      Weight Loss
                    </option>

                    <option value={2}>
                      Weight Gain
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Daily Calories Goal
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={
                      dailyCaloriesGoal
                    }
                    onChange={(event) => {
                      setDailyCaloriesGoal(
                        event.target.value
                      );
                      setFormError("");
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. 2000"
                  />
                </div>
              </div>

              {/* =========================
                  Allergies
              ========================== */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Allergies
                </label>

                <textarea
                  value={allergies}
                  onChange={(event) => {
                    setAllergies(
                      event.target.value
                    );
                    setFormError("");
                  }}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your allergies, or leave empty if none"
                />
              </div>
            </div>

            {/* =========================
                Footer
            ========================== */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t bg-white px-6 py-4">

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-slate-50 disabled:opacity-50"
              >
                <X size={15} />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Check size={15} />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileHeader;