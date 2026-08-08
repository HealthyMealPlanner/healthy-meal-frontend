import { FaTimes } from "react-icons/fa";

function ActiveFilterChips({ chips, onRemove, onClearAll }) {
  if (chips.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-2 mb-4">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="flex items-center gap-1.5 text-sm font-medium text-primary bg-white border border-primary/40 px-3 py-1.5 rounded-full"
        >
          {chip.label}
          <button onClick={() => onRemove(chip.key)}>
            <FaTimes className="text-xs" />
          </button>
        </span>
      ))}
      <button onClick={onClearAll} className="text-sm font-medium text-slate hover:text-text-primary">
        Clear all
      </button>
    </div>
  );
}

export default ActiveFilterChips;