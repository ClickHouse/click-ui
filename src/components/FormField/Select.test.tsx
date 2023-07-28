import { ThemeProvider } from "styled-components";
import { render, fireEvent } from "@testing-library/react";
import { themes } from "../../theme";
import { Select, SelectProps } from "./Select";
import { ReactNode } from "react";
interface Props extends Omit<SelectProps, "children" | "label"> {
  nodata?: ReactNode;
}
describe("Select", () => {
  const renderPopover = ({ nodata, ...props }: Props) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <Select
          label="Test Select Label"
          {...props}
        >
          <Select.Group heading="Group label">
            <Select.Item value="content0">Content0</Select.Item>
          </Select.Group>
          <Select.Item value="content1">Content1</Select.Item>
          <Select.Item value="content2">Content2</Select.Item>
          <Select.Item value="content3">Content3</Select.Item>
          <Select.Item
            value="content4"
            disabled
          >
            Content4
          </Select.Item>
          {nodata ? nodata : <Select.NoData />}
        </Select>
      </ThemeProvider>
    );

  it("should open select on click", () => {
    const { getByText } = renderPopover({});
    const popoverTrigger = getByText("Select an option");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(getByText("Content0")).not.toBeNull();
  });

  it("should show error", () => {
    const { getByText } = renderPopover({
      error: "Select Error",
    });
    expect(getByText("Select an option")).not.toBeNull();
    expect(getByText("Select Error")).not.toBeNull();
  });

  it("should not open disabled select on click", () => {
    const { getByText } = renderPopover({
      disabled: true,
    });
    const popoverTrigger = getByText("Select an option");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(getByText("Content0")).toBeNull();
  });

  it("should close select on clicking outside content", () => {
    const { getByText } = renderPopover({});
    const popoverTrigger = getByText("Select an option");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(getByText("Content0")).not.toBeNull();
    fireEvent.click(popoverTrigger);
    expect(getByText("Content0")).toBeNull();
  });

  it("should close select on selecting item", () => {
    const { getByText } = renderPopover({});
    const popoverTrigger = getByText("Select an option");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    const item = getByText("Content0");
    expect(item).not.toBeNull();
    fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(getByText("Content1")).toBeNull();
  });

  it("should close select on selecting diabled item", () => {
    const { getByText } = renderPopover({});
    const popoverTrigger = getByText("Select an option");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    const item = getByText("Content4");
    expect(item).not.toBeNull();
    fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(getByText("Content1")).not.toBeNull();
  });

  describe("onSearch enabled", () => {
    it("on open show all options", () => {
      const { getByText } = renderPopover({
        showSearch: true,
      });
      const popoverTrigger = getByText("Select an option");
      expect(popoverTrigger).not.toBeNull();
      fireEvent.click(popoverTrigger);

      expect(getByText("Content0")).not.toBeNull();
      expect(getByText("Content1")).not.toBeNull();
      expect(getByText("Content2")).not.toBeNull();
      expect(getByText("Content3")).not.toBeNull();
      expect(getByText("Content4")).not.toBeNull();
    });

    it("filter by text", () => {
      const { getByText, getByTestId } = renderPopover({
        showSearch: true,
      });
      const popoverTrigger = getByText("Select an option");
      expect(popoverTrigger).not.toBeNull();
      fireEvent.click(popoverTrigger);

      expect(getByText("Group label")).not.toBeNull();
      expect(getByText("Content0")).not.toBeNull();
      expect(getByText("Content1")).not.toBeNull();
      expect(getByText("Content2")).not.toBeNull();
      expect(getByText("Content3")).not.toBeNull();
      expect(getByText("Content4")).not.toBeNull();
      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "content2" },
      });
      expect(getByText("Content2")).not.toBeNull();
      expect(getByText("Content1")).toBeNull();
      expect(getByText("Group label")).toBeNull();
    });

    it("on clear show all data", () => {
      const { getByText, getByTestId } = renderPopover({
        showSearch: true,
      });
      const popoverTrigger = getByText("Select an option");
      expect(popoverTrigger).not.toBeNull();
      fireEvent.click(popoverTrigger);

      const selectInput = getByTestId("select-search-input");
      fireEvent.change(selectInput, {
        target: { value: "content2" },
      });
      expect(getByText("Content2")).not.toBeNull();
      expect(getByText("Content1")).toBeNull();
      expect(getByText("Group label")).toBeNull();
      fireEvent.click(getByTestId("search-select-close"));
      expect(getByText("Group label")).not.toBeNull();
      expect(getByText("Content0")).not.toBeNull();
      expect(getByText("Content1")).not.toBeNull();
      expect(getByText("Content2")).not.toBeNull();
      expect(getByText("Content3")).not.toBeNull();
      expect(getByText("Content4")).not.toBeNull();
      expect(document.activeElement).toBe(selectInput);
    });
    it("on no options available show no data", () => {
      const { getByText, getByTestId } = renderPopover({
        showSearch: true,
      });
      const popoverTrigger = getByText("Select an option");
      expect(popoverTrigger).not.toBeNull();
      fireEvent.click(popoverTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "nodata" },
      });
      expect(getByText("Content2")).toBeNull();
      expect(getByText("Content1")).toBeNull();
      expect(getByText("Group label")).toBeNull();
      const btn = getByText(/No Options found/i);
      expect(btn).not.toBeNull();
      fireEvent.click(btn);
      expect(btn).not.toBeNull();
    });
    it("on no options available show no custom data", () => {
      const onClick = jest.fn();
      const { getByText, getByTestId } = renderPopover({
        showSearch: true,
        nodata: (
          <Select.NoData onClick={onClick}>
            {({ search }) => `No Field found ${search}`}
          </Select.NoData>
        ),
      });
      const popoverTrigger = getByText("Select an option");
      expect(popoverTrigger).not.toBeNull();
      fireEvent.click(popoverTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "nodata" },
      });
      expect(getByText("Content2")).toBeNull();
      expect(getByText("Content1")).toBeNull();
      expect(getByText("Group label")).toBeNull();
      const btn = getByText(/No Field found/i);
      expect(btn).not.toBeNull();
      fireEvent.click(btn);
      expect(onClick).toBeCalledTimes(1);
      expect(btn).toBeNull();
    });
  });
});
