import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/UserDashboard.css";

function UserDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchLoans();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/current-user/");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLoans = async () => {
    try {
      const res = await API.get("/loans/applications/");
      setLoans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome,
            {" "}
            {user.username}
            👋
          </h1>

          <p>
            AI Powered Loan Approval Dashboard
          </p>

        </div>

        <button
          className="apply-btn"
          onClick={() => navigate("/loan-form")}
        >
          + Apply New Loan
        </button>

      </div>

      <div className="dashboard-cards">

        <div className="card blue">
          <h2>{loans.length}</h2>
          <p>Total Applications</p>
        </div>

        <div className="card green">
          <h2>
            {
              loans.filter(
                loan => loan.status === "Approved"
              ).length
            }
          </h2>
          <p>Approved</p>
        </div>

        <div className="card orange">
          <h2>
            {
              loans.filter(
                loan => loan.status === "Pending"
              ).length
            }
          </h2>
          <p>Pending</p>
        </div>

        <div className="card red">
          <h2>
            {
              loans.filter(
                loan => loan.status === "Rejected"
              ).length
            }
          </h2>
          <p>Rejected</p>
        </div>

      </div>

      <div className="profile-box">

        <h2>Profile Information</h2>

        <div className="profile-grid">

          <div>
            <strong>Username</strong>
            <p>{user.username}</p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{user.email}</p>
          </div>

          <div>
            <strong>Role</strong>
            <p>
              {user.is_staff ? "Administrator" : "Customer"}
            </p>
          </div>

          <div>
            <strong>Total Loans</strong>
            <p>{loans.length}</p>
          </div>

        </div>

      </div>

      <div className="loan-history">

        <h2>Loan History</h2>

        <table>

          <thead>

            <tr>

              <th>Loan Amount</th>
              <th>Income</th>
              <th>Prediction</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {loans.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "25px",
                  }}
                >
                  No Loan Applications Found
                </td>

              </tr>

            ) : (

              loans.map((loan) => (

                <tr key={loan.id}>

                  <td>₹ {loan.loan_amount}</td>

                  <td>₹ {loan.income}</td>

                  <td>

                    <span
                      className={
                        loan.prediction === "Approved"
                          ? "approved"
                          : "rejected"
                      }
                    >
                      {loan.prediction}
                    </span>

                  </td>

                  <td>

                    <span
                      className={
                        loan.status === "Approved"
                          ? "approved"
                          : loan.status === "Rejected"
                          ? "rejected"
                          : "pending"
                      }
                    >
                      {loan.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default UserDashboard;