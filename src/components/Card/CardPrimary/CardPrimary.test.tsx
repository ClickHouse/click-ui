import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/theme";
import { CardPrimary, CardProps } from "././CardPrimary";

describe("CardPrimary Component", () => {
  describe("Primary card", () => {
    const renderCard = (props: CardProps) =>
      render(
        <ThemeProvider theme="light">
          <CardPrimary {...props} />
        </ThemeProvider>
      );

    it("should render the title", () => {
      const title = "Test card component";
      renderCard({
        title,
        image: "warning",
        description: "",
        infoUrl: "",
        infoText: "",
      });

      expect(screen.getByText(title)).toBeDefined();
    });

    it("should render the description when provided", () => {
      const description = "This is the card description";
      renderCard({
        image: "warning",
        title: "",
        description,
        infoUrl: "",
        infoText: "",
      });

      expect(screen.getByText(description)).toBeDefined();
    });
  });
});
