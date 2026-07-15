function AIInsights({ approved, rejected, total }) {
  const approvalRate =
    total > 0
      ? ((approved / total) * 100).toFixed(1)
      : 0;

  return (
    <div className="insights-card">
      <h2>AI Insights</h2>

      <div className="insight-item">
        <strong>Approval Rate:</strong>
        <span>{approvalRate}%</span>
      </div>

      <div className="insight-item">
        <strong>Risk Level:</strong>
        <span>
          {approvalRate > 70
            ? "Low Risk"
            : approvalRate > 40
            ? "Medium Risk"
            : "High Risk"}
        </span>
      </div>

      <div className="insight-item">
        <strong>AI Recommendation:</strong>
        <span>
          {approvalRate > 70
            ? "Approve More Applications"
            : "Review Applicant Criteria"}
        </span>
      </div>
    </div>
  );
}

export default AIInsights;