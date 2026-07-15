import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";

import { ThemeContext } from "./components/ThemeContext";

import "./App.css";
import "./styles/DarkMode.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoanForm from "./pages/LoanForm";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

function App() {

  const { darkMode } = useContext(ThemeContext);

  return (

    <BrowserRouter>

      {/* Toast Notifications */}

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#1E3A5F",
            borderRadius: "12px",
            fontWeight: "600",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          },
          success: {
            iconTheme: {
              primary: "#22C55E",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <div className={`app ${darkMode ? "dark" : ""}`}>

        <Navbar />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/dashboard"
              element={<UserDashboard />}
            />

            <Route
              path="/loan-form"
              element={<LoanForm />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/change-password"
              element={<ChangePassword />}
            />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>

  );

}

export default App;