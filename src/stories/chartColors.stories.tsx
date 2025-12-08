import { ChartColorComponent } from "./ChartColorComponent";

const defaultStory = {
  title: "Colors/Chart Colors",
  tags: ["autodocs", "color", "chart"],
  render: () => {
    return <ChartColorComponent />;
  },
};

export const Playground = {
  ...defaultStory,
};

export default defaultStory;
