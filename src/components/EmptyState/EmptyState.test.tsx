import { screen } from "@testing-library/react";
import { EmptyState, EmptyStateProps } from "./EmptyState";
import { renderCUI } from "@/utils/test-utils";

describe("EmptyState Component", () => {
  describe("Primary card", () => {
    const renderCard = (props: EmptyStateProps) => renderCUI(<EmptyState {...props} />);

    it("should render the title", () => {
      const title = "Test empty state component";
      renderCard({
        title,
        icon: "warning",
        description: "",
      });

      expect(screen.getByText(title)).toBeDefined();
    });

    it("should render the description when provided", () => {
      const description = "This is the empty state description";
      renderCard({
        icon: "warning",
        title: "",
        description,
      });

      expect(screen.getByText(description)).toBeDefined();
    });

    it("should render a primary button when the primaryActionLabel is provided", () => {
      const description = "This is the empty state description";
      const { queryByRole } = renderCard({
        icon: "warning",
        title: "",
        description,
        primaryActionLabel: "test",
      });

      expect(queryByRole("button")).not.toBeNull();
    });

    it("should not render button when the primaryActionLabel is provided and length is 0", () => {
      const description = "This is the card description";
      const { queryByRole } = renderCard({
        icon: "warning",
        title: "",
        description,
        primaryActionLabel: "",
      });

      expect(queryByRole("button")).toBeNull();
    });

    it("should render a secondary button when the secondaryActionLabel is provided", () => {
      const description = "This is the empty state description";
      const { queryByRole } = renderCard({
        icon: "warning",
        title: "",
        description,
        secondaryActionLabel: "test",
      });

      expect(queryByRole("button")).not.toBeNull();
    });

    it("should not render a secondary button when the secondaryActionLabel is provided and length is 0", () => {
      const description = "This is the card description";
      const { queryByRole } = renderCard({
        icon: "warning",
        title: "",
        description,
        secondaryActionLabel: "",
      });

      expect(queryByRole("button")).toBeNull();
    });
  });
});
