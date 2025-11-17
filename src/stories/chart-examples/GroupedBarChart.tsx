import { Container, Text } from "@/components";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useCUITheme } from "@/theme/ClickUIProvider";

const barData = [
  { name: "Q1", series1: 40, series2: 35, series3: 45, series4: 38, series5: 42 },
  { name: "Q2", series1: 30, series2: 42, series3: 38, series4: 45, series5: 35 },
  { name: "Q3", series1: 50, series2: 38, series3: 42, series4: 35, series5: 48 },
  { name: "Q4", series1: 45, series2: 48, series3: 40, series4: 50, series5: 40 },
];

export const GroupedBarChart = () => {
  const { theme } = useCUITheme();
  const chartColors = Object.values(theme.global.color.chart.default);
  return (
    <Container
      orientation="vertical"
      gap="sm"
      fillWidth
    >
      <Text weight="semibold">Grouped Bar Chart</Text>
      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <BarChart data={barData}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.3}
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {chartColors.map((color, index) => (
            <Bar
              key={index}
              dataKey={`series${index + 1}`}
              fill={color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};
