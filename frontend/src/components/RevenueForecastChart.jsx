import {
    ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function RevenueForecastChart({ historical, forecast }) {

  const historicalData = historical.map(item => ({
    month: item.month,
    historicalRevenue: item.revenue,
    forecastRevenue: null,
  }));

  const forecastData = forecast.map(item => ({
    month: item.month,
    historicalRevenue: null,
    forecastRevenue: item.revenue,
  }));

  const chartData = [
    ...historicalData,
    ...forecastData,
  ];

  return (
    <ResponsiveContainer
    width="100%"
    height={450}
    >
    <LineChart
      width={900}
      height={450}
      data={chartData}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Line
        type="monotone"
        dataKey="historicalRevenue"
        name="Historical Revenue"
        stroke="#5d0408"
        strokeWidth={3}
      />

      <Line
        type="monotone"
        dataKey="forecastRevenue"
        name="Forecast Revenue"
        stroke="#040442"
        strokeWidth={3}
      />
    </LineChart>
    </ResponsiveContainer>
  );
}

export default RevenueForecastChart;