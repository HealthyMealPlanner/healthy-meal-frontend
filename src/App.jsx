import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import ChatAI from "./pages/ChatAI/ChatAI";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import TopHeader from "./components/layout/TopHeader/TopHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-main-bg min-h-screen">
        <TopHeader />
        <Sidebar />

        <div className="lg:pl-[88px] lg:pt-[77px] bg-main-bg min-h-screen">
          <div className="lg:px-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/chat-ai" element={<ChatAI />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;