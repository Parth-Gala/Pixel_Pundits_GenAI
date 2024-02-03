import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
const App = () => {
  const location = useLocation();
  const hideNavbarOnLogin =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="">
      {!hideNavbarOnLogin && <Navbar />}
      <div className="">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
