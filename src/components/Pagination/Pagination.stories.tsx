import { useState } from "react";
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

const PaginationRenderer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      onChange={handleChange}
    />
  );
};

export const Playground = {
  args: {
    currentPage: 1,
    options: [250, 500],
  },
  render: () => <PaginationRenderer />,
};
