import { useEffect, useState } from "react";
import api from "../api";
import PieChartComponent from "../components/PieChartComponent";
import KPICard from "../components/KPIcards";
import CLVDistributionChart from "../components/CLVDistributionChart";
import PageHeader from "../components/PageHeader";
import { formatPercent } from "../utils/formatters";
function Customers() {
  const [segments, setSegments] = useState([]);
  const [clv, setClv] = useState([]);
  const [churn, setChurn] = useState(null);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/customers/segments")
      .then((response) => {
        setSegments(response.data);
      })
      .catch((error) => {
        console.error("Segments Error:", error);
      });

    api.get("/customers/clv")
      .then((response) => {
        setClv(response.data);
      })
      .catch((error) => {
        console.error("CLV Error:", error);
      });

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

  if (loading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

  const totalCustomers = segments.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const largestSegment =
    segments.length > 0
      ? [...segments].sort(
          (a, b) => b.count - a.count
        )[0]
      : null;

  const highCLVCount =
    clv.find(
      (item) => item.clv_tier === "High CLV"
    )?.count || 0;

  return (
    <div style={{ padding: "20px" }}>
      <PageHeader
        title="Customer Intelligence"
        subtitle="Segmentation, churn and CLV insights"
      />
      <h1>Customers</h1>

      {/* Churn Metrics */}

      <h2>Churn Metrics</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <KPICard
          title="Average Churn Probability"
          value={
            formatPercent(
  churn.average_churn_probability
)
          }
        />

        <KPICard
          title="High Risk Customers"
          value={churn.high_risk_customers}
        />

        <KPICard
          title="Active Customers"
          value={
            totalCustomers -
            churn.high_risk_customers
          }
        />
      </div>

      {/* Segment Chart */}

      <h2>Customer Segments</h2>

      <div className="chart-card">
    <PieChartComponent
        data={segments}
        nameKey="segment"
        valueKey="count"
      /></div>

      <br />

      {/* CLV Chart */}

      <h2>CLV Distribution</h2>

      <div className="chart-card"><CLVDistributionChart
        data={clv}
      />
</div>
      <br />

      {/* Insights */}

      <h2>Customer Insights</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#EFF6FF",
borderLeft: "4px solid #2563EB"
          }}
        >
          {largestSegment &&
            (
              (
                largestSegment.count /
                totalCustomers
              ) * 100
            ).toFixed(1)}
          % of customers belong to the{" "}
          <strong>
            {largestSegment?.segment}
          </strong>{" "}
          segment.
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          There are currently{" "}
          <strong>
            {churn.high_risk_customers}
          </strong>{" "}
          customers classified as
          high-risk.
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <strong>
            {highCLVCount}
          </strong>{" "}
          customers are classified as
          High CLV.
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          {largestSegment?.segment ===
          "Dormant Customers"
            ? "Dormant customers represent the largest retention opportunity."
            : "Customer retention remains a key business focus area."}
        </div>
      </div>
    </div>
  );
}

export default Customers;