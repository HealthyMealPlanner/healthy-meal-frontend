import { useEffect, useRef, useState } from "react";
import { Camera, Pencil, Check, X } from "lucide-react";

import profileCover from "../../assets/images/profile-cover.png";

function ProfileHeader({ profile, onProfileUpdate }) {
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setName(profile?.name || "");
    setImagePreview(profile?.imageUrl || null);
  }, [profile]);

  const firstLetter =
    name?.trim()?.charAt(0)?.toUpperCase() || "U";

  // =========================
  // Start Editing
  // =========================
  const handleEdit = () => {
    setName(profile?.name || "");
    setImagePreview(profile?.imageUrl || null);
    setIsEditing(true);
  };

  // =========================
  // Camera
  // =========================
  const handleCameraClick = () => {
    if (!isEditing) return;

    fileInputRef.current?.click();
  };

  // =========================
  // Select Image
  // =========================
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================
  // Cancel
  // =========================
  const handleCancel = () => {
    setName(profile?.name || "");
    setImagePreview(profile?.imageUrl || null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsEditing(false);
  };

  // =========================
  // Save
  // =========================
  const handleSave = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Name cannot be empty.");
      return;
    }

    const updatedProfile = {
      ...profile,
      name: trimmedName,
    };

    onProfileUpdate?.(updatedProfile);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsEditing(false);
  };

  return (
    <section className="w-full">
      {/* =========================
          Cover
      ========================== */}
      <div className="relative h-[190px] w-full overflow-hidden rounded-b-2xl">
        <img
          src={profileCover}
          alt="Profile cover"
          className="h-full w-full object-cover"
        />
      </div>

      {/* =========================
          Profile Information
      ========================== */}
      <div className="relative w-full bg-white">
        <div className="relative flex min-h-[85px] items-center justify-between px-6">
          {/* =========================
              Avatar
          ========================== */}
          <div className="absolute left-6 top-0 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Avatar */}
              <div className="h-[92px] w-[92px] overflow-hidden rounded-full border-4 border-white bg-primary-light shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={name || "Profile"}
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

              {/* =========================
                  Camera Button
              ========================== */}
              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={handleCameraClick}
                    className="absolute bottom-0 right-0 z-30 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-md transition hover:bg-primary-dark"
                    aria-label="Change profile picture"
                    title="Change profile picture"
                  >
                    <Camera
                      size={15}
                      strokeWidth={2.3}
                    />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}

              {/* Online Status */}
              <span className="absolute bottom-1 right-0 z-20 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
          </div>

          {/* =========================
              Name + Bio
          ========================== */}
          <div className="ml-[112px] min-w-0 py-4">
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                autoFocus
                className="w-full max-w-[280px] rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-base font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            ) : (
              <h2 className="truncate text-lg font-bold text-text-primary">
                {name || "User"}
              </h2>
            )}

            <p className="mt-1 text-xs text-slate">
              Nutrition & wellness enthusiast
            </p>
          </div>

          {/* =========================
              Edit / Save / Cancel
          ========================== */}
          <div className="shrink-0">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-text-primary shadow-sm transition hover:bg-light"
              >
                <Pencil size={13} />
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-text-primary transition hover:bg-slate-50"
                >
                  <X size={13} />
                  Cancel
                </button>

                {/* Save */}
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-dark"
                >
                  <Check size={13} />
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;