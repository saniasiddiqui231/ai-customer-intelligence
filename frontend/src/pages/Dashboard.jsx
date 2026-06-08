import { useEffect, useState } from "react";
import api from "../api";
import KPICard from "../components/KPIcards";
import PageHeader from "../components/PageHeader";
import {
  formatCurrency
} from "../utils/formatters";
<PageHeader
  title="Dashboard"
  subtitle="Business overview and KPIs"
/>
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

  if (loading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

if (!summary) {
  return <h2>No data available</h2>;
}

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer Intelligence Dashboard</h1>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  }}
>
        <KPICard
          title="Total Revenue"
          value={formatCurrency(
            summary.total_revenue
          ).toLocaleString()}
        />

        <KPICard
          title="Total Customers"
          value={Number(
            summary.total_customers
          ).toLocaleString()}
        />

        <KPICard
          title="Total Orders"
          value={Number(
            summary.total_orders
          ).toLocaleString()}
        />
      </div>
    </div>
  );
}

export default Dashboard;