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

const stackedBarData = [
  { date: "Oct 15", a: 0.03, b: 0, c: 0, d: 0, e: 0 },
  { date: "Oct 17", a: 0.05, b: 0, c: 0, d: 0, e: 0 },
  { date: "Oct 19", a: 0.06, b: 0, c: 0, d: 0, e: 0 },
  { date: "Oct 23", a: 0.08, b: 0.04, c: 0, d: 0, e: 0 },
  { date: "Oct 25", a: 0.09, b: 0.06, c: 0.04, d: 0.03, e: 0.12 },
  { date: "Oct 27", a: 0.11, b: 0.04, c: 0.04, d: 0.03, e: 0.12 },
  { date: "Oct 29", a: 0.12, b: 0.04, c: 0.04, d: 0.03, e: 0.12 },
  { date: "Nov 1", a: 0.1, b: 0.06, c: 0.05, d: 0.03, e: 0.12 },
  { date: "Nov 3", a: 0.14, b: 0.06, c: 0.05, d: 0.03, e: 0.12 },
  { date: "Nov 5", a: 0.07, b: 0.1, c: 0.05, d: 0.03, e: 0.12 },
];

export const StackedBarChartDemo = () => {
  const { theme } = useCUITheme();
  const chartColors = Object.values(theme.global.color.chart.default);
  return (
    <Container
      orientation="vertical"
      gap="sm"
      fillWidth
    >
      <Text weight="semibold">Stacked Bar Chart</Text>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={stackedBarData}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.3}
          />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="a"
            stackId="1"
            fill={chartColors[0]}
          />
          <Bar
            dataKey="b"
            stackId="1"
            fill={chartColors[1]}
          />
          <Bar
            dataKey="c"
            stackId="1"
            fill={chartColors[2]}
          />
          <Bar
            dataKey="d"
            stackId="1"
            fill={chartColors[3]}
          />
          <Bar
            dataKey="e"
            stackId="1"
            fill={chartColors[4]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};
