import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "../styles/Profile.css";

function Profile() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const response = await API.get("/current-user/");

      setUser(response.data);

    } catch (err) {

      console.log(err);
      toast.error("Unable to load profile");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="loading">
        Loading Profile...
      </div>
    );

  }

  return (

    <div className="profile-container">

      <div className="profile-card glass-card">

        <div className="profile-avatar">
          {user.first_name
            ? user.first_name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="profile-info">

          <h1>
            {user.first_name} {user.last_name}
          </h1>

          <p>{user.email}</p>

          <span
            className={`role-badge ${
              user.is_staff ? "admin" : "customer"
            }`}
          >
            {user.is_staff
              ? "Administrator"
              : "Verified Customer"}
          </span>

          <br />

          <Link
            to="/change-password"
            className="change-password-btn"
          >
            🔒 Change Password
          </Link>

        </div>

      </div>

      <div className="info-card glass-card">

        <h2>👤 Personal Information</h2>

        <div className="detail-row">
          <span className="detail-label">Full Name</span>
          <span className="detail-value">
            {user.first_name} {user.last_name}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Username</span>
          <span className="detail-value">
            {user.username}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Email</span>
          <span className="detail-value">
            {user.email}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Mobile Number</span>
          <span className="detail-value">
            {user.mobile_number}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">House Name</span>
          <span className="detail-value">
            {user.house_name || "-"}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Area</span>
          <span className="detail-value">
            {user.area || "-"}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">City</span>
          <span className="detail-value">
            {user.city || "-"}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">State</span>
          <span className="detail-value">
            {user.state || "-"}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">PIN Code</span>
          <span className="detail-value">
            {user.pincode || "-"}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Account Status</span>
          <span className="approved">
            Active
          </span>
        </div>

      </div>

    </div>

  );

}

export default Profile;