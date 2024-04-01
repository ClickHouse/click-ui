import {
  act,
  fireEvent,
  queryByText as queryByTestingText,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { CheckboxMultiSelect, CheckboxMultiSelectProps } from "./CheckboxMultiSelect";
import { ReactNode } from "react";
import { renderCUI } from "@/utils/test-utils";
import { selectOptions } from "./selectOptions";

interface Props extends Omit<CheckboxMultiSelectProps, "children" | "label"> {
  nodata?: ReactNode;
  showSearch?: boolean;
}

const renderSelect = (props: Props) => {
  if (props.options) {
    return renderCUI(
      <CheckboxMultiSelect
        label="Test CheckboxMultiSelect Label"
        {...props}
      />
    );
  }

  return renderCUI(
    <CheckboxMultiSelect
      label="Test CheckboxMultiSelect Label"
      {...props}
    >
      <CheckboxMultiSelect.Group heading="Group label">
        <CheckboxMultiSelect.Item value="content0">Content0</CheckboxMultiSelect.Item>
      </CheckboxMultiSelect.Group>
      <CheckboxMultiSelect.Item value="content1">
        Content1 long text content
      </CheckboxMultiSelect.Item>
      <CheckboxMultiSelect.Item
        value="content2"
        disabled
      >
        Content2
      </CheckboxMultiSelect.Item>
      <CheckboxMultiSelect.Item value="content3">Content3</CheckboxMultiSelect.Item>
      <CheckboxMultiSelect.Item
        value="content4"
        label="Content4"
      />
    </CheckboxMultiSelect>
  );
};

describe("CheckboxCheckboxMultiSelect", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it("opens on click", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).toBeInTheDocument();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).toBeInTheDocument();
  });

  it("shows the label if one is passed in", () => {
    const { queryByText, getByTestId, getByText } = renderSelect({
      selectLabel: "Do something",
      value: ["content0", "content1"],
    });

    const selectTrigger = getByTestId("select-trigger");

    expect(queryByTestingText(selectTrigger, "Do something")).toBeInTheDocument();

    selectTrigger && fireEvent.click(selectTrigger);
    expect(queryByText("Content3")).toBeInTheDocument();

    act(() => {
      getByText("Content3").click();
    });

    expect(queryByTestingText(selectTrigger, "Do something")).toBeInTheDocument();
    expect(queryByTestingText(selectTrigger, "Content3")).not.toBeInTheDocument();
  });

  it("shows allows checking and unchecking", async () => {
    const { getByTestId } = renderSelect({
      selectLabel: "Select columns",
      value: ["content0", "content1"],
    });

    const selectTrigger = getByTestId("select-trigger");
    selectTrigger && fireEvent.click(selectTrigger);

    expect(screen.getByTestId("multi-select-checkbox-content0")).toHaveAttribute(
      "data-state",
      "checked"
    );

    const content2 = screen.getByTestId("multi-select-checkbox-content2");
    expect(content2).toHaveAttribute("data-state", "unchecked");

    const checkbox = content2.querySelector("[data-testid='multi-select-checkbox']");
    checkbox && fireEvent.click(checkbox);
    expect(screen.getByTestId("multi-select-checkbox-content2")).toHaveAttribute(
      "data-state",
      "checked"
    );
  });

  it("shows errors", () => {
    const { queryByText } = renderSelect({
      error: "Select Error",
    });
    expect(queryByText("Select an option")).toBeInTheDocument();
    expect(queryByText("Select Error")).toBeInTheDocument();
  });

  it("should not open a disabled select on click", () => {
    const { getByTestId, queryByText } = renderSelect({
      selectLabel: "Do the thing",
      disabled: true,
    });

    const selectTrigger = getByTestId("select-trigger");
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeInTheDocument();
  });

  it("closes on clicking outside content", () => {
    const { getByTestId, queryByText } = renderSelect({ selectLabel: "Do the thing" });

    const selectTrigger = getByTestId("select-trigger");
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).toBeInTheDocument();
    selectTrigger && fireEvent.click(selectTrigger);
    expect(queryByText("Content0")).not.toBeInTheDocument();
  });

  it("does not close when selecting an item", () => {
    const { queryByText, getByTestId } = renderSelect({ selectLabel: "Do the thing" });

    const selectTrigger = getByTestId("select-trigger");
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content0");
    expect(item).toBeInTheDocument();
    item && fireEvent.click(item);
    expect(item).toBeInTheDocument();
    expect(getByTestId("select-trigger")).toHaveTextContent("Do the thing");
  });

  it("does not close when selecting a diabled item", () => {
    const { getByTestId, queryByText } = renderSelect({ selectLabel: "Select" });

    const selectTrigger = getByTestId("select-trigger");
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content4");
    expect(item).toBeInTheDocument();
    item && fireEvent.click(item);
    expect(item).toBeInTheDocument();
    expect(queryByText("Content1 long text content")).toBeInTheDocument();
  });

  it("renders options", () => {
    const { queryByText, getByTestId } = renderSelect({
      selectLabel: "A different label",
      options: selectOptions,
    });

    const selectTrigger = getByTestId("select-trigger");
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content0");
    expect(item).toBeInTheDocument();
    item && fireEvent.click(item);
    expect(item).toBeInTheDocument();
    expect(getByTestId("select-trigger")).toHaveTextContent("A different label");
  });

  describe("searching through items", () => {
    it("shows all items on initial opening", () => {
      const { getByTestId, queryByText } = renderSelect({
        selectLabel: "Select an option",
        showSearch: true,
      });

      const selectTrigger = getByTestId("select-trigger");
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Content0")).toBeInTheDocument();
      expect(queryByText("Content1 long text content")).toBeInTheDocument();
      expect(queryByText("Content2")).toBeInTheDocument();
      expect(queryByText("Content3")).toBeInTheDocument();
      expect(queryByText("Content4")).toBeInTheDocument();
    });

    it("filters items by search text", () => {
      const { queryByText, getByTestId } = renderSelect({
        selectLabel: "Do the thing",
        showSearch: true,
      });

      const selectTrigger = getByTestId("select-trigger");
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).toBeInTheDocument();
      expect(queryByText("Content1 long text content")).toBeInTheDocument();
      expect(queryByText("Content2")).toBeInTheDocument();
      expect(queryByText("Content3")).toBeInTheDocument();
      expect(queryByText("Content4")).toBeInTheDocument();
      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).toBeInTheDocument();
      expect(queryByText("Content1 long text content")).not.toBeInTheDocument();
      expect(queryByText("Group label")).not.toBeVisible();
    });

    it("filters by text", () => {
      const { queryByText, getByTestId } = renderSelect({
        selectLabel: "Pick something",
        options: selectOptions,
        showSearch: true,
      });

      const selectTrigger = getByTestId("select-trigger");
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).toBeInTheDocument();
      expect(queryByText("Content1 long text content")).toBeInTheDocument();
      expect(queryByText("Content2")).toBeInTheDocument();
      expect(queryByText("Content3")).toBeInTheDocument();
      expect(queryByText("Content4")).toBeInTheDocument();
      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).toBeInTheDocument();
      expect(queryByText("Content1 long text content")).not.toBeInTheDocument();
      expect(queryByText("Group label")).not.toBeVisible();
    });

    it("shows all data after clearing", () => {
      const { queryByText, getByTestId } = renderSelect({
        selectLabel: "Pick something",
        showSearch: true,
      });

      const selectTrigger = getByTestId("select-trigger");
      selectTrigger && fireEvent.click(selectTrigger);

      const selectInput = getByTestId("select-search-input");
      fireEvent.change(selectInput, {
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).toBeInTheDocument();
      expect(queryByText("Content1 long text content")).not.toBeInTheDocument();
      expect(queryByText("Group label")).not.toBeVisible();
      fireEvent.click(getByTestId("select-search-close"));
      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).toBeInTheDocument();
      expect(queryByText("Content1 long text content")).toBeInTheDocument();
      expect(queryByText("Content2")).toBeInTheDocument();
      expect(queryByText("Content3")).toBeInTheDocument();
      expect(queryByText("Content4")).toBeInTheDocument();
      expect(document.activeElement).toBe(selectInput);
    });

    it("shows no data when there are no options", () => {
      const { queryByText, getByTestId } = renderSelect({
        selectLabel: "Pick something",
        showSearch: true,
      });

      const selectTrigger = getByTestId("select-trigger");
      selectTrigger && fireEvent.click(selectTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "nodata" },
      });
      expect(queryByText("Content2")).not.toBeInTheDocument();
      expect(queryByText("Content1 long text content")).not.toBeInTheDocument();
      expect(queryByText("Group label")).not.toBeVisible();
      const btn = queryByText(/No Options found/i);
      expect(btn).toBeInTheDocument();
      btn && fireEvent.click(btn);
      expect(btn).toBeInTheDocument();
    });
  });
});
