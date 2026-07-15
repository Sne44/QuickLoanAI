import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",

    mobile_number: "",
    house_name: "",
    area: "",
    city: "",
    state: "",
    pincode: "",

    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const register = async (e) => {

    e.preventDefault();

    if (
      !form.first_name ||
      !form.last_name ||
      !form.username ||
      !form.email ||
      !form.mobile_number ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile_number)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    if (
      form.pincode &&
      !/^[0-9]{6}$/.test(form.pincode)
    ) {
      toast.error("PIN Code must contain 6 digits.");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const loadingToast = toast.loading(
      "Creating your account..."
    );

    try {

      await API.post("/register/", {

        first_name: form.first_name,
        last_name: form.last_name,
        username: form.username,
        email: form.email,

        mobile_number: form.mobile_number,
        house_name: form.house_name,
        area: form.area,
        city: form.city,
        state: form.state,
        pincode: form.pincode,

        password: form.password,

      });

      toast.dismiss(loadingToast);

      toast.success(
        `Welcome ${form.first_name}! 🎉`
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    }

    catch (error) {

      toast.dismiss(loadingToast);

      console.log(error);

      if (error.response?.data?.username)
        toast.error("Username already exists.");

      else if (error.response?.data?.email)
        toast.error("Email already registered.");

      else if (error.response?.data?.mobile_number)
        toast.error("Mobile number already exists.");

      else
        toast.error("Registration Failed.");

    }

  };

  return (

    <div className="register-page">

      <form
        className="register-card"
        onSubmit={register}
      >

        <h1>QuickLoanAI</h1>

        <p>Create your account</p>

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile_number"
          placeholder="10-digit Mobile Number"
          value={form.mobile_number}
          onChange={handleChange}
          maxLength={10}
          required
        />

        <input
          type="text"
          name="house_name"
          placeholder="House Name / Building"
          value={form.house_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="area"
          placeholder="Area / Locality"
          value={form.area}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="PIN Code"
          value={form.pincode}
          onChange={handleChange}
          maxLength={6}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Create Account
        </button>

        <div className="login-text">

          Already have an account?

          <br /><br />

          <Link to="/login">
            Login Here
          </Link>

        </div>

      </form>

    </div>

  );

}

export default Register;