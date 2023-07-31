import { render } from "@testing-library/react";

import { CardSecondary } from "./CardSecondary";
import { IconName } from "@/components/Icon/types";
const logo: IconName = "arrow-right";

describe("CardSecondary Component", () => {
  const testProps = {
    title: "Test Title",
    logo: logo,
    description: "Test description",
    infoUrl: "https://test.com",
    infoText: "Test Info Link",
  };

  it("should render the CardSecondary component", () => {
    const { getByText } = render(<CardSecondary {...testProps} />);
    
    // Assert that the title and description are rendered
    expect(getByText(testProps.title)).toBeInTheDocument();
    expect(getByText(testProps.description)).toBeInTheDocument();
  });

  it("should render a badge with the provided text when hasBadge prop is true", () => {
    const badgeText = "New";
    const { getByText } = render(<CardSecondary {...testProps} hasBadge badgeText={badgeText} />);
    
    // Assert that the badge with the provided text is rendered
    expect(getByText(badgeText)).toBeInTheDocument();
  });

  it("should not render a badge when hasBadge prop is false", () => {
    const { queryByTestId } = render(<CardSecondary {...testProps} hasBadge={false} />);
    
    // Assert that the badge is not rendered
    expect(queryByTestId("badge")).not.toBeInTheDocument();
  });

});