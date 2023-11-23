import { ProgressBar, ProgressBarProps } from "./ProgressBar";
import { fireEvent } from "@testing-library/react";
import { renderCUI } from "@/utils/test-utils";

describe("Progress bar", () => {
  const renderPopover = (props: ProgressBarProps) =>
    renderCUI(
      <ProgressBar
        {...props}
        data-testid="progressbar"
      />
    );

  it("should render progressBar", () => {
    const { queryAllByTestId } = renderPopover({
      type: "default",
      progress: 38,
    });
    const progressBar = queryAllByTestId("progressbar");
    expect(progressBar).toHaveLength(1);
    expect(progressBar[0].textContent).toContain("38%");
  });

  it("should not show count in small progressbar", () => {
    const { queryAllByTestId } = renderPopover({ type: "small", progress: 38 });
    const progressBar = queryAllByTestId("progressbar");
    expect(progressBar).toHaveLength(1);
    expect(progressBar[0].textContent).not.toContain("38%");
  });

  it("should show close Button if dismissable is true", () => {
    const onCancel = jest.fn();
    const { queryAllByTestId } = renderPopover({
      type: "default",
      progress: 38,
      dismissable: true,
      onCancel,
    });
    const progressBar = queryAllByTestId("progressbar");
    expect(progressBar).toHaveLength(1);
    const closeBtnList = queryAllByTestId("progressbar-close");
    expect(closeBtnList).toHaveLength(1);
    fireEvent.click(closeBtnList[0]);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should percentage if success message is not present", () => {
    const { queryAllByTestId } = renderPopover({ type: "default", progress: 100 });
    const progressBar = queryAllByTestId("progressbar");
    expect(progressBar).toHaveLength(1);
    expect(progressBar[0].textContent).toContain("100%");
  });

  it("should message if success message is present", () => {
    const { queryAllByTestId } = renderPopover({
      type: "default",
      progress: 100,
      successMessage: "Success",
    });
    const progressBar = queryAllByTestId("progressbar");
    expect(progressBar).toHaveLength(1);
    expect(progressBar[0].textContent).not.toContain("38%");
    expect(progressBar[0].textContent).toContain("Success");
  });
});
