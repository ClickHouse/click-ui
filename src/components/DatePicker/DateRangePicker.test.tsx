import { renderCUI } from '@/utils/test-utils';
import { DateRangePicker } from './DateRangePicker';
import userEvent from '@testing-library/user-event';
import { getPredefinedMonthsForDateRangePicker } from './utils';
import { fireEvent } from '@testing-library/dom';

describe('DateRangePicker', () => {
  it('opens the calendar on click', async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DateRangePicker onSelectDateRange={handleSelectDate} />
    );

    expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

    await userEvent.click(getByTestId('daterangepicker-input'));

    expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
  });

  it('sets the value of the DatePicker input start date to the start date passed in', () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date('07-04-2020');
    const { getByText } = renderCUI(
      <DateRangePicker
        startDate={startDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByText('Jul 04, 2020')).toBeInTheDocument();
    expect(getByText('– end date')).toBeInTheDocument();
  });

  it('sets the value of the DatePicker input end date to the end date passed in', () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date('07-04-2020');
    const endDate = new Date('07-05-2020');
    const { getByText } = renderCUI(
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByText('Jul 04, 2020 – Jul 05, 2020')).toBeInTheDocument();
  });

  it('does nothing if an end date is passed in but not a start date', () => {
    const handleSelectDate = vi.fn();
    const endDate = new Date('07-05-2020');
    const { getByText } = renderCUI(
      <DateRangePicker
        endDate={endDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByText('start date – end date')).toBeInTheDocument();
  });

  it('opens the calendar when responsivePositioning is disabled', async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DateRangePicker
        onSelectDateRange={handleSelectDate}
        responsivePositioning={false}
      />
    );

    expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

    await userEvent.click(getByTestId('daterangepicker-input'));

    expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
  });

  describe('selecting dates', () => {
    beforeAll(() => {
      vi.setSystemTime(new Date('07-04-2020'));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('allows clearing the start date by clicking the start date', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));
      await userEvent.click(getByText('4'));
      await userEvent.click(getByText('4'));

      expect(getByText('start date – end date')).toBeInTheDocument();
    });

    it('calls onSelectDateRange when a date range is selected and passes in the selected date range', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));
      await userEvent.click(getByText('4'));
      await userEvent.click(getByText('10'));

      const [startDate, endDate] = handleSelectDate.mock.lastCall ?? [];

      expect(startDate).toEqual(new Date('2020-07-04 00:00.00'));
      expect(endDate).toEqual(new Date('2020-07-10 00:00.00'));
    });

    it('allows setting a new start date by clicking any date', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));
      await userEvent.click(getByText('4'));
      await userEvent.click(getByText('10'));

      expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

      await userEvent.click(getByTestId('daterangepicker-input'));
      await userEvent.click(getByText('10'));

      expect(getByText('Jul 10, 2020')).toBeInTheDocument();
      expect(getByText('– end date')).toBeInTheDocument();
    });
  });

  describe('disabling dates', () => {
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('07-04-2020'));
    });

    afterAll(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it('allows disabling selecting dates in the future', async () => {
      const startDate = new Date('07-04-2020');
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText } = renderCUI(
        <DateRangePicker
          startDate={startDate}
          futureDatesDisabled={true}
          onSelectDateRange={handleSelectDate}
        />
      );

      user.click(getByTestId('daterangepicker-input'));
      user.click(await findByText('22'));

      expect(handleSelectDate).not.toHaveBeenCalled();
    });

    it('allows restricting the max range length', async () => {
      const startDate = new Date('07-04-2020');
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText } = renderCUI(
        <DateRangePicker
          startDate={startDate}
          onSelectDateRange={handleSelectDate}
          maxRangeLength={15}
        />
      );

      user.click(getByTestId('daterangepicker-input'));
      user.click(await findByText('25'));

      expect(handleSelectDate).not.toHaveBeenCalled();

      fireEvent.click(await findByText('15'));
      expect(handleSelectDate).toHaveBeenCalled();
    });

    it('disables selecting dates not in allowOnlyDatesList', async () => {
      const allowOnlyDatesList = [new Date('07-04-2020'), new Date('07-06-2020')];
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText, getByText } = renderCUI(
        <DateRangePicker
          allowOnlyDatesList={allowOnlyDatesList}
          onSelectDateRange={handleSelectDate}
        />
      );

      user.click(getByTestId('daterangepicker-input'));
      // Jul 5 is not in the allow list
      user.click(await findByText('5'));

      // A disabled date must not be selectable as the start date
      expect(getByText('start date – end date')).toBeInTheDocument();
      expect(handleSelectDate).not.toHaveBeenCalled();
    });

    it('allows selecting an end date that is in allowOnlyDatesList', async () => {
      const startDate = new Date('07-04-2020');
      const allowOnlyDatesList = [new Date('07-04-2020'), new Date('07-06-2020')];
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText } = renderCUI(
        <DateRangePicker
          allowOnlyDatesList={allowOnlyDatesList}
          startDate={startDate}
          onSelectDateRange={handleSelectDate}
        />
      );

      user.click(getByTestId('daterangepicker-input'));
      // Jul 6 is in the allow list
      fireEvent.click(await findByText('6'));

      const [selectedStart, selectedEnd] = handleSelectDate.mock.lastCall ?? [];
      expect(selectedStart).toEqual(new Date('2020-07-04 00:00.00'));
      expect(selectedEnd).toEqual(new Date('2020-07-06 00:00.00'));
    });

    it('treats an empty allowOnlyDatesList as no restriction', async () => {
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText, getByText } = renderCUI(
        <DateRangePicker
          allowOnlyDatesList={[]}
          onSelectDateRange={handleSelectDate}
        />
      );

      user.click(getByTestId('daterangepicker-input'));
      fireEvent.click(await findByText('10'));

      // With no restriction, Jul 10 is selectable as the start date
      expect(getByText('Jul 10, 2020')).toBeInTheDocument();
    });

    it('disables future dates in allowOnlyDatesList when futureDatesDisabled', async () => {
      // System time is July 4, 2020
      const allowOnlyDatesList = [new Date('07-04-2020'), new Date('07-06-2020')];
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText, getByText } = renderCUI(
        <DateRangePicker
          allowOnlyDatesList={allowOnlyDatesList}
          futureDatesDisabled
          onSelectDateRange={handleSelectDate}
        />
      );

      user.click(getByTestId('daterangepicker-input'));
      // Jul 6 is in the allow list but is a future date
      user.click(await findByText('6'));

      expect(getByText('start date – end date')).toBeInTheDocument();
      expect(handleSelectDate).not.toHaveBeenCalled();
    });
  });

  describe('when a range is already selected and maxRangeLength is set', () => {
    it('allows starting a new range from a date earlier than the current start, even if outside the max range window', async () => {
      const startDate = new Date('07-25-2020');
      const endDate = new Date('07-30-2020');
      const handleSelectDate = vi.fn();

      const { getByTestId, findByText } = renderCUI(
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onSelectDateRange={handleSelectDate}
          maxRangeLength={5}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));
      // Jul 11 is 14 days before startDate (outside maxRange=5) and earlier than startDate.
      await userEvent.click(await findByText('11'));

      // Click resets the range; input should reflect the new start with no end.
      const inputText = getByTestId('daterangepicker-input').textContent ?? '';
      expect(inputText).toContain('Jul 11, 2020');
      expect(inputText).toContain('end date');
    });

    it('still blocks dates after the start that fall outside the max range window', async () => {
      const startDate = new Date('07-04-2020');
      const handleSelectDate = vi.fn();

      const { getByTestId, findByText } = renderCUI(
        <DateRangePicker
          startDate={startDate}
          onSelectDateRange={handleSelectDate}
          maxRangeLength={5}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));
      // Jul 25 is 21 days after startDate, outside maxRange=5.
      await userEvent.click(await findByText('25'));

      expect(handleSelectDate).not.toHaveBeenCalled();
    });
  });

  describe('predefined date ranges', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('07-04-2020'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("doesn't show any preselected dates if the predefined dates list isn't set", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, queryByTestId } = renderCUI(
        <DateRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      expect(queryByTestId('predefined-dates-list')).not.toBeInTheDocument();
    });

    it("shows dates in the past if getPredefinedMonthsForDateRangePicker's value is negative", async () => {
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);
      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      expect(getByText('Jul 01, 2020 – Jul 04, 2020')).toBeInTheDocument();
      expect(getByText('Jun 2020')).toBeInTheDocument();
      expect(getByText('May 2020')).toBeInTheDocument();
      expect(getByText('Apr 2020')).toBeInTheDocument();
      expect(getByText('Mar 2020')).toBeInTheDocument();
      expect(getByText('Feb 2020')).toBeInTheDocument();
    });

    it("doesn't show a range of a single day when using the past six months and its the first of the month", async () => {
      vi.setSystemTime(new Date('07-01-2020'));

      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);
      const { getByTestId, getByText, queryByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      expect(queryByText('Jul')).not.toBeInTheDocument();
      expect(getByText('Jun 2020')).toBeInTheDocument();
      expect(getByText('May 2020')).toBeInTheDocument();
      expect(getByText('Apr 2020')).toBeInTheDocument();
      expect(getByText('Mar 2020')).toBeInTheDocument();
      expect(getByText('Feb 2020')).toBeInTheDocument();
    });

    it("shows dates in the future if getPredefinedMonthsForDateRangePicker's value is positive", async () => {
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(6);
      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      expect(getByText('Jul 2020')).toBeInTheDocument();
      expect(getByText('Aug 2020')).toBeInTheDocument();
      expect(getByText('Sep 2020')).toBeInTheDocument();
      expect(getByText('Oct 2020')).toBeInTheDocument();
      expect(getByText('Nov 2020')).toBeInTheDocument();
      expect(getByText('Dec 2020')).toBeInTheDocument();
    });

    it("shows the current current month if it's the first day of month if getPredefinedMonthsForDateRangePicker's value is positive", async () => {
      vi.setSystemTime(new Date('07-01-2020'));
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(6);
      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      expect(getByText('Jul 2020')).toBeInTheDocument();
      expect(getByText('Aug 2020')).toBeInTheDocument();
      expect(getByText('Sep 2020')).toBeInTheDocument();
      expect(getByText('Oct 2020')).toBeInTheDocument();
      expect(getByText('Nov 2020')).toBeInTheDocument();
      expect(getByText('Dec 2020')).toBeInTheDocument();
    });

    it('allows showing the full calendar', async () => {
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(6);
      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

      await userEvent.click(getByTestId('daterangepicker-input'));
      await userEvent.click(getByText('Custom time period'));

      expect(getByTestId('datepicker-calendar-container')).toBeInTheDocument();
    });

    it('selects up to the current date if the current month is selected', async () => {
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);
      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      await userEvent.click(getByTestId('Jul 01, 2020 – Jul 04, 2020'));
      expect(getByText('Jul 01, 2020 – Jul 04, 2020')).toBeInTheDocument();
    });

    it('selects the full month if a date in the past or future is selected', async () => {
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);
      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      await userEvent.click(getByText('May 2020'));
      expect(getByText('May 01, 2020 – May 31, 2020')).toBeInTheDocument();
    });

    it('shows the selected month if an entire month is manually selected', async () => {
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);
      const { getByTestId, getAllByText, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));
      await userEvent.click(getByText('Custom time period'));
      await userEvent.click(getByTestId('calendar-previous-month'));

      await userEvent.click(getAllByText('1')[0]);
      await userEvent.click(getByText('30'));

      expect(getByText('Jun 01, 2020 – Jun 30, 2020')).toBeInTheDocument();

      await userEvent.click(getByTestId('daterangepicker-input'));
      expect(getByText('Jun 2020').getAttribute('data-selected')).toBeTruthy();
    });

    it('shows months wrapping around to the next or previous year', async () => {
      vi.setSystemTime(new Date('03-04-2020'));
      const handleSelectDate = vi.fn();

      const predefinedDatesList = getPredefinedMonthsForDateRangePicker(-6);
      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedDatesList={predefinedDatesList}
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));

      expect(getByText('Mar 01, 2020 – Mar 04, 2020')).toBeInTheDocument();
      expect(getByText('Feb 2020')).toBeInTheDocument();
      expect(getByText('Jan 2020')).toBeInTheDocument();
      expect(getByText('Dec 2019')).toBeInTheDocument();
      expect(getByText('Nov 2019')).toBeInTheDocument();
      expect(getByText('Oct 2019')).toBeInTheDocument();
    });
  });

  describe('when configured for the UTC timezone', () => {
    it('renders both endpoints from their UTC fields', () => {
      const startDate = new Date('2026-04-30T01:00:00Z');
      const endDate = new Date('2026-05-30T01:00:00Z');

      const { getByText } = renderCUI(
        <DateRangePicker
          endDate={endDate}
          onSelectDateRange={vi.fn()}
          startDate={startDate}
          timezone="UTC"
        />
      );

      expect(getByText('Apr 30, 2026 – May 30, 2026')).toBeInTheDocument();
    });

    it('emits midnight UTC for the new endpoint when the user picks a calendar day', async () => {
      const handleSelectDateRange = vi.fn();
      const startDate = new Date('2026-04-15T12:00:00Z');

      const { getByTestId, getByText } = renderCUI(
        <DateRangePicker
          onSelectDateRange={handleSelectDateRange}
          startDate={startDate}
          timezone="UTC"
        />
      );

      await userEvent.click(getByTestId('daterangepicker-input'));
      await userEvent.click(getByText('22'));

      const [emittedStart, emittedEnd] = handleSelectDateRange.mock.lastCall as [
        Date,
        Date,
      ];
      expect(emittedStart.toISOString()).toBe('2026-04-15T12:00:00.000Z');
      expect(emittedEnd.toISOString()).toBe('2026-04-22T00:00:00.000Z');
    });
  });

  describe('clearing the selected date range', () => {
    it('hides the clear control until it is explicitly enabled', () => {
      const { queryByTestId } = renderCUI(
        <DateRangePicker onSelectDateRange={vi.fn()} />
      );

      expect(queryByTestId('daterangepicker-input-clear')).not.toBeInTheDocument();
    });

    it('offers a clear control when enabled', () => {
      const { getByTestId } = renderCUI(
        <DateRangePicker
          hasClearButton
          onSelectDateRange={vi.fn()}
        />
      );

      expect(getByTestId('daterangepicker-input-clear')).toBeInTheDocument();
    });

    it('withholds the clear control while the picker is disabled', () => {
      const { queryByTestId } = renderCUI(
        <DateRangePicker
          disabled
          hasClearButton
          onSelectDateRange={vi.fn()}
        />
      );

      expect(queryByTestId('daterangepicker-input-clear')).not.toBeInTheDocument();
    });

    describe('when the clear control is clicked', () => {
      it('removes both the start and end dates', async () => {
        const startDate = new Date('07-04-2020');
        const endDate = new Date('07-05-2020');
        const { getByTestId, getByText, queryByText } = renderCUI(
          <DateRangePicker
            hasClearButton
            startDate={startDate}
            endDate={endDate}
            onSelectDateRange={vi.fn()}
          />
        );

        expect(getByText('Jul 04, 2020 – Jul 05, 2020')).toBeInTheDocument();

        await userEvent.click(getByTestId('daterangepicker-input-clear'));

        expect(queryByText('Jul 04, 2020 – Jul 05, 2020')).not.toBeInTheDocument();
        expect(getByText('start date – end date')).toBeInTheDocument();
      });

      it('leaves the calendar closed', async () => {
        const { getByTestId, queryByTestId } = renderCUI(
          <DateRangePicker
            hasClearButton
            startDate={new Date('07-04-2020')}
            onSelectDateRange={vi.fn()}
          />
        );

        await userEvent.click(getByTestId('daterangepicker-input-clear'));

        expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();
      });
    });
  });
});
