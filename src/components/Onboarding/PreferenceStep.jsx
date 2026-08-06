import PreferenceCard from "./PreferenceCard";
import { preferenceOptions } from "../../data/preferenceData";

function PreferenceStep({
  selectedPreference,
  handlePreference,
}) {
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      {preferenceOptions.map((item) => (
        <PreferenceCard
          key={item.id}
          title={item.title}
          icon={item.icon}
          selected={selectedPreference.includes(item.id)}
          onClick={() => handlePreference(item.id)}
        />
      ))}
    </div>
  );
}

export default PreferenceStep;