import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed === "") return;
    navigate(`/explore?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md px-5 py-4 lg:px-6 lg:py-4 flex items-center justify-between w-full border border-gray-100">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search doctor, specialty, or plan"
        className="outline-none text-sm lg:text-base w-full placeholder:text-gray-400 bg-transparent"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0"
      >
        <FaSearch className="text-primary text-sm" />
      </button>
    </div>
  );
}

export default SearchBar;