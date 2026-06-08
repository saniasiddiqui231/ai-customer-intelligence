import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
];

function PieChartComponent({
  data,
  nameKey,
  valueKey,
}) {

  return (
    <ResponsiveContainer
  width="100%"
  height={450}
>
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        dataKey={valueKey}
        nameKey={nameKey}
        cx="50%"
        cy="50%"
        outerRadius={120}
      >
        {data.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComponent;