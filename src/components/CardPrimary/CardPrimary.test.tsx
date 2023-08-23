import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/theme";
import { CardPrimary, CardPrimaryProps } from "./CardPrimary";

describe("CardPrimary Component", () => {
  describe("Primary card", () => {
    const renderCard = (props: CardPrimaryProps) =>
      render(
        <ThemeProvider theme="light">
          <CardPrimary {...props} />
        </ThemeProvider>
      );

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
  });
});
