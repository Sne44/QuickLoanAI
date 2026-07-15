import "../styles/LoanTimeline.css";

function LoanTimeline({ loan }) {

  if (!loan) return null;

  return (

    <div className="timeline-card">

      <h3>📌 Loan Application Timeline</h3>

      <div className="timeline">

        {/* Submitted */}

        <div className="timeline-item completed">

          <div className="circle">✔</div>

          <div className="content">

            <h4>Application Submitted</h4>

            <p>
              {loan.submitted_at
                ? new Date(loan.submitted_at).toLocaleString()
                : "Submitted"}
            </p>

          </div>

        </div>

        {/* AI */}

        <div className="timeline-item completed">

          <div className="circle">🤖</div>

          <div className="content">

            <h4>AI Prediction</h4>

            <p>{loan.prediction}</p>

          </div>

        </div>

        {/* Pending */}

        {loan.status === "Pending" && (

          <div className="timeline-item pending">

            <div className="circle">⏳</div>

            <div className="content">

              <h4>Waiting for Admin Review</h4>

              <p>Your application is under review.</p>

            </div>

          </div>

        )}

        {/* Approved */}

        {loan.status === "Approved" && (

          <div className="timeline-item approved">

            <div className="circle">✅</div>

            <div className="content">

              <h4>Loan Approved</h4>

              <p>

                {loan.reviewed_at
                  ? new Date(loan.reviewed_at).toLocaleString()
                  : "Reviewed"}

              </p>

            </div>

          </div>

        )}

        {/* Rejected */}

        {loan.status === "Rejected" && (

          <div className="timeline-item rejected">

            <div className="circle">❌</div>

            <div className="content">

              <h4>Loan Rejected</h4>

              <p>

                {loan.reviewed_at
                  ? new Date(loan.reviewed_at).toLocaleString()
                  : "Reviewed"}

              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default LoanTimeline;