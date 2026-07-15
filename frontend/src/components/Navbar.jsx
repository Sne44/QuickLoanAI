import "../styles/Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import API from "../services/api";
import { ThemeContext } from "./ThemeContext";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const [unreadCount, setUnreadCount] = useState(0);

  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {

    if (token && !isAdmin) {

      fetchUnreadNotifications();

    }

  }, [token]);

  const fetchUnreadNotifications = async () => {

    try {

      const res = await API.get(
        "/loans/notifications/unread-count/"
      );

      setUnreadCount(res.data.unread);

    }

    catch (err) {

      console.log(err);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_admin");

    delete API.defaults.headers.common["Authorization"];

    navigate("/login", { replace: true });

  };

  const active = (path) =>
    location.pathname === path ? "active-btn" : "";

  return (

    <nav className="navbar">

      <div
        className="logo"
        onClick={() => navigate("/")}
      >

        🏦 QuickLoanAI

      </div>

      <div className="nav-links">

        <button
          className={active("/")}
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button
          className={active("/about")}
          onClick={() => navigate("/about")}
        >
          About
        </button>

        <button
          className={active("/contact")}
          onClick={() => navigate("/contact")}
        >
          Contact
        </button>

        {!token && (

          <>

            <button
              className={active("/login")}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className={active("/register")}
              onClick={() => navigate("/register")}
            >
              Register
            </button>

          </>

        )}

        {token && !isAdmin && (

          <>

            <span className="welcome-user">

              👋 Welcome, {user.username}

            </span>

            <button
              className={active("/dashboard")}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

            <button
              className={active("/loan-form")}
              onClick={() => navigate("/loan-form")}
            >
              Apply Loan
            </button>

            <button
              className={active("/profile")}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <button
              className={active("/notifications")}
              onClick={() => navigate("/notifications")}
            >

              🔔

              {unreadCount > 0 && (

                <span className="notification-badge">

                  {unreadCount}

                </span>

              )}

            </button>

            <button
              className="theme-btn"
              onClick={toggleTheme}
            >

              {darkMode ? "☀️" : "🌙"}

            </button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </>

        )}

        {token && isAdmin && (

          <>

            <span className="welcome-user">

              👋 Admin

            </span>

            <button
              className={active("/admin-dashboard")}
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </button>

            <button
              className="theme-btn"
              onClick={toggleTheme}
            >

              {darkMode ? "☀️" : "🌙"}

            </button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </>

        )}

      </div>

    </nav>

  );

}

export default Navbar;