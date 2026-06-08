import { useEffect, useState } from "react";
import api from "../api";
import RevenueForecastChart from "../components/RevenueForecastChart";
import PageHeader from "../components/PageHeader";
<PageHeader
  title="Revenue Forecast"
  subtitle="Historical trends and future projections"
/>
function Forecast() {

  const [historical, setHistorical] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {

    api.get("/forecast/revenue")
      .then((response) => {

        setHistorical(
          response.data.historical
        );

        setForecast(
          response.data.forecast
        );

      })
      .catch((error) => {
        console.error("Forecast Error:", error);
      });

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Revenue Forecast</h1>

      <div className="chart-card"><RevenueForecastChart
  historical={historical}
  forecast={forecast}
/></div>

<br />

<p>
  Historical Records: {historical.length}
</p>

<p>
  Forecast Records: {forecast.length}
</p>
    </div>
  );
}

export default Forecast;