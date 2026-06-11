// import { useEffect, useState } from "react";
// import api from "../api";
// import PieChartComponent from "../components/PieChartComponent";
// import KPICard from "../components/KPIcards";
// import CLVDistributionChart from "../components/CLVDistributionChart";
// import PageHeader from "../components/PageHeader";
// import { formatPercent } from "../utils/formatters";
// function Customers() {
//   const [segments, setSegments] = useState([]);
//   const [clv, setClv] = useState([]);
//   const [churn, setChurn] = useState(null);
//   const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

//   useEffect(() => {
//     api.get("/customers/segments")
//       .then((response) => {
//         setSegments(response.data);
//       })
//       .catch((error) => {
//         console.error("Segments Error:", error);
//       });

//     api.get("/customers/clv")
//       .then((response) => {
//         setClv(response.data);
//       })
//       .catch((error) => {
//         console.error("CLV Error:", error);
//       });

//     api.get("/customers/churn")
//   .then((response) => {
//     setChurn(response.data);
//     setLoading(false);
//   })
//   .catch((error) => {
//     setError("Failed to load customer data");
//     setLoading(false);
//   });
//   }, []);

//   if (loading) {
//   return <h2>Loading...</h2>;
// }

// if (error) {
//   return <h2>{error}</h2>;
// }

//   const totalCustomers = segments.reduce(
//     (sum, item) => sum + item.count,
//     0
//   );

//   const largestSegment =
//     segments.length > 0
//       ? [...segments].sort(
//           (a, b) => b.count - a.count
//         )[0]
//       : null;

//   const highCLVCount =
//     clv.find(
//       (item) => item.clv_tier === "High CLV"
//     )?.count || 0;

//   return (
//     <div style={{ padding: "20px" }}>
//       <PageHeader
//         title="Customer Intelligence"
//         subtitle="Segmentation, churn and CLV insights"
//       />
//       <h1>Customers</h1>

//       {/* Churn Metrics */}

//       <h2>Churn Metrics</h2>

//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           marginBottom: "30px",
//           flexWrap: "wrap",
//         }}
//       >
//         <KPICard
//           title="Average Churn Probability"
//           value={
//             formatPercent(
//   churn.average_churn_probability
// )
//           }
//         />

//         <KPICard
//           title="High Risk Customers"
//           value={churn.high_risk_customers}
//         />

//         <KPICard
//           title="Active Customers"
//           value={
//             totalCustomers -
//             churn.high_risk_customers
//           }
//         />
//       </div>

//       {/* Segment Chart */}

//       <h2>Customer Segments</h2>

//       <div className="chart-card">
//     <PieChartComponent
//         data={segments}
//         nameKey="segment"
//         valueKey="count"
//       /></div>

//       <br />

//       {/* CLV Chart */}

//       <h2>CLV Distribution</h2>

//       <div className="chart-card"><CLVDistributionChart
//         data={clv}
//       />
// </div>
//       <br />

//       {/* Insights */}

//       <h2>Customer Insights</h2>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//         }}
//       >
//         <div
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             borderRadius: "8px",
//             backgroundColor: "#EFF6FF",
// borderLeft: "4px solid #2563EB"
//           }}
//         >
//           {largestSegment &&
//             (
//               (
//                 largestSegment.count /
//                 totalCustomers
//               ) * 100
//             ).toFixed(1)}
//           % of customers belong to the{" "}
//           <strong>
//             {largestSegment?.segment}
//           </strong>{" "}
//           segment.
//         </div>

//         <div
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             borderRadius: "8px",
//             backgroundColor: "#f8f9fa",
//           }}
//         >
//           There are currently{" "}
//           <strong>
//             {churn.high_risk_customers}
//           </strong>{" "}
//           customers classified as
//           high-risk.
//         </div>

//         <div
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             borderRadius: "8px",
//             backgroundColor: "#f8f9fa",
//           }}
//         >
//           <strong>
//             {highCLVCount}
//           </strong>{" "}
//           customers are classified as
//           High CLV.
//         </div>

//         <div
//           style={{
//             border: "1px solid #ddd",
//             padding: "15px",
//             borderRadius: "8px",
//             backgroundColor: "#f8f9fa",
//           }}
//         >
//           {largestSegment?.segment ===
//           "Dormant Customers"
//             ? "Dormant customers represent the largest retention opportunity."
//             : "Customer retention remains a key business focus area."}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Customers;
import { useEffect, useState } from "react";
import api from "../api";
import PieChartComponent from "../components/PieChartComponent";
import KPICard from "../components/KPICard";
import CLVDistributionChart from "../components/CLVDistributionChart";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { formatPercent } from "../utils/formatters";

function InsightPill({ icon, color, children }) {
  const BG = {
    blue: "#EFF6FF",
    amber: "#FFFBEB",
    red: "#FEF2F2",
    green: "#F0FDF4",
    gray: "#F8FAFC",
  };
  const BORDER = {
    blue: "#BFDBFE",
    amber: "#FDE68A",
    red: "#FECACA",
    green: "#BBF7D0",
    gray: "#E2E8F0",
  };
  const ICON_COLOR = {
    blue: "#3B82F6",
    amber: "#F59E0B",
    red: "#EF4444",
    green: "#10B981",
    gray: "#64748B",
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      padding: "14px 16px",
      borderRadius: "10px",
      background: BG[color] || BG.gray,
      border: `1px solid ${BORDER[color] || BORDER.gray}`,
    }}>
      {icon && (
        <i className={`ti ${icon}`} style={{
          fontSize: "16px",
          color: ICON_COLOR[color] || ICON_COLOR.gray,
          marginTop: "1px",
          flexShrink: 0,
        }} />
      )}
      <span style={{ fontSize: "14px", color: "#334155", lineHeight: 1.5 }}>
        {children}
      </span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      margin: "28px 0 12px",
      fontSize: "11px",
      fontWeight: 700,
      color: "#94A3B8",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    }}>
      {children}
    </p>
  );
}

function Customers() {
  const [segments, setSegments] = useState([]);
  const [clv, setClv] = useState([]);
  const [churn, setChurn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/customers/segments")
      .then((response) => setSegments(response.data))
      .catch((error) => console.error("Segments Error:", error));

    api.get("/customers/clv")
      .then((response) => setClv(response.data))
      .catch((error) => console.error("CLV Error:", error));

    api.get("/customers/churn")
      .then((response) => {
        setChurn(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load customer data");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#64748B", padding: "40px 0" }}>
      <i className="ti ti-loader-2" style={{ fontSize: "20px", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      Loading customer data…
    </div>
  );

  if (error) return (
    <div style={{
      padding: "20px", borderRadius: "10px", background: "#FEF2F2",
      border: "1px solid #FECACA", color: "#DC2626", fontSize: "14px",
    }}>
      <i className="ti ti-alert-circle" style={{ marginRight: "8px" }} />
      {error}
    </div>
  );

  const totalCustomers = segments.reduce((sum, item) => sum + item.count, 0);
  const largestSegment = segments.length > 0
    ? [...segments].sort((a, b) => b.count - a.count)[0]
    : null;
  const highCLVCount = clv.find((item) => item.clv_tier === "High CLV")?.count || 0;

  return (
    <div>
      <PageHeader
        title="Customer Intelligence"
        subtitle="Segmentation, churn risk, and lifetime value insights"
      />

      {/* KPI row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "28px",
      }}>
        <KPICard
          title="Avg. Churn Probability"
          value={formatPercent(churn.average_churn_probability)}
          accent="amber"
        />
        <KPICard
          title="High-Risk Customers"
          value={churn.high_risk_customers}
          accent="rose"
        />
        <KPICard
          title="Active Customers"
          value={(totalCustomers - churn.high_risk_customers).toLocaleString()}
          accent="emerald"
        />
      </div>

      {/* Charts row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "28px",
      }}>
        <Card title="Customer Segments">
          <PieChartComponent
            data={segments}
            nameKey="segment"
            valueKey="count"
          />
        </Card>

        <Card title="CLV Distribution">
          <CLVDistributionChart data={clv} />
        </Card>
      </div>

      {/* Insights */}
      <SectionLabel>Key Insights</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {largestSegment && (
          <InsightPill icon="ti-users" color="blue">
            <strong style={{ fontWeight: 600 }}>
              {((largestSegment.count / totalCustomers) * 100).toFixed(1)}%
            </strong>{" "}
            of customers belong to the{" "}
            <strong style={{ fontWeight: 600 }}>{largestSegment.segment}</strong> segment.
          </InsightPill>
        )}
        <InsightPill icon="ti-alert-triangle" color="amber">
          <strong style={{ fontWeight: 600 }}>{churn.high_risk_customers}</strong> customers
          are currently classified as high-risk for churn.
        </InsightPill>
        <InsightPill icon="ti-star" color="green">
          <strong style={{ fontWeight: 600 }}>{highCLVCount}</strong> customers are
          classified as High CLV.
        </InsightPill>
        <InsightPill icon="ti-info-circle" color="gray">
          {largestSegment?.segment === "Dormant Customers"
            ? "Dormant customers represent the largest retention opportunity."
            : "Customer retention remains a key business focus area."}
        </InsightPill>
      </div>
    </div>
  );
}

export default Customers;