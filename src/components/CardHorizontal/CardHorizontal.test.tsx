import { screen } from "@testing-library/react";
import { CardHorizontal, CardHorizontalProps } from "./CardHorizontal";
import { renderCUI } from "../../utils/test-utils";

describe("CardHorizontal Component", () => {
  const renderCard = (props: CardHorizontalProps) =>
    renderCUI(<CardHorizontal {...props} />);

  it("should render the title", () => {
    const title = "Test card component";
    renderCard({
      title,
      icon: "warning",
      description: "",
      badgeText: "",
    });

    expect(screen.getByText(title)).toBeDefined();
    expect(screen.queryByTestId("horizontal-card-badge")).toBeNull();
  });

  it("should render the description when provided", () => {
    const description = "This is the card description";
    renderCard({
      icon: "warning",
      title: "",
      description,
    });

    expect(screen.getByText(description)).toBeDefined();
  });

  it("should render the badge when provided", () => {
    const description = "This is the card description";
    renderCard({
      icon: "warning",
      title: "title",
      description,
      badgeText: "Badge",
    });

    expect(screen.getByText("title")).toBeDefined();
    expect(screen.getByTestId("horizontal-card-badge")).toBeDefined();
  });

  it("should not render the badge when badgeText is provided and not title", () => {
    const description = "This is the card description";
    renderCard({
      icon: "warning",
      title: "",
      description,
      badgeText: "Badge",
    });

    expect(screen.getByText(description)).toBeDefined();
  });

  it("should render with small size", () => {
    const { container } = renderCard({
      title: "Test card",
      description: "Test description",
      size: "sm",
    });

    expect(container.firstChild).toBeDefined();
  });

  it("should render with medium size", () => {
    const { container } = renderCard({
      title: "Test card",
      description: "Test description",
      size: "md",
    });

    expect(container.firstChild).toBeDefined();
  });

  it("should default to medium size when size prop is not provided", () => {
    const { container } = renderCard({
      title: "Test card",
      description: "Test description",
    });

    expect(container.firstChild).toBeDefined();
  });

  it("should render the button when provided", () => {
    renderCard({
      title: "title",
      infoText: "I'm a button",
    });

    expect(screen.getByText("title")).toBeDefined();
    expect(screen.getByTestId("horizontal-card-button")).toBeDefined();
  });

  it("should have aria-disabled=true attribute when disabled", () => {
    const { container } = renderCard({
      title: "Test Card",
      disabled: true,
    });

    const wrapper = container.firstChild;
    expect(wrapper).toHaveAttribute("aria-disabled", "true");
  });

  it("should have aria-disabled=false when enabled", () => {
    const { container } = renderCard({
      title: "Test Card",
      disabled: false,
    });

    const wrapper = container.firstChild;
    expect(wrapper).toHaveAttribute("aria-disabled", "false");
  });

  it("should have tabIndex -1 when disabled", () => {
    const { container } = renderCard({
      title: "Test Card",
      disabled: true,
    });

    const wrapper = container.firstChild;
    expect(wrapper).toHaveAttribute("tabIndex", "-1");
  });

  it("should have tabIndex 0 when enabled", () => {
    const { container } = renderCard({
      title: "Test Card",
      disabled: false,
    });

    const wrapper = container.firstChild;
    expect(wrapper).toHaveAttribute("tabIndex", "0");
  });

  it("should not call onClick when disabled", () => {
    const onClickMock = vitest.fn();
    const { container } = renderCard({
      title: "Test Card",
      disabled: true,
      onButtonClick: onClickMock,
    });

    const wrapper = container.firstChild as HTMLElement;
    wrapper.click();

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("should call onClick when enabled", () => {
    const onClickMock = vitest.fn();
    const { container } = renderCard({
      title: "Test Card",
      disabled: false,
      onButtonClick: onClickMock,
    });

    const wrapper = container.firstChild as HTMLElement;
    wrapper.click();

    expect(onClickMock).toHaveBeenCalled();
  });

  it("should disable nested button when card is disabled", () => {
    const { getByRole } = renderCard({
      title: "Test Card",
      infoText: "Click me",
      disabled: true,
    });

    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should not open infoUrl when disabled", () => {
    const windowOpenSpy = vitest.spyOn(window, "open").mockImplementation(() => null);
    const { container } = renderCard({
      title: "Test Card",
      infoUrl: "https://example.com",
      disabled: true,
    });

    const wrapper = container.firstChild as HTMLElement;
    wrapper.click();

    expect(windowOpenSpy).not.toHaveBeenCalled();
    windowOpenSpy.mockRestore();
  });
});
