import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Asset from "./pages/Asset";
import ProtectedRoute from "./components/auth/Protectedroute";
import CreateNft from "./pages/CreateNft";
import LearnNftHome from "./pages/LearnNftHome";
import LearnNft from "./pages/LearnNft";
import ScrollToTop from "./utils/ScrollTotop";
import NotFoundpage from "./pages/NotFoundpage";

function App() {
  return (
    <div className=" overflow-x-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<CreateNft />} />
          <Route path="/learn/home" element={<LearnNftHome />} />
          <Route path="/learn/:nftid" element={<LearnNft />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/asset/:tokenid" element={<Asset />} />
          </Route>
          <Route path="*" element={<NotFoundpage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
