import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/theme";
import { CardSecondary, CardProps } from "./CardSecondary";

describe("CardSecondary Component", () => {
  const renderCard = (props: CardProps) =>
    render(
      <ThemeProvider theme="light">
        <CardSecondary {...props} />
      </ThemeProvider>
    );

		it("should render the title", () => {
      const title = "Test card component";
      renderCard({
				title,
				image: "warning",
				description: "",
				infoUrl: "",
				infoText: ""
			});

			expect(screen.getAllByText(title).length).toEqual(1);
    });

		it("should render the description when provided", () => {
			const description = "This is the card description";
			renderCard({
				image: "warning",
				title: "",
				description,
				infoUrl: "",
				infoText: ""
			});
	
			expect(screen.getAllByText(description).length).toEqual(1);
		});	

		it("should render the badge when hasBadge prop is present", () => {
			const badgeText = "I should eat more bananas";
			renderCard({
				image: "warning",
				title: "",
				description: "",
				infoUrl: "",
				infoText: "",
				badgeText,
			});
	
			expect(screen.getAllByText(badgeText).length).toEqual(1);
		});	

});