import { GridContainer, GridContainerProps } from "@/components";
import { renderCUI } from "@/utils/test-utils";

describe("GridContainer", () => {
  const renderContainer = (props: GridContainerProps) =>
    renderCUI(<GridContainer {...props} />);

  it("should render the container", () => {
    const { getByText } = renderContainer({ children: "Hello" });
    expect(getByText("Hello").textContent).toBe("Hello");
  });
});
