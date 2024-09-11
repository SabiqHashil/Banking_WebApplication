import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UserDashboardPage from "./pages/UserDashboardPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userDashboard" element={<UserDashboardPage />} />

        {/* admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
