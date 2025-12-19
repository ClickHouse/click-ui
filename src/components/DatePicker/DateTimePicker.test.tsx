import { renderCUI } from "@/utils/test-utils";
import { DateTimePicker } from "./DateTimePicker";
import userEvent from "@testing-library/user-event";
import { getPredefinedTimePeriodsForDateTimePicker } from "./utils";
import { fireEvent } from "@testing-library/dom";

describe("DateTimePicker", () => {
  it("opens the calendar on click", async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DateTimePicker onSelectDateRange={handleSelectDate} />
    );

    expect(queryByTestId("datepicker-calendar-container")).not.toBeInTheDocument();

    await userEvent.click(getByTestId("datetimepicker-input"));

    expect(queryByTestId("datepicker-calendar-container")).toBeVisible();
  });

  it("sets the value of the DatePicker input start date to the start date passed in", () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date("07-04-2020");
    const { getByTestId } = renderCUI(
      <DateTimePicker
        startDate={startDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByTestId("datetimepicker-input").textContent).toBe(
      "Jul 04, 00:00 – end date"
    );
  });

  it("sets the value of the DatePicker input end date to the end date passed in", () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date("07-04-2020");
    const endDate = new Date("07-05-2020");
    const { getByTestId } = renderCUI(
      <DateTimePicker
        startDate={startDate}
        endDate={endDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByTestId("datetimepicker-input").textContent).toBe(
      "Jul 04, 12:00 am – Jul 05, 00:00"
    );
  });

  it("does nothing if an end date is passed in but not a start date", () => {
    const handleSelectDate = vi.fn();
    const endDate = new Date("07-05-2020");
    const { getByText } = renderCUI(
      <DateTimePicker
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
        <DateTimePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("datetimepicker-input"));
      await userEvent.click(getByText("4"));
      await userEvent.click(getByText("4"));

      expect(getByText("start date – end date")).toBeInTheDocument();
    });

    it("calls onSelectDateRange when a date range is selected and passes in the selected date range", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("datetimepicker-input"));
      await userEvent.click(getByText("4"));
      await userEvent.click(getByText("10"));

      const [startDate, endDate] = handleSelectDate.mock.lastCall ?? [];

      expect(startDate).toEqual(new Date("2020-07-04 00:00.00"));
      expect(endDate).toEqual(new Date("2020-07-10 00:00.00"));
    });

    it("allows setting a new start date by clicking any date", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("datetimepicker-input"));
      await userEvent.click(getByText("4"));
      await userEvent.click(getByText("10"));

      await userEvent.click(getByText("10"));

      expect(getByTestId("datetimepicker-input").textContent).toBe(
        "Jul 10, 00:00 – end date"
      );
    });

    describe("Selecting a date and a time", () => {
      beforeEach(() => {
        vi.setSystemTime(new Date("07-04-2020 11:30 AM"));
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it("selects the start date with a time of midnight", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId("datetimepicker-input"));
        await userEvent.click(getByText("4"));

        expect(getByTestId("datetimepicker-input").textContent).toBe(
          "Jul 04, 00:00 – end date"
        );
      });

      it("sets the start date's time", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId("datetimepicker-input"));
        await userEvent.click(getByText("4"));

        await userEvent.click(getByText("01:30 am"));

        expect(getByTestId("datetimepicker-input").textContent).toBe(
          "Jul 04, 01:30 am – end date"
        );
      });

      it("selects the start date with a time of midnight", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId("datetimepicker-input"));
        await userEvent.click(getByText("4"));
        await userEvent.click(getByText("01:30 am"));
        await userEvent.click(getByText("11"));

        expect(getByTestId("datetimepicker-input").textContent).toBe(
          "Jul 04, 01:30 am – Jul 11, 00:00"
        );
      });

      it("sets the end date's time", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId("datetimepicker-input"));
        await userEvent.click(getByText("4"));
        await userEvent.click(getByText("01:30 am"));
        await userEvent.click(getByText("11"));
        await userEvent.click(getByText("02:30 pm"));

        expect(getByTestId("datetimepicker-input").textContent).toBe(
          "Jul 04, 01:30 am – Jul 11, 02:30 pm"
        );
      });
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
        <DateTimePicker
          startDate={startDate}
          futureDatesDisabled={true}
          onSelectDateRange={handleSelectDate}
        />
      );

      user.click(getByTestId("datetimepicker-input"));
      user.click(await findByText("22"));

      expect(handleSelectDate).not.toHaveBeenCalled();
    });

    it("allows restricting the max range length", async () => {
      const startDate = new Date("07-04-2020 11:30");
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText } = renderCUI(
        <DateTimePicker
          startDate={startDate}
          onSelectDateRange={handleSelectDate}
          maxRangeLength={15}
        />
      );

      user.click(getByTestId("datetimepicker-input"));
      user.click(await findByText("25"));

      expect(handleSelectDate).not.toHaveBeenCalled();

      fireEvent.click(await findByText("15"));
      expect(handleSelectDate).toHaveBeenCalled();
    });
  });

  describe("predefined times", () => {
    beforeEach(() => {
      vi.setSystemTime(new Date("07-04-2020 11:30 AM"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("doesn't show any preselected times if the predefined times list isn't set", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, queryByTestId } = renderCUI(
        <DateTimePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId("datetimepicker-input"));

      expect(queryByTestId("predefined-times-list")).not.toBeInTheDocument();
    });

    it("allows showing the full calendar", async () => {
      const handleSelectDate = vi.fn();

      const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();
      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateTimePicker
          onSelectDateRange={handleSelectDate}
          predefinedTimesList={predefinedTimesList}
        />
      );

      expect(queryByTestId("datepicker-calendar-container")).not.toBeInTheDocument();

      await userEvent.click(getByTestId("datetimepicker-input"));
      await userEvent.click(getByText("Since a specific date and time"));

      expect(getByTestId("datepicker-calendar-container")).toBeInTheDocument();
    });

    it("can select a time", async () => {
      const handleSelectDate = vi.fn();

      const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();
      const { getByTestId, getByText } = renderCUI(
        <DateTimePicker
          onSelectDateRange={handleSelectDate}
          predefinedTimesList={predefinedTimesList}
        />
      );

      await userEvent.click(getByTestId("datetimepicker-input"));

      await userEvent.click(getByText("Past 15 minutes"));

      expect(getByTestId("datetimepicker-input").textContent).toBe(
        "Jul 04, 11:15 am – Jul 04, 11:30 am"
      );
    });
  });
});
