import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ApprovalChart({ analytics }) {

  const data = [
    {
      name: "Approved",
      value: analytics.approved,
    },
    {
      name: "Rejected",
      value: analytics.rejected,
    },
    {
      name: "Pending",
      value: analytics.pending,
    },
  ];

  const COLORS = [
    "#22C55E",
    "#EF4444",
    "#F59E0B",
  ];

  return (

    <>

      <h2
        style={{
          color:"#1E3A5F",
          marginBottom:"20px",
          textAlign:"center"
        }}
      >
        Loan Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={3}
            label
          >

            {
              data.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))
            }

          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>

      </ResponsiveContainer>

    </>

  );

}

export default ApprovalChart;