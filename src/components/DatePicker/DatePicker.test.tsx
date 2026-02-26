import { renderCUI } from '@/utils/test-utils';
import { DatePicker } from '@/components/DatePicker';
import userEvent from '@testing-library/user-event';

describe('DatePicker', () => {
  it('opens the calendar on click', async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DatePicker onSelectDate={handleSelectDate} />
    );

    expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

    await userEvent.click(getByTestId('datepicker-input'));

    expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
  });

  it('sets the value of the DatePicker input to the date passed in', () => {
    const handleSelectDate = vi.fn();
    const date = new Date('07-04-2020');
    const { getByDisplayValue } = renderCUI(
      <DatePicker
        date={date}
        onSelectDate={handleSelectDate}
      />
    );

    expect(getByDisplayValue('Jul 04, 2020')).toBeInTheDocument();
  });

  it('calls onSelectDate when a date is selected and passes in the selected date', async () => {
    const handleSelectDate = vi.fn();
    const date = new Date('07-04-2020');

    const { getByTestId, getByText } = renderCUI(
      <DatePicker
        date={date}
        onSelectDate={handleSelectDate}
      />
    );

    await userEvent.click(getByTestId('datepicker-input'));
    await userEvent.click(getByText('22'));

    const selectedDate = handleSelectDate.mock.lastCall?.[0];
    expect(selectedDate).toEqual(new Date('2020-07-22 00:00.00'));
  });

  describe('disabling dates', () => {
    // this test was throwing an error if `vi.useFakeTimers` was called outside
    // of beforeAll, so it needed to be put in here
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2020, 6, 5));
    });

    afterAll(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it('allows disabling selecting dates in the future', async () => {
      const date = new Date('07-04-2020');
      const handleSelectDate = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const { getByTestId, findByText } = renderCUI(
        <DatePicker
          date={date}
          futureDatesDisabled={true}
          onSelectDate={handleSelectDate}
        />
      );

      user.click(getByTestId('datepicker-input'));
      user.click(await findByText('22'));

      expect(handleSelectDate).not.toHaveBeenCalled();
    });
  });

  describe('two phased date selection', () => {
    it('shows progressive input updates during year and month selection', async () => {
      const onSelectDate = vi.fn();
      const date = new Date('07-04-2020');

      const { getByTestId, getByDisplayValue } = renderCUI(
        <DatePicker
          date={date}
          onSelectDate={onSelectDate}
        />
      );

      expect(getByDisplayValue('Jul 04, 2020')).toBeInTheDocument();

      await userEvent.click(getByTestId('datepicker-input'));
      await userEvent.click(getByTestId('calendar-title'));

      await userEvent.click(getByTestId('year-cell-2020'));

      expect(getByDisplayValue('2020')).toBeInTheDocument();

      await userEvent.click(getByTestId('month-cell-0'));

      expect(getByDisplayValue('Jan 2020')).toBeInTheDocument();
    });

    it('reverts input to selected date when picker closes without completing selection', async () => {
      const onSelectDate = vi.fn();
      const date = new Date('07-04-2020');

      const { getByTestId, getByDisplayValue } = renderCUI(
        <DatePicker
          date={date}
          onSelectDate={onSelectDate}
        />
      );

      expect(getByDisplayValue('Jul 04, 2020')).toBeInTheDocument();

      await userEvent.click(getByTestId('datepicker-input'));
      await userEvent.click(getByTestId('calendar-title'));

      await userEvent.click(getByTestId('year-cell-2020'));
      expect(getByDisplayValue('2020')).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');

      expect(getByDisplayValue('Jul 04, 2020')).toBeInTheDocument();
    });

    it('selects 4th August 1986 using year and month selection', async () => {
      const onSelectDate = vi.fn();
      const date = new Date('07-04-2020');

      const { getByTestId, getByText } = renderCUI(
        <DatePicker
          date={date}
          onSelectDate={onSelectDate}
        />
      );

      await userEvent.click(getByTestId('datepicker-input'));
      await userEvent.click(getByTestId('calendar-title'));

      expect(getByTestId('years-grid')).toBeInTheDocument();

      await userEvent.click(getByTestId('calendar-previous-month'));
      await userEvent.click(getByTestId('calendar-previous-month'));
      await userEvent.click(getByTestId('calendar-previous-month'));
      await userEvent.click(getByTestId('calendar-previous-month'));

      await userEvent.click(getByTestId('year-cell-1986'));

      expect(getByTestId('months-grid')).toBeInTheDocument();

      await userEvent.click(getByTestId('month-cell-7'));

      await userEvent.click(getByText('4'));

      const selectedDate = onSelectDate.mock.lastCall?.[0];
      expect(selectedDate).toEqual(new Date('1986-08-04 00:00.00'));
    });

    it('selects 18th February 2026 using year and month selection', async () => {
      const onSelectDate = vi.fn();
      const date = new Date('07-04-2020');

      const { getByTestId, getByText } = renderCUI(
        <DatePicker
          date={date}
          onSelectDate={onSelectDate}
        />
      );

      await userEvent.click(getByTestId('datepicker-input'));
      await userEvent.click(getByTestId('calendar-title'));

      expect(getByTestId('years-grid')).toBeInTheDocument();

      await userEvent.click(getByTestId('calendar-next-month'));

      await userEvent.click(getByTestId('year-cell-2026'));

      expect(getByTestId('months-grid')).toBeInTheDocument();

      await userEvent.click(getByTestId('month-cell-1'));

      await userEvent.click(getByText('18'));

      const selectedDate = onSelectDate.mock.lastCall?.[0];
      expect(selectedDate).toEqual(new Date('2026-02-18 00:00.00'));
    });

    it('selects 28th December 2032 using year and month selection', async () => {
      const onSelectDate = vi.fn();
      const date = new Date('07-04-2020');

      const { getByTestId, getByText } = renderCUI(
        <DatePicker
          date={date}
          onSelectDate={onSelectDate}
        />
      );

      await userEvent.click(getByTestId('datepicker-input'));
      await userEvent.click(getByTestId('calendar-title'));

      expect(getByTestId('years-grid')).toBeInTheDocument();

      await userEvent.click(getByTestId('calendar-next-month'));

      await userEvent.click(getByTestId('year-cell-2032'));

      expect(getByTestId('months-grid')).toBeInTheDocument();

      await userEvent.click(getByTestId('month-cell-11'));

      await userEvent.click(getByText('28'));

      const selectedDate = onSelectDate.mock.lastCall?.[0];
      expect(selectedDate).toEqual(new Date('2032-12-28 00:00.00'));
    });
  });
});
