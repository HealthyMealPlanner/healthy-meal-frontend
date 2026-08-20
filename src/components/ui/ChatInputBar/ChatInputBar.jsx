import { FaPlus, FaMicrophone, FaPaperPlane } from "react-icons/fa";

function ChatInputBar({ value, onChange, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      onSend();
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm px-4 py-3">
      <button className="w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center shrink-0 hover:bg-primary-light/40 transition-colors">
        <FaPlus className="text-primary text-sm" />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about recipes..."
        className="flex-1 outline-none text-sm text-text-primary placeholder:text-slate bg-transparent"
      />

      <button className="shrink-0">
        <FaMicrophone className="text-slate text-base" />
      </button>

      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="w-10 h-10 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-50 flex items-center justify-center shrink-0 transition-colors"
      >
        <FaPaperPlane className="text-white text-sm" />
      </button>
    </div>
  );
}

export default ChatInputBar;