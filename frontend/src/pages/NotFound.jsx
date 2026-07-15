
import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f4f7fc",
      }}
    >

      <h1
        style={{
          fontSize: "80px",
          color: "#2563eb",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 30px",
          border: "none",
          borderRadius: "8px",
          background: "#2563eb",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={() => navigate("/")}
      >
        Go Home
      </button>

    </div>

  );

}

export default NotFound;

