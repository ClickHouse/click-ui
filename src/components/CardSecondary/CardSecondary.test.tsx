import { screen } from "@testing-library/react";
import { CardSecondary, CardSecondaryProps } from "./CardSecondary";
import { renderCUI } from "@/utils/test-utils";

describe("CardSecondary Component", () => {
  const renderCard = (props: CardSecondaryProps) =>
    renderCUI(<CardSecondary {...props} />);

  it("should render the title", () => {
    const title = "Test card component";
    renderCard({
      title,
      icon: "warning",
      description: "",
      infoUrl: "",
      infoText: "",
    });

    expect(screen.getAllByText(title).length).toEqual(1);
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

    expect(screen.getAllByText(description).length).toEqual(1);
  });

  it("should render the badge when hasBadge prop is present", () => {
    const badgeText = "I should eat more bananas";
    renderCard({
      icon: "warning",
      title: "",
      description: "",
      infoUrl: "",
      infoText: "",
      badgeText,
    });

    expect(screen.getAllByText(badgeText).length).toEqual(1);
  });

  it("should render an image when iconUrl is provided", () => {
    const iconUrl = "https://example.com/icon.png";
    renderCard({
      iconUrl,
      title: "Card with custom icon",
      description: "",
      infoUrl: "",
      infoText: "",
    });

    const imgElement = screen.getByAltText("card image");
    expect(imgElement).toHaveAttribute("src", iconUrl);
  });
});
