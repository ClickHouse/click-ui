import { fireEvent } from "@testing-library/react";
import { Table, TableProps } from "./Table";
import { renderCUI } from "@/utils/test-utils";

const headers = [{ label: "Company" }, { label: "Contact" }, { label: "Country" }];

const rows = [
  {
    id: "row-1",
    items: [
      { label: "Alfreds Futterkiste" },
      { label: "Maria Anders" },
      { label: "Germany" },
    ],
  },
  {
    id: "row-2",
    items: [
      { label: "Centro comercial Moctezuma" },
      { label: "Francisco Chang" },
      { label: "Mexico" },
    ],
  },
];

describe("Table", () => {
  const renderTable = (props: Omit<TableProps, "headers" | "rows">) =>
    renderCUI(
      <Table
        headers={headers}
        rows={rows}
        data-testid="table"
        {...props}
      />
    );

  it("should render the Table", () => {
    const { queryByTestId } = renderTable({});
    expect(queryByTestId("table")).not.toBeNull();
    expect(queryByTestId("checkbox")).toBeNull();
  });

  it("should show checkbox on isSelectable", () => {
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      selectedIds: [],
    });
    expect(queryByTestId("table")).not.toBeNull();
    expect(queryAllByTestId("checkbox")[0]).not.toBeNull();
    expect(queryAllByTestId("checkbox")[1]).not.toBeNull();
  });

  it("should trigger onSelect on clicking checkbox", () => {
    const onSelect = vi.fn();
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      selectedIds: [],
      onSelect,
    });
    expect(queryByTestId("table")).not.toBeNull();
    expect(queryAllByTestId("checkbox")).toHaveLength(4);
    const selectAllCheckbox = queryAllByTestId("checkbox")[1];
    const rowCheckbox = queryAllByTestId("checkbox")[2];
    expect(selectAllCheckbox).not.toBeNull();
    fireEvent.click(selectAllCheckbox);
    expect(onSelect).toBeCalledTimes(1);
    expect(rowCheckbox).not.toBeNull();
    fireEvent.click(selectAllCheckbox);
    expect(onSelect).toBeCalledTimes(2);
  });

  it("should trigger onDelete on clicking closeButton", () => {
    const onDelete = vi.fn();
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      onDelete,
    });
    expect(queryByTestId("table")).not.toBeNull();
    expect(queryAllByTestId("table-row-delete")).toHaveLength(2);
    expect(queryByTestId("table-row-edit")).toBeNull();
    const rowCheckbox = queryAllByTestId("table-row-delete")[0];
    expect(rowCheckbox).not.toBeNull();
    fireEvent.click(rowCheckbox);
    expect(onDelete).toBeCalledTimes(1);
  });

  it("should trigger onEdit on clicking editButton", () => {
    const onEdit = vi.fn();
    const { queryByTestId, queryAllByTestId } = renderTable({
      isSelectable: true,
      onEdit,
    });
    expect(queryByTestId("table")).not.toBeNull();
    expect(queryAllByTestId("table-row-edit")).toHaveLength(2);
    expect(queryByTestId("table-row-delete")).toBeNull();
    const rowCheckbox = queryAllByTestId("table-row-edit")[0];
    expect(rowCheckbox).not.toBeNull();
    fireEvent.click(rowCheckbox);
    expect(onEdit).toBeCalledTimes(1);
  });

  describe("Column Visibility", () => {
    const headersWithIds = [
      { id: "company", label: "Company" },
      { id: "contact", label: "Contact" },
      { id: "country", label: "Country" },
    ];

    it("should render column visibility button and toggle columns", () => {
      const { queryByTestId, container } = renderCUI(
        <Table
          headers={headersWithIds}
          rows={rows}
          enableColumnVisibility={true}
          tableId="test-table"
          data-testid="table"
        />
      );

      // Column visibility button should be present
      expect(queryByTestId("column-visibility-button")).not.toBeNull();

      // All columns should be visible by default
      let headerCells = container.querySelectorAll("thead th");
      expect(headerCells.length).toBe(4); // 3 columns + 1 settings column
      expect(headerCells[0].textContent).toBe("Company");
      expect(headerCells[1].textContent).toBe("Contact");
      expect(headerCells[2].textContent).toBe("Country");

      // Open popover and hide Contact column
      const settingsButton = queryByTestId("column-visibility-button");
      fireEvent.click(settingsButton!);

      const checkboxes = container.querySelectorAll('[role="checkbox"]');
      const contactCheckbox = checkboxes[1];
      fireEvent.click(contactCheckbox);

      // Contact column should now be hidden
      headerCells = container.querySelectorAll("thead th");
      const headerTexts = Array.from(headerCells).map(cell => cell.textContent);
      expect(headerTexts).toContain("Company");
      expect(headerTexts).not.toContain("Contact");
      expect(headerTexts).toContain("Country");
    });

    it("should not allow hiding mandatory columns", () => {
      const headersWithMandatory = [
        { id: "company", label: "Company", mandatory: true },
        { id: "contact", label: "Contact" },
        { id: "country", label: "Country" },
      ];

      const { queryByTestId, container } = renderCUI(
        <Table
          headers={headersWithMandatory}
          rows={rows}
          enableColumnVisibility={true}
          tableId="test-table-mandatory"
          data-testid="table"
        />
      );

      const settingsButton = queryByTestId("column-visibility-button");
      fireEvent.click(settingsButton!);

      const checkboxes = container.querySelectorAll('[role="checkbox"]');
      const companyCheckbox = checkboxes[0];

      // Mandatory column checkbox should be disabled
      expect(companyCheckbox.getAttribute("data-disabled")).toBe("true");
    });

    it("should call onLoadColumnVisibility and onSaveColumnVisibility", () => {
      const onLoad = vi.fn(() => ({
        company: true,
        contact: false,
        country: true,
      }));
      const onSave = vi.fn();

      const { queryByTestId, container } = renderCUI(
        <Table
          headers={headersWithIds}
          rows={rows}
          enableColumnVisibility={true}
          tableId="test-table-storage"
          onLoadColumnVisibility={onLoad}
          onSaveColumnVisibility={onSave}
          data-testid="table"
        />
      );

      // onLoad should be called on mount
      expect(onLoad).toHaveBeenCalledWith("test-table-storage");

      // Contact column should be hidden based on loaded state
      const headerCells = container.querySelectorAll("thead th");
      const headerTexts = Array.from(headerCells).map(cell => cell.textContent);
      expect(headerTexts).not.toContain("Contact");

      // Toggle Country column visibility
      const settingsButton = queryByTestId("column-visibility-button");
      fireEvent.click(settingsButton!);
      const checkboxes = container.querySelectorAll('[role="checkbox"]');
      const countryCheckbox = checkboxes[2];
      fireEvent.click(countryCheckbox);

      // onSave should be called with updated visibility
      expect(onSave).toHaveBeenCalled();
      const lastCall = onSave.mock.calls[onSave.mock.calls.length - 1];
      expect(lastCall[0]).toBe("test-table-storage");
      expect(lastCall[1]).toMatchObject({
        company: true,
        contact: false,
        country: false,
      });
    });
  });
});
