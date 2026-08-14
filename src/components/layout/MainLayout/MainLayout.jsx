import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import TopHeader from "../TopHeader/TopHeader";

function MainLayout() {
  return (
    <div className="bg-main-bg min-h-screen">
      <TopHeader />
      <Sidebar />

      <div className="lg:pl-[88px] lg:pt-[77px] pb-20 lg:pb-0 bg-main-bg min-h-screen">
        <div className="lg:px-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;