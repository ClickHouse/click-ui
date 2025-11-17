import { Container } from "@/components";
import { ColorSwatchesChart } from "./chart-examples/ColorSwatchesChart";
import { MultiLineChart } from "./chart-examples/MultiLineChart";
import { GroupedBarChart } from "./chart-examples/GroupedBarChart";
import { StackedAreaChart } from "./chart-examples/StackedAreaChart";
import { PieChartDemo } from "./chart-examples/PieChartDemo";
import { StackedBarChartDemo } from "./chart-examples/StackedBarChartDemo";

export const ChartColorComponent = () => (
  <Container
    gap="lg"
    padding="md"
    orientation="vertical"
    fillWidth
    maxWidth="900px"
  >
    <ColorSwatchesChart />
    <MultiLineChart />
    <GroupedBarChart />
    <StackedAreaChart />
    <PieChartDemo />
    <StackedBarChartDemo />
  </Container>
);
