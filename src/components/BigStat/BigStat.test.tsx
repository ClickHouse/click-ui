import { screen } from "@testing-library/react";
import { BigStat, BigStatProps } from "./BigStat";
import { renderCUI } from "@/utils/test-utils";

describe("BigStat Component", () => {
  describe("BigStat", () => {
    const renderBigStat = (props: BigStatProps) => renderCUI(<BigStat {...props} />);

    it("should render the title and label", () => {
      const title = "Percentage complete";
      const label = "100%";
      renderBigStat({
        title,
        label,
      });

      expect(screen.getByText(title)).toBeDefined();
      expect(screen.getByText(label)).toBeDefined();
    });

    it("should render with default props", () => {
      renderBigStat({
        title: "Title",
        label: "Label",
      });

      const wrapper = screen.getByText("Title").closest("div");
      expect(wrapper).toBeDefined();
    });

    it("should render with error state", () => {
      renderBigStat({
        title: "Error Title",
        label: "Error Label",
        error: true,
      });

      expect(screen.getByText("Error Title")).toBeDefined();
      expect(screen.getByText("Error Label")).toBeDefined();
    });

    it("should render with titleBottom order", () => {
      renderBigStat({
        title: "Bottom Title",
        label: "Top Label",
        order: "titleBottom",
      });

      expect(screen.getByText("Bottom Title")).toBeDefined();
      expect(screen.getByText("Top Label")).toBeDefined();
    });

    it("should render with small size", () => {
      renderBigStat({
        title: "Small Title",
        label: "Small Label",
        size: "sm",
      });

      expect(screen.getByText("Small Title")).toBeDefined();
      expect(screen.getByText("Small Label")).toBeDefined();
    });

    it("should render with muted state", () => {
      renderBigStat({
        title: "Muted Title",
        label: "Muted Label",
        state: "muted",
      });

      expect(screen.getByText("Muted Title")).toBeDefined();
      expect(screen.getByText("Muted Label")).toBeDefined();
    });

    it("should render with fillWidth prop", () => {
      renderBigStat({
        title: "Full Width Title",
        label: "Full Width Label",
        fillWidth: true,
      });

      expect(screen.getByText("Full Width Title")).toBeDefined();
    });

    it("should render with maxWidth prop", () => {
      renderBigStat({
        title: "Max Width Title",
        label: "Max Width Label",
        maxWidth: "300px",
      });

      expect(screen.getByText("Max Width Title")).toBeDefined();
    });

    it("should render with large spacing", () => {
      renderBigStat({
        title: "Large Spacing Title",
        label: "Large Spacing Label",
        spacing: "lg",
      });

      expect(screen.getByText("Large Spacing Title")).toBeDefined();
      expect(screen.getByText("Large Spacing Label")).toBeDefined();
    });

    it("should render with custom height", () => {
      renderBigStat({
        title: "Custom Height Title",
        label: "Custom Height Label",
        height: "8rem",
      });

      expect(screen.getByText("Custom Height Title")).toBeDefined();
    });

    it("should render with icon", () => {
      const { getByTestId } = renderBigStat({
        title: "Icon Title",
        label: "Icon Label",
        iconName: "user",
      });

      expect(screen.getByText("Icon Title")).toBeDefined();
      expect(getByTestId("bigstat-icon-wrapper")).toBeDefined();
    });

    it("should not render icon when iconName is not provided", () => {
      const { queryByTestId } = renderBigStat({
        title: "No Icon Title",
        label: "No Icon Label",
      });

      expect(queryByTestId("bigstat-icon-wrapper")).toBeNull();
    });

    it("should render with icon and custom icon size", () => {
      const { getByTestId } = renderBigStat({
        title: "Icon Size Title",
        label: "Icon Size Label",
        iconName: "database",
        iconSize: "xl",
      });

      const iconWrapper = getByTestId("bigstat-icon-wrapper");
      expect(iconWrapper).toBeDefined();
      expect(iconWrapper.getAttribute("data-icon-size")).toBe("xl");

      // Verify the Icon component is rendered within the wrapper
      const iconElement = iconWrapper.querySelector("svg");
      expect(iconElement).toBeDefined();
    });

    it("should use default icon size of lg when not specified", () => {
      const { getByTestId } = renderBigStat({
        title: "Default Icon Size",
        label: "Default Size Label",
        iconName: "user",
      });

      const iconWrapper = getByTestId("bigstat-icon-wrapper");
      expect(iconWrapper.getAttribute("data-icon-size")).toBe("lg");
    });
  });
});
