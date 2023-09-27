import { screen } from "@testing-library/react";
import { CardPrimary, CardPrimaryProps } from "./CardPrimary";
import { renderCUI } from "@/utils/test-utils";

describe("CardPrimary Component", () => {
  describe("Primary card", () => {
    const renderCard = (props: CardPrimaryProps) => renderCUI(<CardPrimary {...props} />);

    it("should render the title", () => {
      const title = "Test card component";
      renderCard({
        title,
        icon: "warning",
        description: "",
        infoUrl: "",
        infoText: "",
      });

      expect(screen.getByText(title)).toBeDefined();
    });

    it("should render the description when provided", () => {
      const description = "This is the card description";
      renderCard({
        icon: "warning",
        title: "",
        description,
        infoUrl: "",
        infoText: "",
      });

      expect(screen.getByText(description)).toBeDefined();
    });
    it("should render button when the infoUrl is provided", () => {
      const description = "This is the card description";
      const { queryByRole } = renderCard({
        icon: "warning",
        title: "",
        description,
        infoUrl: "test",
        infoText: "test",
      });

      expect(queryByRole("button")).not.toBeNull();
    });
    it("should not render button when the infoUrl is provided and length is 0", () => {
      const description = "This is the card description";
      const { queryByRole } = renderCard({
        icon: "warning",
        title: "",
        description,
        infoUrl: "",
        infoText: "",
      });

      expect(queryByRole("button")).toBeNull();
    });

    it("should render button when onButtonClick is provided", () => {
      const description = "This is the card description";
      const { queryByRole } = renderCard({
        icon: "warning",
        title: "",
        description,
        onButtonClick: () => null,
        infoText: "test1",
      });

      screen.debug();
      expect(queryByRole("button")).not.toBeNull();
    });
  });
});
