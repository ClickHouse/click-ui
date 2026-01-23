import { screen } from "@testing-library/react";
import { CardPromotion, CardPromotionProps } from "./CardPromotion";
import { renderCUI } from "../../utils/test-utils";

describe("CardPromo Component", () => {
  describe("Promotional card", () => {
    const renderCard = (props: CardPromotionProps) =>
      renderCUI(<CardPromotion {...props} />);

    it("should render the label", () => {
      const label = "Test card component";
      renderCard({
        label,
        icon: "star",
      });

      expect(screen.getByText(label)).toBeDefined();
    });
  });
});
