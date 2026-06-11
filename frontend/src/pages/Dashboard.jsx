// import { useEffect, useState } from "react";
// import api from "../api";
// import KPICard from "../components/KPIcards";
// import PageHeader from "../components/PageHeader";
// import {
//   formatCurrency
// } from "../utils/formatters";
// <PageHeader
//   title="Dashboard"
//   subtitle="Business overview and KPIs"
// />
// function Dashboard() {
//   const [summary, setSummary] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

//  useEffect(() => {
//   api.get("/dashboard/summary")
//     .then((response) => {
//       setSummary(response.data);
//       setLoading(false);
//     })
//     .catch((error) => {
//       console.error(error);
//       setError("Failed to load dashboard data");
//       setLoading(false);
//     });
// }, []);

//   if (loading) {
//   return <h2>Loading...</h2>;
// }

// if (error) {
//   return <h2>{error}</h2>;
// }

// if (!summary) {
//   return <h2>No data available</h2>;
// }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Customer Intelligence Dashboard</h1>

//       <div
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "20px",
//     marginTop: "20px",
//   }}
// >
//         <KPICard
//           title="Total Revenue"
//           value={formatCurrency(
//             summary.total_revenue
//           ).toLocaleString()}
//         />

//         <KPICard
//           title="Total Customers"
//           value={Number(
//             summary.total_customers
//           ).toLocaleString()}
//         />

//         <KPICard
//           title="Total Orders"
//           value={Number(
//             summary.total_orders
//           ).toLocaleString()}
//         />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from "react";
import api from "../api";
import KPICard from "../components/KPICard";
import PageHeader from "../components/PageHeader";
import { formatCurrency } from "../utils/formatters";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/dashboard/summary")
      .then((response) => {
        setSummary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#64748B", padding: "40px 0" }}>
      <i className="ti ti-loader-2" style={{ fontSize: "20px", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      Loading…
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

  if (!summary) return (
    <div style={{ color: "#64748B", fontSize: "14px", padding: "40px 0" }}>No data available.</div>
  );

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Business overview and key performance indicators"
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}>
        <KPICard
          title="Total Revenue"
          value={formatCurrency(summary.total_revenue)}
          accent="indigo"
        />
        <KPICard
          title="Total Customers"
          value={Number(summary.total_customers).toLocaleString()}
          accent="emerald"
        />
        <KPICard
          title="Total Orders"
          value={Number(summary.total_orders).toLocaleString()}
          accent="amber"
        />
      </div>
    </div>
  );
}

export default Dashboard;