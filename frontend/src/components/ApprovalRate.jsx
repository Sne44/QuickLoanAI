
function ApprovalRate({ rate }) {

  return (

    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >

      <h2 style={{ color: "#2563eb" }}>
        📈 Approval Rate
      </h2>

      <div
        style={{
          width: "100%",
          background: "#ddd",
          borderRadius: "20px",
          height: "25px",
          overflow: "hidden",
          marginTop: "20px",
        }}
      >

        <div
          style={{
            width: `${rate}%`,
            background: "#22c55e",
            height: "100%",
            color: "#fff",
            textAlign: "center",
            lineHeight: "25px",
            fontWeight: "bold",
            transition: "1s",
          }}
        >
          {rate}%
        </div>

      </div>

    </div>

  );

}

export default ApprovalRate;

