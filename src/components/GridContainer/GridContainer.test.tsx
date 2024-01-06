import { GridContainer, GridContainerProps } from "./GridContainer";
import { renderCUI } from "@/utils/test-utils";
import "@testing-library/jest-dom";

describe("GridContainer", () => {
  const renderContainer = (props: GridContainerProps) =>
    renderCUI(<GridContainer {...props} />);

  it("should render the container", () => {
    const { getByText } = renderContainer({ children: "Hello" });
    expect(getByText("Hello").textContent).toBe("Hello");
  });
});
