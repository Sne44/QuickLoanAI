import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

function AdminLoanTable({ search, statusFilter }) {
  const [loans, setLoans] = useState([]);

  const fetchLoans = useCallback(async () => {
    try {
      const res = await API.get(
        `/loans/admin-loans/?search=${search}&status=${statusFilter}`
      );
      setLoans(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const updateStatus = async (id, status) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status.toLowerCase()} this loan?`
    );

    if (!confirmAction) return;

    try {
      await API.post(`/loans/update-loan/${id}/`, {
        status,
      });

      alert(`Loan ${status} Successfully`);
      fetchLoans();
    } catch (err) {
      console.log(err);
      alert("Unable to update loan.");
    }
  };

  return (
    <div className="dashboard-section">
      <h2>Loan Management</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Income</th>
            <th>Loan</th>
            <th>Employment</th>
            <th>Credit</th>
            <th>Prediction</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.length === 0 ? (
            <tr>
              <td colSpan="10">No Loan Applications Found</td>
            </tr>
          ) : (
            loans.map((loan) => (
              <tr key={loan.id}>
                <td>
                  <strong>{loan.full_name}</strong>
                  <br />
                  <small>@{loan.username}</small>
                </td>

                <td>{loan.gender}</td>
                <td>{loan.age}</td>
                <td>₹ {loan.income}</td>
                <td>₹ {loan.loan_amount}</td>
                <td>{loan.employment_status}</td>
                <td>{loan.credit_score}</td>

                <td>
                  <span
                    style={{
                      color:
                        loan.prediction === "Approved"
                          ? "#16a34a"
                          : "#dc2626",
                      fontWeight: "bold",
                    }}
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

                <td>
                  {loan.status === "Pending" ? (
                    <>
                      <button
                        style={{
                          background: "#16a34a",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          marginRight: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          updateStatus(loan.id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          updateStatus(loan.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      style={{
                        color: "#777",
                        fontWeight: "bold",
                      }}
                    >
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLoanTable;