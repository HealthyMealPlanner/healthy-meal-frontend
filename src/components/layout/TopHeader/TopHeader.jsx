import { FaSearch } from "react-icons/fa";

function TopHeader() {
  return (
    <header className="hidden lg:flex fixed top-0 left-0 right-0 z-50 items-center justify-between gap-6 px-10 py-5 h-[77px] bg-main-bg border-b border-gray-300/50">
      
      {/* قسم اللوجو والنص */}
      <div className="flex items-center shrink-0">
        <img
          src="/Frame 2085665220.svg"
          alt="E Bite"
          className="h-9 w-auto object-contain -mr-4"
        />
        <span className="text-xl font-bold text-text-primary">
          <span className="text-primary mr-0.5">E </span>Bite
        </span>
      </div>

      {/* حقل البحث */}
<div className="flex-1 max-w-md mx-auto">
  <div className="bg-transparent border border-slate/40 rounded-2xl px-4 py-2.5 flex items-center gap-3">
    <img
      src="/lineicons_search-2.svg"
      alt="Search"
      className="w-4 h-4 object-contain shrink-0 opacity-70"
    />
    <input
      type="text"
      placeholder="Search doctor, specialty, or plan"
      className="outline-none text-sm w-full placeholder:text-text-primary/50 text-text-primary bg-transparent"
    />
  </div>
</div>

      {/* أيقونة الإشعارات الخاصة بك */}
      <button className="relative shrink-0 flex items-center justify-center">
        <img 
          src="/flowbite_bell-active-solid.svg" 
          alt="Notifications" 
          className="w-6 h-6 object-contain" 
        />
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
          3
        </span>
      </button>

    </header>
  );
}

export default TopHeader;