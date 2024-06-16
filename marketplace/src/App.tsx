import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Asset from "./pages/Asset";

function App() {
  return (
    <div className=" overflow-x-hidden">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/asset/:tokenid" element={<Asset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
