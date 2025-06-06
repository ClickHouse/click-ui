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
    expect(getByText("– end date")).toBeInTheDocument();
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

    expect(getByText("Jul 04, 2020 – Jul 05, 2020")).toBeInTheDocument();
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

    expect(getByText("start date – end date")).toBeInTheDocument();
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

      expect(getByText("start date – end date")).toBeInTheDocument();
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
      expect(getByText("– end date")).toBeInTheDocument();
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

  describe("predefined date ranges", () => {
    beforeEach(() => {
      vi.setSystemTime(new Date("07-04-2020"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("doesn't show any preselected dates if the value isn't set", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, queryByTestId } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));

      expect(queryByTestId("predefined-dates-list")).not.toBeInTheDocument();
    });

    it("shows dates in the past if the value is negative", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={-6}
        />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));

      expect(getByText("Jul 2020")).toBeInTheDocument();
      expect(getByText("Jun 2020")).toBeInTheDocument();
      expect(getByText("May 2020")).toBeInTheDocument();
      expect(getByText("Apr 2020")).toBeInTheDocument();
      expect(getByText("Mar 2020")).toBeInTheDocument();
      expect(getByText("Feb 2020")).toBeInTheDocument();
    });

    it("shows dates in the future if the value is positive", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={6}
        />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));

      expect(getByText("Jul 2020")).toBeInTheDocument();
      expect(getByText("Aug 2020")).toBeInTheDocument();
      expect(getByText("Sep 2020")).toBeInTheDocument();
      expect(getByText("Oct 2020")).toBeInTheDocument();
      expect(getByText("Nov 2020")).toBeInTheDocument();
      expect(getByText("Dec 2020")).toBeInTheDocument();
    });

    it("allows showing the full calendar", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={-12}
        />
      );

      expect(queryByTestId("datepicker-calendar-container")).not.toBeInTheDocument();

      await userEvent.click(getByTestId("daterangepicker-input"));
      await userEvent.click(getByText("Custom time period"));

      expect(getByTestId("datepicker-calendar-container")).toBeInTheDocument();
    });

    it("shows at maximum six dates in the past or future", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={-12}
        />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));

      expect(getByText("Jul 2020")).toBeInTheDocument();
      expect(getByText("Jun 2020")).toBeInTheDocument();
      expect(getByText("May 2020")).toBeInTheDocument();
      expect(getByText("Apr 2020")).toBeInTheDocument();
      expect(getByText("Mar 2020")).toBeInTheDocument();
      expect(getByText("Feb 2020")).toBeInTheDocument();

      expect(queryByText("Jan 2020")).not.toBeInTheDocument();
    });

    it("selects up to the current date if the current month is selected", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={-6}
        />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));

      await userEvent.click(getByText("Jul 2020"));
      expect(getByText("Jul 01, 2020 – Jul 04, 2020")).toBeInTheDocument();
    });

    it("selects the full month if a date in the past or future is selected", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={-6}
        />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));

      await userEvent.click(getByText("May 2020"));
      expect(getByText("May 01, 2020 – May 31, 2020")).toBeInTheDocument();
    });

    it("shows the selected month if an entire month is manually selected", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getAllByText, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={-6}
        />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));
      await userEvent.click(getByText("Custom time period"));
      await userEvent.click(getByTestId("calendar-previous-month"));

      await userEvent.click(getAllByText("1")[0]);
      await userEvent.click(getByText("30"));

      expect(getByText("Jun 01, 2020 – Jun 30, 2020")).toBeInTheDocument();

      await userEvent.click(getByTestId("daterangepicker-input"));
      expect(getByText("Jun 2020").getAttribute("data-selected")).toBeTruthy();
    });

    it("shows months wrapping around to the next or previous year", async () => {
      vi.setSystemTime(new Date("03-04-2020"));
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesCount={-6}
        />
      );

      await userEvent.click(getByTestId("daterangepicker-input"));

      expect(getByText("Mar 2020")).toBeInTheDocument();
      expect(getByText("Feb 2020")).toBeInTheDocument();
      expect(getByText("Jan 2020")).toBeInTheDocument();
      expect(getByText("Dec 2019")).toBeInTheDocument();
      expect(getByText("Nov 2019")).toBeInTheDocument();
      expect(getByText("Oct 2019")).toBeInTheDocument();
    });
  });
});
