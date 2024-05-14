import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/admin/Dashboard";
import Election from "./pages/admin/Election";
import Party from "./pages/admin/Party";
import User from "./pages/admin/User";
import Header from "./components/admin/Header";
import Connection from "./pages/admin/Connection";
import AdminLogin from "./components/AdminLogin";
import Navber from "./components/user/Navbar";
import Home from "./pages/user/Home";

const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
};

const App = () => {
  const role = getRole();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  // Handle unauthorized access and redirect to login
  if (!role) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    );
  }

  // Conditional rendering based on user role
  if (role === "admin") {
    return (
      <>
        <Header />
        <div
          className="container"
          style={{
            maxWidth: "1150px",
            padding: "30px 40px 40px",
            height: "100vh",
            marginLeft: "310px",
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/party" element={<Party />} />
            <Route path="/election" element={<Election />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </>
    );
  }

  if (role === "user") {
    return (
      <>
        <Navber />
        <div
          className="container"
          style={{
            maxWidth: "1150px",
            padding: "30px 40px 40px",
            height: "100vh",
            marginLeft: "310px",
          }}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </>
    );
  }
};

export default App;
