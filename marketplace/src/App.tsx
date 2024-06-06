import Navbar from "./components/ui/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className=" font-inter">
      <BrowserRouter>
        <Navbar />
        {/* padding given for navbar */}
        <div className=" pt-20">
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
