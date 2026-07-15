import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import "../styles/LoanForm.css";

function LoanForm() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    age: "",
    gender: "",
    income: "",
    loan_amount: "",
    credit_score: "",
    employment_status: "",
  });

  const [prediction, setPrediction] = useState("");
  const [eligibility, setEligibility] = useState(0);
  const [aiTip, setAiTip] = useState("");
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [loans, setLoans] = useState([]);

  /* EMI */

  const [interestRate, setInterestRate] = useState(8.5);
  const [loanYears, setLoanYears] = useState(5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    calculateEMI();
  }, [
    form.loan_amount,
    interestRate,
    loanYears,
  ]);

  // =======================================
  // Fetch Loan History + Autofill
  // =======================================

  const fetchLoans = async () => {

    try {

      const res = await API.get("/loans/applications/");

      setLoans(res.data);

      if (res.data.length > 0) {

        const latest = res.data[0];

        setForm((prev) => ({

          ...prev,

          full_name: latest.full_name || "",
          age: latest.age || "",
          gender: latest.gender || "",
          income: latest.income || "",
          employment_status:
            latest.employment_status || "",

          loan_amount: "",
          credit_score: "",

        }));

      }

    } catch (err) {

      console.log(err);

    }

  };

  // =======================================
  // EMI Calculator
  // =======================================

  const calculateEMI = () => {

    const principal = Number(form.loan_amount);

    if (!principal || principal <= 0) {

      setEmi(0);
      return;

    }

    const monthlyRate = interestRate / 12 / 100;

    const months = loanYears * 12;

    const emiValue =
      (
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)
      ) /
      (
        Math.pow(
          1 + monthlyRate,
          months
        ) - 1
      );

    setEmi(Math.round(emiValue));

  };

  // =======================================
  // Handle Input
  // =======================================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  // =======================================
  // Submit Loan
  // =======================================

  const submitLoan = async (e) => {

    e.preventDefault();

    setLoading(true);

    const loadingToast = toast.loading(
      "🤖 AI is analyzing your application..."
    );

    try {

      const res = await API.post(
        "/loans/applications/",
        form
      );

      toast.dismiss(loadingToast);

      setPrediction(res.data.prediction);
      setEligibility(res.data.eligibility_score);
      setAiTip(res.data.ai_tip);
      setSmartSuggestions(
        res.data.smart_suggestions || []
      );

      toast.success(
        "Loan Application Submitted Successfully!"
      );

      await fetchLoans();

      setForm((prev) => ({

        ...prev,

        loan_amount: "",
        credit_score: "",

      }));

      setTimeout(() => {

        navigate("/dashboard");

      }, 3500);

    }

    catch (error) {

      toast.dismiss(loadingToast);

      console.log(error);

      if (error.response) {

        toast.error(
          error.response.data.feedback ||
          "Unable to submit loan."
        );

      }

      else {

        toast.error(
          "Cannot connect to Django Server."
        );

      }

    }

    setLoading(false);

  };
    return (

    <div className="container">

      <h1 className="title">
        Apply For Loan
      </h1>

      {loans.length > 0 && (

        <div className="autofill-info">
          ✅ Your previous personal details have been auto-filled.
          Update them if anything has changed.
        </div>

      )}

      {/* ================= EMI CALCULATOR ================= */}

      <div className="emi-card">

        <h2>💰 Loan EMI Calculator</h2>

        <div className="emi-grid">

          <div>

            <label>Interest Rate (%)</label>

            <input
              type="number"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(Number(e.target.value))
              }
            />

          </div>

          <div>

            <label>Loan Period (Years)</label>

            <input
              type="number"
              value={loanYears}
              onChange={(e) =>
                setLoanYears(Number(e.target.value))
              }
            />

          </div>

        </div>

        <div className="emi-result">

          <h3>Estimated Monthly EMI</h3>

          <h1>₹ {emi.toLocaleString()}</h1>

          <p>Based on your Loan Amount</p>

        </div>

      </div>

      {/* ================= LOAN FORM ================= */}

      <form
        onSubmit={submitLoan}
        className="loan-form"
      >

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >

          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        <input
          type="number"
          name="income"
          placeholder="Monthly Income"
          value={form.income}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="loan_amount"
          placeholder="Loan Amount"
          value={form.loan_amount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="credit_score"
          placeholder="Credit Score"
          value={form.credit_score}
          onChange={handleChange}
          required
        />

        <select
          name="employment_status"
          value={form.employment_status}
          onChange={handleChange}
          required
        >

          <option value="">
            Employment Status
          </option>

          <option value="Employed">
            Employed
          </option>

          <option value="Self Employed">
            Self Employed
          </option>

          <option value="Student">
            Student
          </option>

          <option value="Unemployed">
            Unemployed
          </option>

        </select>

        {/* Address field removed */}

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "🤖 AI Processing..."
            : "🚀 Apply Loan"}

        </button>

      </form>

      {/* ================= AI RESULT ================= */}

      {prediction && (

        <div className="result">

          <h3>🤖 AI Prediction Result</h3>

          <strong
            style={{
              color:
                prediction === "Approved"
                  ? "#16A34A"
                  : "#DC2626",
              fontSize: "28px",
            }}
          >
            {prediction}
          </strong>

        </div>

      )}

      {/* ================= ELIGIBILITY ================= */}

      {prediction && (

        <div className="eligibility-card">

          <h3>Loan Eligibility Score</h3>

          <div className="meter">

            <div
              className="meter-fill"
              style={{
                width: `${eligibility}%`
              }}
            ></div>

          </div>

          <h2>{eligibility}%</h2>

        </div>

      )}

      {/* ================= AI TIP ================= */}

      {aiTip && (

        <div className="ai-tip-card">

          <h3>💡 AI Financial Tip</h3>

          <p>{aiTip}</p>

        </div>

      )}

      {/* ================= SMART SUGGESTIONS ================= */}

      {smartSuggestions.length > 0 && (

        <div className="suggestion-card">

          <h3>🎯 Smart Suggestions</h3>

          <ul>

            {smartSuggestions.map((tip, index) => (

              <li key={index}>
                ✅ {tip}
              </li>

            ))}

          </ul>

        </div>

      )}

      {/* ================= LOAN HISTORY ================= */}

      <h2
        style={{
          marginTop: "40px",
        }}
      >
        My Loan History
      </h2>

      <table>

        <thead>

          <tr>

            <th>Name</th>
            <th>Gender</th>
            <th>Income</th>
            <th>Loan</th>
            <th>Employment</th>
            <th>Status</th>
            <th>Prediction</th>
            <th>AI Feedback</th>

          </tr>

        </thead>

        <tbody>

          {loans.length === 0 ? (

            <tr>

              <td colSpan="8">
                No Loan Applications
              </td>

            </tr>

          ) : (

            loans.map((loan) => (

              <tr key={loan.id}>

                <td>{loan.full_name}</td>
                <td>{loan.gender}</td>
                <td>₹ {loan.income}</td>
                <td>₹ {loan.loan_amount}</td>
                <td>{loan.employment_status}</td>

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

                <td
                  style={{
                    maxWidth: "320px",
                    whiteSpace: "normal",
                    lineHeight: "1.6",
                  }}
                >
                  {loan.feedback}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default LoanForm;