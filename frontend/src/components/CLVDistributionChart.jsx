import {
    ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function CLVDistributionChart({ data }) {
  return (
    <ResponsiveContainer
  width="100%"
  height={500}
>
    <BarChart
      width={700}
      height={350}
      data={data}
      layout="vertical"
      margin={{
        top: 20,
        right: 30,
        left: 100,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis type="number" />

      <YAxis
        type="category"
        dataKey="clv_tier"
      />

      <Tooltip />

      <Bar
        dataKey="count"
        fill="#00C49F"
      />
    </BarChart>
    </ResponsiveContainer>
  );
}

export default CLVDistributionChart;