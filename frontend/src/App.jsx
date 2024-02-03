import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FoodUpload from "./pages/FoodUpload.jsx";
import AddMeal from "./pages/AddMeal.jsx";
import AddFood from "./pages/AddFood.jsx";
const App = () => {
  const location = useLocation();
  const hideNavbarOnLogin =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className=" mx-1">
      {!hideNavbarOnLogin && <Navbar />}
      <div className="">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/FoodUpload" element={<FoodUpload />} />
          <Route path="/AddMeal" element ={<AddMeal/>}/>
          <Route path="/AddFood" element ={<AddFood/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
