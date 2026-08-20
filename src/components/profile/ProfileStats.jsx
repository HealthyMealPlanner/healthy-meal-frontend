import {
  Flame,
  Scale,
  Ruler,
  Target,
  HeartPulse,
  CalendarDays,
  UserRound,
} from "lucide-react";

function ProfileStats({ profile }) {
  // =========================
  // Goal
  // =========================
  const getGoalName = (goal) => {
    switch (Number(goal)) {
      case 0:
        return "Maintain Weight";

      case 1:
        return "Weight Loss";

      case 2:
        return "Weight Gain";

      default:
        return "Not set";
    }
  };

  // =========================
  // Gender
  // =========================
  const getGenderName = (gender) => {
    switch (Number(gender)) {
      case 0:
        return "Male";

      case 1:
        return "Female";

      default:
        return "Not set";
    }
  };

  const hasValue = (value) => {
    return (
      value !== null &&
      value !== undefined &&
      Number(value) > 0
    );
  };

  const stats = [
    {
      label: "Goal",
      value:
        profile?.goal !== null &&
        profile?.goal !== undefined
          ? getGoalName(profile.goal)
          : "Not set",
      icon: Target,
    },

    {
      label: "Daily Calories",
      value: hasValue(
        profile?.dailyCaloriesGoal
      )
        ? `${profile.dailyCaloriesGoal} kcal`
        : "Not set",
      icon: Flame,
    },

    {
      label: "Height",
      value: hasValue(profile?.heightCm)
        ? `${profile.heightCm} cm`
        : "Not set",
      icon: Ruler,
    },

    {
      label: "Weight",
      value: hasValue(profile?.weightKg)
        ? `${profile.weightKg} kg`
        : "Not set",
      icon: Scale,
    },

    {
      label: "Age",
      value: hasValue(profile?.age)
        ? `${profile.age} years`
        : "Not set",
      icon: CalendarDays,
    },

    {
      label: "Gender",
      value:
        profile?.gender !== null &&
        profile?.gender !== undefined
          ? getGenderName(profile.gender)
          : "Not set",
      icon: UserRound,
    },
  ];

  return (
    <section>
      {/* Title */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">
          My Nutrition Profile
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex min-h-[82px] items-center gap-4 rounded-xl bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                <Icon size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate">
                  {stat.label}
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-text-primary">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Allergies */}
      <div className="mt-3 flex items-center gap-4 rounded-xl bg-white px-4 py-4 shadow-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <HeartPulse size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate">
            Allergies
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-text-primary">
            {profile?.allergies?.trim()
              ? profile.allergies
              : "None"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfileStats;