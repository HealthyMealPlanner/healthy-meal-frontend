import { BrowserRouter } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar/Sidebar";
import TopHeader from "./components/layout/TopHeader/TopHeader";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <TopHeader />

      <div className="lg:pl-[88px] lg:pt-[77px] bg-main-bg min-h-screen">
        <div className="lg:px-12">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;