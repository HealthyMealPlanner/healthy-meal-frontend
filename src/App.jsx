import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import TopHeader from "./components/layout/TopHeader/TopHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-main-bg min-h-screen">
        <TopHeader />
        <Sidebar />

        {/* lg:pl-[88px] clears the fixed sidebar, lg:pt-[77px] clears
            the fixed TopHeader, lg:px-12 adds equal breathing room on
            both sides so content isn't glued to the sidebar */}
        <div className="lg:pl-[88px] lg:pt-[77px] bg-main-bg min-h-screen">
          <div className="lg:px-12">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;