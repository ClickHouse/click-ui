import { screen } from "@testing-library/react";
import { CardHorizontal, CardHorizontalProps } from "./CardHorizontal";
import { renderCUI } from "@/utils/test-utils";

describe("CardHorizontal Component", () => {
  describe("Primary card", () => {
    const renderCard = (props: CardHorizontalProps) =>
      renderCUI(<CardHorizontal {...props} />);

    it("should render the title", () => {
      const title = "Test card component";
      renderCard({
        title,
        icon: "warning",
        description: "",
      });

      expect(screen.getByText(title)).toBeDefined();
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
  });
});
