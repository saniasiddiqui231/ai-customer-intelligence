// import { useEffect, useState } from "react";
// import api from "../api";
// import RevenueForecastChart from "../components/RevenueForecastChart";
// import PageHeader from "../components/PageHeader";
// <PageHeader
//   title="Revenue Forecast"
//   subtitle="Historical trends and future projections"
// />
// function Forecast() {

//   const [historical, setHistorical] = useState([]);
//   const [forecast, setForecast] = useState([]);

//   useEffect(() => {

//     api.get("/forecast/revenue")
//       .then((response) => {

//         setHistorical(
//           response.data.historical
//         );

//         setForecast(
//           response.data.forecast
//         );

//       })
//       .catch((error) => {
//         console.error("Forecast Error:", error);
//       });

//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>

//       <h1>Revenue Forecast</h1>

//       <div className="chart-card"><RevenueForecastChart
//   historical={historical}
//   forecast={forecast}
// /></div>

// <br />

// <p>
//   Historical Records: {historical.length}
// </p>

// <p>
//   Forecast Records: {forecast.length}
// </p>
//     </div>
//   );
// }

// export default Forecast;
import { useEffect, useState } from "react";
import api from "../api";
import RevenueForecastChart from "../components/RevenueForecastChart";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

function StatBadge({ label, value, accent }) {
  const colors = {
    indigo: { bg: "#EEF2FF", text: "#6366F1" },
    emerald: { bg: "#ECFDF5", text: "#059669" },
  };
  const c = colors[accent] || colors.indigo;

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 14px",
      borderRadius: "20px",
      background: c.bg,
    }}>
      <span style={{ fontSize: "20px", fontWeight: 700, color: c.text, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
      <span style={{ fontSize: "12px", color: c.text, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function Forecast() {
  const [historical, setHistorical] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    api.get("/forecast/revenue")
      .then((response) => {
        setHistorical(response.data.historical);
        setForecast(response.data.forecast);
      })
      .catch((error) => console.error("Forecast Error:", error));
  }, []);

  return (
    <div>
      <PageHeader
        title="Revenue Forecast"
        subtitle="Historical trends and future projections"
      />

      <Card title="Revenue over time">
        <RevenueForecastChart
          historical={historical}
          forecast={forecast}
        />
        <div style={{ display: "flex", gap: "12px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #F1F5F9" }}>
          <StatBadge label="historical records" value={historical.length} accent="indigo" />
          <StatBadge label="forecast records" value={forecast.length} accent="emerald" />
        </div>
      </Card>
    </div>
  );
}

export default Forecast;