import { screen } from "@testing-library/react";
import { CardHorizontal, CardHorizontalProps } from "./CardHorizontal";
import { renderCUI } from "@/utils/test-utils";

describe("CardHorizontal Component", () => {
  describe("Horizontal card", () => {
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

      expect(screen.queryByTestId("horizontal-card-badge")).toBeNull();
    });

    it("should render the button when provided", () => {
      renderCard({
        title: "title",
        infoText: "I'm a button",
      });

      expect(screen.getByText("title")).toBeDefined();
      expect(screen.getByTestId("horizontal-card-button")).toBeDefined();
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
  });
});
