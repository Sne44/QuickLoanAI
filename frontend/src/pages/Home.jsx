import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

  const navigate = useNavigate();

  return (

    <>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-overlay">

          <span className="tag">
            AI Powered Loan Approval
          </span>

          <div className="hero-left">

            <h1>
              Smart AI Loan
              <br />
              Approval System
            </h1>

            <p>
              Experience faster loan approvals with AI-powered predictions.
              Secure, accurate, and transparent decisions designed to
              simplify your borrowing journey.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => navigate("/register")}
              >
                Apply Now
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="feature-card">

          <div className="icon">⚡</div>

          <h3>Instant Approval</h3>

          <p>
            Receive AI-powered loan eligibility predictions in just a few
            seconds.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">🤖</div>

          <h3>AI Prediction</h3>

          <p>
            Machine Learning analyzes every application accurately for
            better loan decisions.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">🔒</div>

          <h3>Secure Platform</h3>

          <p>
            JWT authentication and encrypted APIs keep your personal
            information completely secure.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">📊</div>

          <h3>Track Applications</h3>

          <p>
            Monitor your loan application and approval status anytime
            from your dashboard.
          </p>

        </div>

      </section>

    </>

  );

}

export default Home;