import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/AdminDashboard.css";

import ApprovalChart from "../components/ApprovalChart";
import ApprovalRate from "../components/ApprovalRate";
import RecentApplications from "../components/RecentApplications";
import AdminLoanTable from "../components/AdminLoanTable";

function AdminDashboard() {

  const [analytics, setAnalytics] = useState({
    total_users: 0,
    total_loans: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    approval_rate: 0,
  });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await API.get("/loans/analytics/");

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ===========================
  // Export Excel
  // ===========================

  const exportExcel = async () => {

    try {

      const response = await API.get(
        "/loans/export-excel/",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.download = "LoanApplications.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      console.log(error);

      alert("Unable to export Excel.");

    }

  };

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <h1 className="dashboard-title">
          📊 Admin Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Welcome back! Monitor users, loan approvals and AI predictions.
        </p>

        <button
          className="export-btn"
          onClick={exportExcel}
        >
          📥 Export Excel
        </button>

      </div>

      {loading ? (

        <div className="loading">
          Loading Dashboard...
        </div>

      ) : (

        <>

          {/* Statistics */}

          <div className="stats-grid">

            <div className="stat-card">
              <h2>{analytics.total_users}</h2>
              <p>Total Users</p>
            </div>

            <div className="stat-card">
              <h2>{analytics.total_loans}</h2>
              <p>Loan Applications</p>
            </div>

            <div className="stat-card">
              <h2>{analytics.approved}</h2>
              <p>Approved</p>
            </div>

            <div className="stat-card">
              <h2>{analytics.pending}</h2>
              <p>Pending</p>
            </div>

            <div className="stat-card">
              <h2>{analytics.rejected}</h2>
              <p>Rejected</p>
            </div>

          </div>

          {/* Charts */}

          <div className="chart-row">

            <div className="chart-card">
              <ApprovalRate rate={analytics.approval_rate} />
            </div>

            <div className="chart-card">
              <ApprovalChart analytics={analytics} />
            </div>

          </div>

          {/* Search + Filter */}

          <div className="search-container">

            <input
              type="text"
              placeholder="🔍 Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

          {/* Recent Applications */}

          <div className="dashboard-section">
            <RecentApplications />
          </div>

          {/* Loan Table */}

          <div className="dashboard-section">

            <AdminLoanTable
              search={search}
              statusFilter={statusFilter}
            />

          </div>

        </>

      )}

    </div>

  );

}

export default AdminDashboard;