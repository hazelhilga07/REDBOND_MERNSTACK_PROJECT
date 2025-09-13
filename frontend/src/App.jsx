import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/landingPage";
import Donate from "./pages/donate";
import AdvancedDashboard from "./pages/AdvancedDashboard";
import DonorDashboard from "./pages/donorDashboard";
import RequestBlood from "./pages/RequestBlood";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Show LandingPage at the root "/" */}
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/advanced-dashboard" element={<AdvancedDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
