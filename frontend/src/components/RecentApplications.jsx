import { useEffect, useState } from "react";
import API from "../services/api";

function RecentApplications() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchRecent();
  }, []);

  const fetchRecent = async () => {
    try {
      const res = await API.get("/loans/admin-loans/");
      setLoans(res.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >

      <h2
        style={{
          marginBottom: "20px",
          color: "#2563eb",
        }}
      >
        🆕 Recent Loan Applications
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >

        <thead>

          <tr
            style={{
              background: "#2563eb",
              color: "#fff",
              height: "50px",
            }}
          >
            <th>Name</th>
            <th>Amount</th>
            <th>Employment</th>
            <th>Prediction</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {loans.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No Recent Applications
              </td>

            </tr>

          ) : (

            loans.map((loan) => (

              <tr
                key={loan.id}
                style={{
                  textAlign: "center",
                  height: "55px",
                  borderBottom: "1px solid #eee",
                }}
              >

                <td>{loan.full_name}</td>

                <td>₹ {loan.loan_amount}</td>

                <td>{loan.employment_status}</td>

                <td
                  style={{
                    color:
                      loan.prediction === "Approved"
                        ? "#16a34a"
                        : "#dc2626",
                    fontWeight: "bold",
                  }}
                >
                  {loan.prediction}
                </td>

                <td>

                  <span
                    style={{
                      background:
                        loan.status === "Approved"
                          ? "#16a34a"
                          : loan.status === "Rejected"
                          ? "#dc2626"
                          : "#f59e0b",

                      color: "#fff",

                      padding: "6px 12px",

                      borderRadius: "20px",

                      fontWeight: "bold",
                    }}
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

  );

}

export default RecentApplications;