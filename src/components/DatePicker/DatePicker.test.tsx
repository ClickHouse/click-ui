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

  it('opens the calendar and focuses the selected date when pressing Enter', async () => {
    const handleSelectDate = vi.fn();
    const date = new Date('01-12-2026');

    const { getByTestId, queryByTestId, getByRole } = renderCUI(
      <DatePicker
        date={date}
        onSelectDate={handleSelectDate}
      />
    );

    expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

    getByTestId('datepicker-input').focus();
    await userEvent.keyboard('{Enter}');

    expect(queryByTestId('datepicker-calendar-container')).toBeVisible();

    const dayCell = getByRole('gridcell', { name: date.toDateString() });
    expect(document.activeElement).toBe(dayCell);
  });

  it('opens the calendar and focuses the selected date when pressing Space', async () => {
    const handleSelectDate = vi.fn();
    const date = new Date('02-11-2026');

    const { getByTestId, queryByTestId, getByRole } = renderCUI(
      <DatePicker
        date={date}
        onSelectDate={handleSelectDate}
      />
    );

    expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

    getByTestId('datepicker-input').focus();
    await userEvent.keyboard(' ');

    expect(queryByTestId('datepicker-calendar-container')).toBeVisible();

    const dayCell = getByRole('gridcell', { name: date.toDateString() });
    expect(document.activeElement).toBe(dayCell);
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

    describe('the year grid', () => {
      it('cells are focusable and respond to Enter key', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId, getByDisplayValue } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));
        await userEvent.click(getByTestId('calendar-title'));

        const yearCell = getByTestId('year-cell-2020');
        expect(yearCell).toBeInTheDocument();

        expect(yearCell.getAttribute('tabindex')).not.toBe('-1');

        yearCell.focus();
        expect(document.activeElement).toBe(yearCell);

        await userEvent.keyboard('{Enter}');

        expect(getByTestId('months-grid')).toBeInTheDocument();
        expect(getByDisplayValue('2020')).toBeInTheDocument();
      });

      it('supports arrow key navigation', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));
        await userEvent.click(getByTestId('calendar-title'));

        const yearCell2020 = getByTestId('year-cell-2020');
        yearCell2020.focus();

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(getByTestId('year-cell-2021'));

        await userEvent.keyboard('{ArrowLeft}');
        expect(document.activeElement).toBe(getByTestId('year-cell-2020'));

        await userEvent.keyboard('{ArrowDown}');
        expect(document.activeElement).toBe(getByTestId('year-cell-2023'));
      });

      it('supports horizontal arrow key navigation between chevron buttons', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));
        await userEvent.click(getByTestId('calendar-title'));

        expect(getByTestId('years-grid')).toBeInTheDocument();

        const prevButton = getByTestId('calendar-previous-month');
        const nextButton = getByTestId('calendar-next-month');

        prevButton.focus();
        expect(document.activeElement).toBe(prevButton);

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(nextButton);

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(prevButton);

        await userEvent.keyboard('{ArrowLeft}');
        expect(document.activeElement).toBe(nextButton);
      });
    });

    describe('the month grid', () => {
      it('cells are focusable and respond to Space key', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId, getByDisplayValue } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));
        await userEvent.click(getByTestId('calendar-title'));
        await userEvent.click(getByTestId('year-cell-2020'));

        const monthCell = getByTestId('month-cell-0');
        expect(monthCell).toBeInTheDocument();

        monthCell.focus();
        expect(document.activeElement).toBe(monthCell);

        await userEvent.keyboard(' ');

        expect(getByDisplayValue('Jan 2020')).toBeInTheDocument();
      });

      it('supports arrow key navigation', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));
        await userEvent.click(getByTestId('calendar-title'));
        await userEvent.click(getByTestId('year-cell-2020'));

        const janCell = getByTestId('month-cell-0');
        janCell.focus();

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(getByTestId('month-cell-1'));

        await userEvent.keyboard('{ArrowDown}');
        expect(document.activeElement).toBe(getByTestId('month-cell-5'));

        await userEvent.keyboard('{ArrowUp}');
        expect(document.activeElement).toBe(getByTestId('month-cell-1'));
      });

      it('supports horizontal arrow key navigation between chevron buttons', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));
        await userEvent.click(getByTestId('calendar-title'));
        await userEvent.click(getByTestId('year-cell-2020'));

        expect(getByTestId('months-grid')).toBeInTheDocument();

        const prevButton = getByTestId('calendar-previous-month');
        const nextButton = getByTestId('calendar-next-month');

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();

        const firstMonthCell = getByTestId('month-cell-0');
        firstMonthCell.focus();
        expect(document.activeElement).toBe(firstMonthCell);
      });
    });

    it('allows accessing the calendar title by keyboard', async () => {
      const onSelectDate = vi.fn();
      const date = new Date('07-04-2020');

      const { getByTestId } = renderCUI(
        <DatePicker
          date={date}
          onSelectDate={onSelectDate}
        />
      );

      await userEvent.click(getByTestId('datepicker-input'));

      const title = getByTestId('calendar-title');
      title.focus();
      expect(document.activeElement).toBe(title);

      await userEvent.keyboard('{Enter}');
      expect(getByTestId('years-grid')).toBeInTheDocument();
    });

    describe('the day grid', () => {
      it('supports keyboard navigation and selects with Enter', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId, getByText } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));

        const day4 = getByText('4');
        day4.focus();
        expect(document.activeElement).toBe(day4);

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(getByText('5'));

        await userEvent.keyboard('{Enter}');

        const selectedDate = onSelectDate.mock.lastCall?.[0];
        expect(selectedDate.getDate()).toBe(5);
      });

      it('supports horizontal arrow key navigation between chevron buttons and title', async () => {
        const onSelectDate = vi.fn();
        const date = new Date('07-04-2020');

        const { getByTestId } = renderCUI(
          <DatePicker
            date={date}
            onSelectDate={onSelectDate}
          />
        );

        await userEvent.click(getByTestId('datepicker-input'));

        const prevButton = getByTestId('calendar-previous-month');
        const title = getByTestId('calendar-title');
        const nextButton = getByTestId('calendar-next-month');

        prevButton.focus();
        expect(document.activeElement).toBe(prevButton);

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(title);

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(nextButton);

        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(prevButton);

        await userEvent.keyboard('{ArrowLeft}');
        expect(document.activeElement).toBe(nextButton);

        await userEvent.keyboard('{ArrowLeft}');
        expect(document.activeElement).toBe(title);

        await userEvent.keyboard('{ArrowLeft}');
        expect(document.activeElement).toBe(prevButton);
      });
    });
  });
});
