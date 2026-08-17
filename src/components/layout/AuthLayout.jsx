import Sidebar from "./Sidebar/Sidebar";
import TopHeader from "./TopHeader/TopHeader";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-main-bg font-jakarta">
      <TopHeader />
      <Sidebar />

      <main className="lg:ml-[88px] lg:pt-[77px] min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;