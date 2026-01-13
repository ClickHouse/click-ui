import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: "Display/Pagination",
  tags: ["pagination", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

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

export const Playground: Story = {
  args: {
    currentPage: 1,
  },
  render: () => <PaginationRenderer />,
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Basic Pagination (No Total)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            currentPage={1}
            onChange={() => {}}
          />
          <Pagination
            currentPage={5}
            onChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Pagination with Total Pages</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            currentPage={1}
            totalPages={10}
            onChange={() => {}}
          />
          <Pagination
            currentPage={5}
            totalPages={10}
            onChange={() => {}}
          />
          <Pagination
            currentPage={10}
            totalPages={10}
            onChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Pagination with Row Count</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            currentPage={1}
            totalPages={10}
            rowCount={1250}
            onChange={() => {}}
          />
          <Pagination
            currentPage={5}
            totalPages={10}
            rowCount={1250}
            onChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Pagination with Page Size Selector</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            currentPage={1}
            totalPages={10}
            rowCount={500}
            maxRowsPerPageList={[10, 25, 50, 100]}
            pageSize={25}
            onChange={() => {}}
            onPageSizeChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Pagination with All Rows Option</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            currentPage={1}
            totalPages={10}
            rowCount={500}
            maxRowsPerPageList={[10, 25, 50, 100]}
            pageSize={-1}
            allowAllRows={true}
            onChange={() => {}}
            onPageSizeChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Disabled States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            currentPage={1}
            totalPages={10}
            onChange={() => {}}
          />
          <Pagination
            currentPage={10}
            totalPages={10}
            onChange={() => {}}
          />
          <Pagination
            currentPage={1}
            totalPages={10}
            disableNextButton
            onChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Without Fill Width</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Pagination
            currentPage={5}
            totalPages={10}
            rowCount={500}
            fillWidth={false}
            onChange={() => {}}
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ["button", ".cuiCustomSelect"],
      focus: ["button", "input"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
