import "../styles/Dashboard.css";
function DashboardCards({ total, approved, rejected }) {
  const approvalRate =
    total > 0
      ? ((approved / total) * 100).toFixed(1)
      : 0;

  return (
    <div className="cards-container">
      <div className="card">
        <h3>Total Applications</h3>
        <h1>{total}</h1>
      </div>

      <div className="card">
        <h3>Approved</h3>
        <h1>{approved}</h1>
      </div>

      <div className="card">
        <h3>Rejected</h3>
        <h1>{rejected}</h1>
      </div>

      <div className="card">
        <h3>Approval Rate</h3>
        <h1>{approvalRate}%</h1>
      </div>
    </div>
  );
}

export default DashboardCards;