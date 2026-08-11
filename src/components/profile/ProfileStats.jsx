import {
  Flame,
  Scale,
  Ruler,
  Target,
  HeartPulse,
} from "lucide-react";

function ProfileStats({ profile }) {
  const getGoalName = (goal) => {
    switch (goal) {
      case 1:
        return "Weight Loss";
      case 2:
        return "Weight Gain";
      case 3:
        return "Maintain Weight";
      default:
        return "Not set";
    }
  };

  const stats = [
    {
      label: "Goal",
      value: getGoalName(profile?.goal),
      icon: Target,
    },
    {
      label: "Daily Calories",
      value: profile?.dailyCaloriesGoal
        ? `${profile.dailyCaloriesGoal} kcal`
        : "Not set",
      icon: Flame,
    },
    {
      label: "Height",
      value: profile?.heightCm
        ? `${profile.heightCm} cm`
        : "Not set",
      icon: Ruler,
    },
    {
      label: "Weight",
      value: profile?.weightKg
        ? `${profile.weightKg} kg`
        : "Not set",
      icon: Scale,
    },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">
          My Nutrition Profile
        </h2>
      </div>

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

        <div>
          <p className="text-xs text-slate">
            Allergies
          </p>

          <p className="mt-1 text-sm font-semibold text-text-primary">
            {profile?.allergies || "None"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfileStats;