import { renderCUI } from "@/utils/test-utils";
import { DateRangePicker } from "./DateRangePicker";
import userEvent from "@testing-library/user-event";

describe("DateRangePicker", () => {
  it("opens the calendar on click", async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DateRangePicker onSelectDateRange={handleSelectDate} />
    );

    expect(queryByTestId("datepicker-calendar-container")).not.toBeInTheDocument();

    await userEvent.click(getByTestId("daterangepicker-input"));

    expect(queryByTestId("datepicker-calendar-container")).toBeVisible();
  });

  it("sets the value of the DatePicker input start date to the start date passed in", () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date("07-04-2020");
    const { getByText } = renderCUI(
      <DateRangePicker
        startDate={startDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByText("Jul 04, 2020")).toBeInTheDocument();
    expect(getByText("- end date")).toBeInTheDocument();
  });

  it("sets the value of the DatePicker input end date to the end date passed in", () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date("07-04-2020");
    const endDate = new Date("07-05-2020");
    const { getByText } = renderCUI(
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByText("Jul 04, 2020 - Jul 05, 2020")).toBeInTheDocument();
  });

  it("does nothing if an end date is passed in but not a start date", () => {
    const handleSelectDate = vi.fn();
    const endDate = new Date("07-05-2020");
    const { getByText } = renderCUI(
      <DateRangePicker
        endDate={endDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByText("start date - end date")).toBeInTheDocument();
  });

  describe("selecting dates", () => {
    beforeAll(() => {
      vi.setSystemTime(new Date("07-04-2020"));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it("allows clearing the start date by clicking the start date", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));
      await userEvent.click(getByText("4"));
      await userEvent.click(getByText("4"));

      expect(getByText("start date - end date")).toBeInTheDocument();
    });

    it("calls onSelectDateRange when a date range is selected and passes in the selected date range", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));
      await userEvent.click(getByText("4"));
      await userEvent.click(getByText("10"));

      const [startDate, endDate] = handleSelectDate.mock.lastCall ?? [];

      expect(startDate).toEqual(new Date("2020-07-04 00:00.00"));
      expect(endDate).toEqual(new Date("2020-07-10 00:00.00"));
    });

    it("allows setting a new start date by clicking any date", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));
      await userEvent.click(getByText("4"));
      await userEvent.click(getByText("10"));

      expect(queryByTestId("datepicker-calendar-container")).not.toBeInTheDocument();

      await userEvent.click(getByTestId("daterangepicker-input"));
      await userEvent.click(getByText("10"));

      expect(getByText("Jul 10, 2020")).toBeInTheDocument();
      expect(getByText("- end date")).toBeInTheDocument();
    });
  });

  describe("disabling dates", () => {
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("07-04-2020"));
    });

    afterAll(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it("allows disabling selecting dates in the future", async () => {
      const startDate = new Date("07-04-2020");
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText } = renderCUI(
        <DateRangePicker
          startDate={startDate}
          futureDatesDisabled={true}
          onSelectDateRange={handleSelectDate}
        />
      );

      user.click(getByTestId("daterangepicker-input"));
      user.click(await findByText("22"));

      expect(handleSelectDate).not.toHaveBeenCalled();
    });
  });
});
