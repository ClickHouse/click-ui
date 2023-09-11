import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MultiSelect, SelectProps } from "./MultiSelect";
import { ReactNode } from "react";
import { renderCUI } from "@/utils/test-utils";
interface Props extends Omit<SelectProps, "children" | "label"> {
  nodata?: ReactNode;
}
describe("MultiSelect", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  const renderSelect = ({ nodata, ...props }: Props) =>
    renderCUI(
      <MultiSelect
        label="Test Select Label"
        {...props}
      >
        <MultiSelect.Group heading="Group label">
          <MultiSelect.Item value="content0">Content0</MultiSelect.Item>
        </MultiSelect.Group>
        <MultiSelect.Item value="content1">Content1</MultiSelect.Item>
        <MultiSelect.Item value="content2">Content2</MultiSelect.Item>
        <MultiSelect.Item value="content3">Content3</MultiSelect.Item>
        <MultiSelect.Item
          value="content4"
          disabled
        >
          Content4
        </MultiSelect.Item>
        {nodata ? nodata : <MultiSelect.NoData />}
      </MultiSelect>
    );

  it("should open select on click", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeNull();
  });

  it("should show error", () => {
    const { queryByText } = renderSelect({
      error: "Select Error",
    });
    expect(queryByText("Select an option")).not.toBeNull();
    expect(queryByText("Select Error")).not.toBeNull();
  });

  it("should not open disabled select on click", () => {
    const { queryByText } = renderSelect({
      disabled: true,
    });
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).toBeNull();
  });

  it("should close select on clicking outside content", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);
    expect(queryByText("Content0")).toBeNull();
  });

  it("should close select on selecting item", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1")).toBeNull();
  });

  it("should close select on selecting diabled item", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content4");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1")).not.toBeNull();
  });

  describe("onSearch enabled", () => {
    it("on open show all options", () => {
      const { queryByText } = renderSelect({});
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
    });

    it("filter by text", () => {
      const { queryByText, getByTestId } = renderSelect({});
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content1")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
    });

    it("on clear show all data", () => {
      const { queryByText, getByTestId } = renderSelect({});
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      const selectInput = getByTestId("select-search-input");
      fireEvent.change(selectInput, {
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content1")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
      fireEvent.click(getByTestId("select-search-close"));
      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      expect(document.activeElement).toBe(selectInput);
    });
    it("on no options available show no data", () => {
      const { queryByText, getByTestId } = renderSelect({});
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "nodata" },
      });
      expect(queryByText("Content2")).toBeNull();
      expect(queryByText("Content1")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
      const btn = queryByText(/No Options found/i);
      expect(btn).not.toBeNull();
      btn && fireEvent.click(btn);
      expect(btn).not.toBeNull();
    });
    it("on no options available show no custom data", () => {
      const onClick = jest.fn();
      const { queryByText, getByTestId } = renderSelect({
        nodata: (
          <MultiSelect.NoData onClick={onClick}>
            {"No Field found {search}"}
          </MultiSelect.NoData>
        ),
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "nodata" },
      });
      expect(queryByText("Content2")).toBeNull();
      expect(queryByText("Content1")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
      const btn = queryByText(/No Field found/i);
      expect(btn).not.toBeNull();
      btn && fireEvent.click(btn);
      expect(onClick).toBeCalledTimes(1);
      expect(btn).not.toBeVisible();
    });
  });
});
