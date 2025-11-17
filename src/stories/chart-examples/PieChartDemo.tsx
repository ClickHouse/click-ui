import { Container, Text } from "@/components";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useCUITheme } from "@/theme/ClickUIProvider";

const pieData = [
  { name: "Category A", value: 30 },
  { name: "Category B", value: 25 },
  { name: "Category C", value: 20 },
  { name: "Category D", value: 15 },
  { name: "Category E", value: 10 },
];

export const PieChartDemo = () => {
  const { theme } = useCUITheme();
  const chartColors = Object.values(theme.global.color.chart.default);
  return (
    <Container
      orientation="vertical"
      gap="sm"
      fillWidth
    >
      <Text weight="semibold">Pie Chart</Text>
      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={entry => entry.name}
          >
            {pieData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
};
