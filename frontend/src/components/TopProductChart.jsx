import {
    ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function TopProductsChart({ data }) {
  return (
    <ResponsiveContainer
  width="100%"
  height={500}
>
    <BarChart
      width={1000}
      height={500}
      data={data}
      layout="vertical"
      margin={{
        top: 20,
        right: 30,
        left: 250,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis type="number" />

      <YAxis
        type="category"
        dataKey="product"
        width={220}
      />

      <Tooltip />

      <Bar
        dataKey="revenue"
        fill="#8884d8"
      />
    </BarChart>
    </ResponsiveContainer>
  );
}

export default TopProductsChart;