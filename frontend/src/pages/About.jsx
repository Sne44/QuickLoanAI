import "../styles/About.css";

function About() {
  return (
    <div className="about-container">

      <div className="about-card">

        <h1 className="about-title">🏦 About QuickLoanAI</h1>

        <p className="intro">
          Welcome to <strong>QuickLoanAI</strong>, an intelligent AI-powered
          digital lending platform designed to simplify loan approvals.
          We combine Artificial Intelligence and Financial Technology to
          provide fast, secure and transparent loan approvals.
        </p>

        <section>

          <h2>🌟 Why Choose QuickLoanAI?</h2>

          <div className="feature-grid">

            <div className="feature-box">
              <div className="feature-icon">⚡</div>
              <h3>Instant Approval</h3>
              <p>
                AI predicts loan eligibility within seconds.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🤖</div>
              <h3>AI Powered</h3>
              <p>
                Machine learning provides accurate loan predictions.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🔒</div>
              <h3>Secure Platform</h3>
              <p>
                Bank-level security with JWT authentication.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">📊</div>
              <h3>Track Loans</h3>
              <p>
                View application status anytime from dashboard.
              </p>
            </div>

          </div>

        </section>

        <section className="mission-section">

          <h2>🎯 Our Mission</h2>

          <p>
            We aim to make the loan approval process smarter, faster and
            completely digital using Artificial Intelligence while ensuring
            transparency and customer trust.
          </p>

        </section>

        <section>

          <h2>💬 What Our Customers Say</h2>

          <div className="review-grid">

            <div className="review-box">
              <div className="stars">★★★★★</div>
              <h3>Sarah Johnson</h3>
              <p>
                QuickLoanAI made my loan approval incredibly easy and fast.
              </p>
            </div>

            <div className="review-box">
              <div className="stars">★★★★★</div>
              <h3>Priya Sharma</h3>
              <p>
                Very smooth experience. I loved the AI prediction system.
              </p>
            </div>

            <div className="review-box">
              <div className="stars">★★★★★</div>
              <h3>Michael Brown</h3>
              <p>
                Professional platform with transparent approval process.
              </p>
            </div>

          </div>

        </section>

        <section>

          <h2>🏆 Our Achievements</h2>

          <div className="achievement-grid">

            <div className="achievement-box">
              <h3>15K+</h3>
              <p>Loan Applications</p>
            </div>

            <div className="achievement-box">
              <h3>98%</h3>
              <p>Customer Satisfaction</p>
            </div>

            <div className="achievement-box">
              <h3>95%</h3>
              <p>AI Accuracy</p>
            </div>

            <div className="achievement-box">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default About;