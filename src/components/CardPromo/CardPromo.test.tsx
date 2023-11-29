import { screen } from "@testing-library/react";
import { CardPromo, CardPromoProps } from "./CardPromo";
import { renderCUI } from "@/utils/test-utils";

describe("CardPromo Component", () => {
  describe("Promotional card", () => {
    const renderCard = (props: CardPromoProps) => renderCUI(<CardPromo {...props} />);

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
