import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Myblogs from "./Pages/Myblogs";
import CreateBlog from "./Pages/CreateBlog";
import Home from "./Pages/Home";

import FilteredNavBar from "./Components/common/FilteredNavBar";

function App() {
  return (
    <div className="w-screen min-h-screen  bg-[#000814] flex flex-col font-inter overflow-hidden ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/Myteam" element={<Myblogs />} />
        <Route path="/CreateEmployee" element={<CreateBlog />} />
        <Route path="/Filtered" element={<FilteredNavBar />} />
      </Routes>
    </div>
  );
}

export default App;
