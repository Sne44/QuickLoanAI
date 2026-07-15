import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    if (!username || !password) {
      toast.error("Please enter username and password.");
      return;
    }

    const loadingToast = toast.loading(
      "🔐 Signing you in..."
    );

    try {

      const response = await API.post("/token/", {
        username,
        password,
      });

      const token = response.data.access;

      localStorage.setItem("token", token);

      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const userResponse = await API.get("/current-user/");

      const user = userResponse.data;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "is_admin",
        user.is_staff
      );

      toast.dismiss(loadingToast);

      toast.success(
        `Welcome back, ${user.username}! 👋`
      );

      setTimeout(() => {

        if (user.is_staff) {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }

      }, 1000);

    } catch (error) {

      console.log(error);

      toast.dismiss(loadingToast);

      toast.error(
        "Invalid Username or Password"
      );

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>QuickLoanAI</h1>

        <p>
          AI Powered Loan Approval System
        </p>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >

          <span
            style={{
              color: "#666",
            }}
          >
            Don't have an account?
          </span>

          <br />

          <button
            style={{
              marginTop: "12px",
              background: "transparent",
              color: "#4F7C59",
              border: "2px solid #4F7C59",
            }}
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>

  );
}

export default Login;