import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import "../styles/ChangePassword.css";

function ChangePassword() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    current_password: "",

    new_password: "",

    confirm_password: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.new_password !== form.confirm_password) {

      toast.error("Passwords do not match");

      return;

    }

    setLoading(true);

    try {

      const res = await API.post(
        "/change-password/",
        form
      );

      toast.success(res.data.message);

      localStorage.removeItem("token");

      setTimeout(() => {

        toast("Please login again.");

        navigate("/login");

      }, 1500);

    }

    catch (error) {

      console.log(error);

      if (error.response) {

        toast.error(
          error.response.data.error
        );

      }

      else {

        toast.error(
          "Server Connection Error"
        );

      }

    }

    setLoading(false);

  };

  return (

    <div className="password-container">

      <div className="password-card">

        <h1>
          🔒 Change Password
        </h1>

        <p>
          Update your account password securely.
        </p>

        <form onSubmit={handleSubmit}>

          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            name="current_password"

            placeholder="Current Password"

            value={form.current_password}

            onChange={handleChange}

            required

          />

          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            name="new_password"

            placeholder="New Password"

            value={form.new_password}

            onChange={handleChange}

            required

          />

          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            name="confirm_password"

            placeholder="Confirm Password"

            value={form.confirm_password}

            onChange={handleChange}

            required

          />

          <div className="show-password">

            <input

              type="checkbox"

              checked={showPassword}

              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }

            />

            <span>
              Show Password
            </span>

          </div>

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Updating..."
              : "Update Password"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default ChangePassword;