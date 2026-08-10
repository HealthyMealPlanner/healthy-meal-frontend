import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="bg-white rounded-2xl shadow-md px-5 py-4 lg:px-6 lg:py-4 flex items-center justify-between w-full border border-gray-100">
      <input
        type="text"
        placeholder="Search doctor, specialty, or plan"
        className="outline-none text-sm lg:text-base w-full placeholder:text-gray-400 bg-transparent"
      />
      <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
        <FaSearch className="text-primary text-sm" />
      </div>
    </div>
  );
}

export default SearchBar;