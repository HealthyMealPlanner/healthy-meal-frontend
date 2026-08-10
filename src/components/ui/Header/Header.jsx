import { FaBell } from "react-icons/fa";

function Header() {
  return (
    <header className="flex items-center justify-between mb-6 lg:hidden">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Hello,<span className="text-primary"> Sara</span>
        </h1>
        <p className="text-slate text-sm mt-1">Ready for a healthier day</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative">
          <FaBell className="text-primary text-xl" />
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-orange text-white text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>
        <div className="w-11 h-11 rounded-full bg-primary"></div>
      </div>
    </header>
  );
}

export default Header;