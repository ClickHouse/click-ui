import { Container, ContainerProps } from "./Container";
import { renderCUI } from "@/utils/test-utils";
import "@testing-library/jest-dom";

describe("Container", () => {
  const renderContainer = (props: ContainerProps<"div">) =>
    renderCUI(<Container {...props} />);

  it("should render the container", () => {
    const { getByText } = renderContainer({ children: "Hello" });
    expect(getByText("Hello").textContent).toBe("Hello");
  });
});
