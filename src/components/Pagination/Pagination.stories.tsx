import { Pagination } from "./Pagination";

export default {
  component: Pagination,
  title: "Display/Pagination",
  tags: ["pagination", "autodocs"],
  argTypes: {
    rowCount: {
      control: { type: "number" },
    },
  },
};

export const Playground = {
  args: {
    currentPage: 1,
    options: [250, 500],
  },
};
