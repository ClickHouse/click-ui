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
  });
});
