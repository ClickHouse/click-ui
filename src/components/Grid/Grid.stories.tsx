import { Grid } from "./Grid";

export default {
  component: Grid,
  title: "Display/Grid",
  tags: ["grid", "autodocs"],
};

export const Playground = {
  args: {
    rowCount: 120,
    columnCount: 200,
    cell: ({ rowIndex, columnIndex }) => {
      return (
        <div>
          {rowIndex} {columnIndex}
        </div>
      );
    },
  },
};
