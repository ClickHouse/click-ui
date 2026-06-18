import { renderCUI } from '@/utils/test-utils';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import userEvent from '@testing-library/user-event';
import { getPredefinedTimePeriodsForDateTimePicker } from './utils';

describe('DateTimeRangePicker', () => {
  it('opens the calendar on click', async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
    );

    expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

    await userEvent.click(getByTestId('datetimepicker-input'));

    expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
  });

  it('sets the value of the DatePicker input start date to the start date passed in', () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date('07-04-2020');
    const { getByTestId } = renderCUI(
      <DateTimeRangePicker
        startDate={startDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByTestId('datetimepicker-input').textContent).toBe(
      'Jul 04, 12:00 pm – end date'
    );
  });

  it('sets the value of the DatePicker input end date to the end date passed in', () => {
    const handleSelectDate = vi.fn();
    const startDate = new Date('07-04-2020');
    const endDate = new Date('07-05-2020');
    const { getByTestId } = renderCUI(
      <DateTimeRangePicker
        startDate={startDate}
        endDate={endDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByTestId('datetimepicker-input').textContent).toBe(
      'Jul 04, 12:00 pm – Jul 05, 12:00 pm'
    );
  });

  it('opens the calendar when responsivePositioning is disabled', async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DateTimeRangePicker
        onSelectDateRange={handleSelectDate}
        responsivePositioning={false}
      />
    );

    expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

    await userEvent.click(getByTestId('datetimepicker-input'));

    expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
  });

  it('handles only passing in end date, but not start date', () => {
    const handleSelectDate = vi.fn();
    const endDate = new Date('07-05-2020');
    const { getByTestId } = renderCUI(
      <DateTimeRangePicker
        endDate={endDate}
        onSelectDateRange={handleSelectDate}
      />
    );

    expect(getByTestId('datetimepicker-input').textContent).toBe(
      'start date – Jul 05, 12:00 pm'
    );
  });

  describe('selecting dates', () => {
    beforeAll(() => {
      vi.setSystemTime(new Date('07-04-2020'));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('calls onSelectDateRange when an end date is selected and passes in the selected date range', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      await userEvent.click(getByText('Start date'));
      await userEvent.click(getByText('4'));

      expect(handleSelectDate).not.toHaveBeenCalled();

      await userEvent.click(getByText('End date'));
      await userEvent.click(getByText('10'));

      const [startDate, endDate] = handleSelectDate.mock.lastCall ?? [];

      expect(startDate).toEqual(new Date('2020-07-04 12:00.00'));
      expect(endDate).toEqual(new Date('2020-07-10 12:00.00'));
    });

    it('omits predefinedDateLabel when selecting an end date via the calendar', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      await userEvent.click(getByText('Start date'));
      await userEvent.click(getByText('4'));

      await userEvent.click(getByText('End date'));
      await userEvent.click(getByText('10'));

      const [, , predefinedDateLabel] = handleSelectDate.mock.lastCall ?? [];

      expect(predefinedDateLabel).toBeUndefined();
    });

    it('omits predefinedDateLabel when selecting a start date via the calendar after end date is set', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
      await userEvent.click(getByText('10'));

      await userEvent.click(getByTestId('tabbed-calendar-trigger-start'));
      await userEvent.click(getByText('4'));

      const [, , predefinedDateLabel] = handleSelectDate.mock.lastCall ?? [];

      expect(predefinedDateLabel).toBeUndefined();
    });

    it('allows setting a new start date by clicking any date', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('Start date'));

      await userEvent.click(getByText('4'));

      await userEvent.click(getByText('10'));

      expect(getByTestId('datetimepicker-input').textContent).toBe(
        'Jul 10, 12:00 pm – end date'
      );
    });

    describe('Selecting a date and a time', () => {
      beforeEach(() => {
        vi.setSystemTime(new Date('07-04-2020 11:30 AM'));
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it('selects the start date with a time of noon', async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('4'));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 04, 12:00 pm – end date'
        );
      });

      it("sets the start date's time", async () => {
        const handleSelectDate = vi.fn();

        const { getByRole, getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('4'));

        await userEvent.click(getByTestId('date-time-picker-time-input'));

        // delete 0-0-:-2-1 (12:00)
        await userEvent.keyboard(
          '{backspace}{backspace}{backspace}{backspace}{backspace}1:30'
        );
        await userEvent.click(getByRole('button', { name: 'am' }));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 04, 01:30 am – end date'
        );
      });

      it('selects the end date with a time of noon', async () => {
        const handleSelectDate = vi.fn();

        const { getByRole, getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('4'));
        await userEvent.click(getByTestId('date-time-picker-time-input'));

        // delete 0-0-:-2-1 (12:00)
        await userEvent.keyboard(
          '{backspace}{backspace}{backspace}{backspace}{backspace}11:37'
        );
        await userEvent.click(getByRole('button', { name: 'pm' }));

        await userEvent.click(getByText('End date'));
        await userEvent.click(getByText('11'));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 04, 11:37 pm – Jul 11, 12:00 pm'
        );
      });

      it("sets the end date's time", async () => {
        const handleSelectDate = vi.fn();

        const { getByRole, getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('4'));
        await userEvent.click(getByTestId('date-time-picker-time-input'));

        // delete 0-0-:-2-1 (12:00)
        await userEvent.keyboard(
          '{backspace}{backspace}{backspace}{backspace}{backspace}2:37'
        );
        await userEvent.click(getByRole('button', { name: 'pm' }));

        await userEvent.click(getByText('End date'));
        await userEvent.click(getByText('11'));
        await userEvent.click(getByTestId('date-time-picker-time-input'));
        await userEvent.keyboard(
          '{backspace}{backspace}{backspace}{backspace}{backspace}8:15'
        );
        await userEvent.click(getByRole('button', { name: 'am' }));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 04, 02:37 pm – Jul 11, 08:15 am'
        );
      });

      it("retains the start date's time if time is set and date is changed", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('4'));
        await userEvent.click(getByTestId('date-time-picker-time-input'));

        // delete 0-0-:-2-1 (12:00)
        await userEvent.keyboard(
          '{backspace}{backspace}{backspace}{backspace}{backspace}2:37'
        );

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 04, 02:37 pm – end date'
        );

        await userEvent.click(getByText('5'));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 05, 02:37 pm – end date'
        );
      });

      it("retains the end date's time if time is set and date is changed", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));

        await userEvent.click(getByText('4'));
        await userEvent.click(getByTestId('date-time-picker-time-input'));

        // delete 0-0-:-2-1 (12:00)
        await userEvent.keyboard(
          '{backspace}{backspace}{backspace}{backspace}{backspace}3:15'
        );

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'start date – Jul 04, 03:15 pm'
        );

        await userEvent.click(getByText('10'));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'start date – Jul 10, 03:15 pm'
        );
      });

      it('can select an end date before a start date is selected', async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));

        await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));

        await userEvent.click(getByText('4'));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'start date – Jul 04, 12:00 pm'
        );
      });

      it("calls handleSelectDate when changing the end date's time if start date is set", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('4'));

        await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
        await userEvent.click(getByText('10'));

        expect(handleSelectDate).toHaveBeenCalledOnce();

        await userEvent.click(getByTestId('date-time-picker-time-input'));

        // delete 0-0-:-2-1 (12:00)
        await userEvent.keyboard('{backspace}1');

        // called when deleting the first digit (time is 12:0), then when typing the digit (time is 12:01)
        expect(handleSelectDate).toHaveBeenCalledTimes(3);
      });

      it("calls handleSelectDate when changing the start date's time if end date is set", async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
        await userEvent.click(getByText('10'));

        await userEvent.click(getByTestId('tabbed-calendar-trigger-start'));
        await userEvent.click(getByText('4'));

        expect(handleSelectDate).toHaveBeenCalledOnce();

        await userEvent.click(getByTestId('date-time-picker-time-input'));

        // delete 0-0-:-2-1 (12:00)
        await userEvent.keyboard('{backspace}{backspace}15');

        // called when deleting the first digit (time is 12:0),
        // the second digit (time is 12:) and invalid, so not called
        // then when typing the digits (time is 12:1), then 12:15
        expect(handleSelectDate).toHaveBeenCalledTimes(4);
      });
    });
  });

  describe('disabling dates', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('07-04-2020 11:30 AM'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('allows disabling selecting dates in the future', async () => {
      const startDate = new Date('07-04-2025');
      const handleSelectDate = vi.fn();

      const { getByTestId, findByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          futureDatesDisabled={true}
          onSelectDateRange={handleSelectDate}
        />
      );

      userEvent.click(getByTestId('datetimepicker-input'));
      userEvent.click(await findByText('22'));

      expect(handleSelectDate).not.toHaveBeenCalled();
    });

    it('allows restricting the max range length', async () => {
      const startDate = new Date('07-04-2020 11:30');
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          onSelectDateRange={handleSelectDate}
          maxRangeLength={15}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('End date'));

      await userEvent.click(getByText('25'));

      expect(handleSelectDate).not.toHaveBeenCalled();

      await userEvent.click(getByText('15'));
      expect(handleSelectDate).toHaveBeenCalled();
    });

    it('allows picking an end date before the start date when an end date is already set', async () => {
      const handleSelectDate = vi.fn();
      const startDate = new Date('07-10-2020 12:00');
      const endDate = new Date('07-15-2020 12:00');

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          endDate={endDate}
          defaultActiveTab="endDate"
          onSelectDateRange={handleSelectDate}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('5'));

      expect(getByTestId('datetimepicker-input').textContent).toBe(
        'Jul 10, 12:00 pm – Jul 05, 12:00 pm'
      );
    });
  });

  describe('setting a default active tab', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('07-04-2020 11:30 AM'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('defaults to start date tab when not provided', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      expect(getByTestId('tabbed-calendar-trigger-start')).toHaveAttribute(
        'data-state',
        'active'
      );
      expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
        'data-state',
        'inactive'
      );
    });

    it('activates the start date tab when defaultActiveTab="startDate"', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId } = renderCUI(
        <DateTimeRangePicker
          defaultActiveTab="startDate"
          onSelectDateRange={handleSelectDate}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      expect(getByTestId('tabbed-calendar-trigger-start')).toHaveAttribute(
        'data-state',
        'active'
      );
      expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
        'data-state',
        'inactive'
      );
    });

    it('activates the end date tab when defaultActiveTab="endDate"', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId } = renderCUI(
        <DateTimeRangePicker
          defaultActiveTab="endDate"
          onSelectDateRange={handleSelectDate}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
        'data-state',
        'active'
      );
      expect(getByTestId('tabbed-calendar-trigger-start')).toHaveAttribute(
        'data-state',
        'inactive'
      );
    });

    it('applies the clicked date to the end date when defaultActiveTab="endDate"', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          defaultActiveTab="endDate"
          onSelectDateRange={handleSelectDate}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('15'));

      expect(getByTestId('datetimepicker-input').textContent).toBe(
        'start date – Jul 15, 12:00 pm'
      );
    });

    it('allows switching tabs after opening with defaultActiveTab="endDate"', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId } = renderCUI(
        <DateTimeRangePicker
          defaultActiveTab="endDate"
          onSelectDateRange={handleSelectDate}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByTestId('tabbed-calendar-trigger-start'));

      expect(getByTestId('tabbed-calendar-trigger-start')).toHaveAttribute(
        'data-state',
        'active'
      );
      expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
        'data-state',
        'inactive'
      );
    });

    it('honors defaultActiveTab when rendered alongside a predefinedTimesList', async () => {
      const handleSelectDate = vi.fn();
      const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          defaultActiveTab="endDate"
          onSelectDateRange={handleSelectDate}
          predefinedTimesList={predefinedTimesList}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('Custom time period'));

      expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
        'data-state',
        'active'
      );
    });

    describe('useEffect syncing defaultActiveTab', () => {
      it('updates the active tab when defaultActiveTab prop changes after mount', async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, rerender } = renderCUI(
          <DateTimeRangePicker
            defaultActiveTab="startDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));

        expect(getByTestId('tabbed-calendar-trigger-start')).toHaveAttribute(
          'data-state',
          'active'
        );

        rerender(
          <DateTimeRangePicker
            defaultActiveTab="endDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
          'data-state',
          'active'
        );
        expect(getByTestId('tabbed-calendar-trigger-start')).toHaveAttribute(
          'data-state',
          'inactive'
        );
      });

      it('preserves user-selected tab when defaultActiveTab is re-rendered with the same value', async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, rerender } = renderCUI(
          <DateTimeRangePicker
            defaultActiveTab="startDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));

        expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
          'data-state',
          'active'
        );

        rerender(
          <DateTimeRangePicker
            defaultActiveTab="startDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
          'data-state',
          'active'
        );
        expect(getByTestId('tabbed-calendar-trigger-start')).toHaveAttribute(
          'data-state',
          'inactive'
        );
      });

      it('keeps the active tab stable when defaultActiveTab prop is set to the same value', async () => {
        const handleSelectDate = vi.fn();

        const { getByTestId, rerender } = renderCUI(
          <DateTimeRangePicker
            defaultActiveTab="endDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));

        expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
          'data-state',
          'active'
        );

        rerender(
          <DateTimeRangePicker
            defaultActiveTab="endDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        expect(getByTestId('tabbed-calendar-trigger-end')).toHaveAttribute(
          'data-state',
          'active'
        );
      });
    });
  });

  describe('closing the date picker on selecting a date range', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('07-04-2020 11:30 AM'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('keeps the picker open by default once both start and end dates are selected', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      await userEvent.click(getByText('4'));
      await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
      await userEvent.click(getByText('10'));

      expect(handleSelectDate).toHaveBeenCalledOnce();
      expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
    });

    it('closes the picker when closeOnDateRangeSelected is true and both dates are selected', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateTimeRangePicker
          closeOnDateRangeSelected
          onSelectDateRange={handleSelectDate}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      await userEvent.click(getByText('4'));
      await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
      await userEvent.click(getByText('10'));

      expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();
    });

    it('closes the picker when closeOnDateRangeSelected is true and start date is selected after end date', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateTimeRangePicker
          closeOnDateRangeSelected
          onSelectDateRange={handleSelectDate}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
      await userEvent.click(getByText('10'));
      await userEvent.click(getByTestId('tabbed-calendar-trigger-start'));
      await userEvent.click(getByText('4'));

      expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();
    });

    it('keeps the picker open when only the start date has been selected', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('4'));

      expect(handleSelectDate).not.toHaveBeenCalled();
      expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
    });

    it('keeps the picker open when only the end date has been selected', async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
      await userEvent.click(getByText('10'));

      expect(handleSelectDate).not.toHaveBeenCalled();
      expect(queryByTestId('datepicker-calendar-container')).toBeVisible();
    });
  });

  describe('not firing onSelectedDate on invalid date ranges', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('07-10-2020 11:30 AM'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe('when shouldFireIfInvalid is true', () => {
      it('fires the callback when a new end date lands before the existing start date', async () => {
        const handleSelectDate = vi.fn();
        const startDate = new Date('07-10-2020 12:00');
        const endDate = new Date('07-15-2020 12:00');

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker
            startDate={startDate}
            endDate={endDate}
            defaultActiveTab="endDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('5'));

        expect(handleSelectDate).toHaveBeenCalledOnce();
      });

      it('fires the callback when a new start date lands after the existing end date', async () => {
        const handleSelectDate = vi.fn();
        const startDate = new Date('07-10-2020 12:00');
        const endDate = new Date('07-15-2020 12:00');

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker
            startDate={startDate}
            endDate={endDate}
            defaultActiveTab="startDate"
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('20'));

        expect(handleSelectDate).toHaveBeenCalledOnce();
      });
    });

    describe('when shouldFireIfInvalid is false', () => {
      it('does not fire the callback when a new end date lands before the existing start date', async () => {
        const handleSelectDate = vi.fn();
        const startDate = new Date('07-10-2020 12:00');
        const endDate = new Date('07-15-2020 12:00');

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker
            startDate={startDate}
            endDate={endDate}
            defaultActiveTab="endDate"
            shouldFireIfInvalid={false}
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('5'));

        expect(handleSelectDate).not.toHaveBeenCalled();
      });

      it('does not fire the callback when a new start date lands after the existing end date', async () => {
        const handleSelectDate = vi.fn();
        const startDate = new Date('07-10-2020 12:00');
        const endDate = new Date('07-15-2020 12:00');

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker
            startDate={startDate}
            endDate={endDate}
            defaultActiveTab="startDate"
            shouldFireIfInvalid={false}
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('20'));

        expect(handleSelectDate).not.toHaveBeenCalled();
      });

      it('reflects the invalid selection in the input even though the callback is suppressed', async () => {
        const handleSelectDate = vi.fn();
        const startDate = new Date('07-10-2020 12:00');
        const endDate = new Date('07-15-2020 12:00');

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker
            startDate={startDate}
            endDate={endDate}
            defaultActiveTab="endDate"
            shouldFireIfInvalid={false}
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('5'));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 10, 12:00 pm – Jul 05, 12:00 pm'
        );
      });

      it('fires the callback once the range returns to a valid state', async () => {
        const handleSelectDate = vi.fn();
        const startDate = new Date('07-10-2020 12:00');
        const endDate = new Date('07-15-2020 12:00');

        const { getByTestId, getByText } = renderCUI(
          <DateTimeRangePicker
            startDate={startDate}
            endDate={endDate}
            defaultActiveTab="endDate"
            shouldFireIfInvalid={false}
            onSelectDateRange={handleSelectDate}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input'));
        await userEvent.click(getByText('5'));
        expect(handleSelectDate).not.toHaveBeenCalled();

        await userEvent.click(getByText('20'));
        expect(handleSelectDate).toHaveBeenCalledOnce();
      });
    });
  });

  describe('showing a validation message', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('07-10-2020 11:30 AM'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('displays the message when an out-of-order range is provided via props', async () => {
      const startDate = new Date('07-15-2020 12:00');
      const endDate = new Date('07-10-2020 12:00');

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          endDate={endDate}
          onSelectDateRange={vi.fn()}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      expect(getByText('End date and time must be after start')).toBeVisible();
    });

    it('shows no message when the range is in order', async () => {
      const startDate = new Date('07-10-2020 12:00');
      const endDate = new Date('07-15-2020 12:00');

      const { getByTestId, queryByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          endDate={endDate}
          onSelectDateRange={vi.fn()}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      expect(
        queryByText('End date and time must be after start')
      ).not.toBeInTheDocument();
    });

    it('omits the message when only one endpoint is set', async () => {
      const { getByTestId, queryByText } = renderCUI(
        <DateTimeRangePicker
          startDate={new Date('07-15-2020 12:00')}
          onSelectDateRange={vi.fn()}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      expect(
        queryByText('End date and time must be after start')
      ).not.toBeInTheDocument();
    });

    it('appears after a user selection creates an out-of-order range', async () => {
      const startDate = new Date('07-10-2020 12:00');
      const endDate = new Date('07-15-2020 12:00');

      const { getByTestId, getByText, queryByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          endDate={endDate}
          defaultActiveTab="endDate"
          onSelectDateRange={vi.fn()}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      expect(
        queryByText('End date and time must be after start')
      ).not.toBeInTheDocument();

      await userEvent.click(getByText('5'));

      expect(getByText('End date and time must be after start')).toBeVisible();
    });

    it('disappears once the user corrects the range', async () => {
      const startDate = new Date('07-15-2020 12:00');
      const endDate = new Date('07-10-2020 12:00');

      const { getByTestId, getByText, queryByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          endDate={endDate}
          defaultActiveTab="endDate"
          onSelectDateRange={vi.fn()}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      expect(getByText('End date and time must be after start')).toBeVisible();

      await userEvent.click(getByText('25'));

      expect(
        queryByText('End date and time must be after start')
      ).not.toBeInTheDocument();
    });

    it('remains visible after switching between the start and end tabs', async () => {
      const startDate = new Date('07-15-2020 12:00');
      const endDate = new Date('07-10-2020 12:00');

      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          startDate={startDate}
          endDate={endDate}
          defaultActiveTab="startDate"
          onSelectDateRange={vi.fn()}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      expect(getByText('End date and time must be after start')).toBeVisible();

      await userEvent.click(getByTestId('tabbed-calendar-trigger-end'));
      expect(getByText('End date and time must be after start')).toBeVisible();
    });
  });

  describe('predefined times', () => {
    beforeEach(() => {
      vi.setSystemTime(new Date('07-04-2020 11:30 AM'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("doesn't show any preselected times if the predefined times list isn't set", async () => {
      const handleSelectDate = vi.fn();

      const { getByTestId, queryByTestId } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={handleSelectDate} />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      expect(queryByTestId('predefined-times-list')).not.toBeInTheDocument();
    });

    it('allows showing the full calendar', async () => {
      const handleSelectDate = vi.fn();

      const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();
      const { getByTestId, getByText, queryByTestId } = renderCUI(
        <DateTimeRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedTimesList={predefinedTimesList}
        />
      );

      expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('Custom time period'));

      expect(getByTestId('datepicker-calendar-container')).toBeInTheDocument();
    });

    it('can select a time', async () => {
      const handleSelectDate = vi.fn();

      const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();
      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedTimesList={predefinedTimesList}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      await userEvent.click(getByText('Past 15 minutes'));

      expect(getByTestId('datetimepicker-input').textContent).toBe(
        'Jul 04, 11:15 am – Jul 04, 11:30 am'
      );
    });

    it('passes the predefined label as predefinedDateLabel when a predefined time is selected', async () => {
      const handleSelectDate = vi.fn();

      const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();
      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedTimesList={predefinedTimesList}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('Past 15 minutes'));

      const [startDate, endDate, predefinedDateLabel] =
        handleSelectDate.mock.lastCall ?? [];

      expect(startDate).toEqual(new Date('2020-07-04 11:15.00'));
      expect(endDate).toEqual(new Date('2020-07-04 11:30.00'));
      expect(predefinedDateLabel).toBe('Past 15 minutes');
    });

    it('passes the matching label as predefinedDateLabel for any predefined time selection', async () => {
      const handleSelectDate = vi.fn();

      const predefinedTimesList = getPredefinedTimePeriodsForDateTimePicker();
      const { getByTestId, getByText } = renderCUI(
        <DateTimeRangePicker
          onSelectDateRange={handleSelectDate}
          predefinedTimesList={predefinedTimesList}
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));
      await userEvent.click(getByText('Past hour'));

      const [, , predefinedDateLabel] = handleSelectDate.mock.lastCall ?? [];

      expect(predefinedDateLabel).toBe('Past hour');
    });
  });

  describe('when configured for the UTC timezone', () => {
    it('renders both endpoints from their UTC date and time fields', () => {
      const startDate = new Date('2026-04-30T08:00:00Z');
      const endDate = new Date('2026-04-30T14:30:00Z');

      const { getByTestId } = renderCUI(
        <DateTimeRangePicker
          endDate={endDate}
          onSelectDateRange={vi.fn()}
          startDate={startDate}
          timezone="UTC"
        />
      );

      expect(getByTestId('datetimepicker-input').textContent).toBe(
        'Apr 30, 08:00 am – Apr 30, 02:30 pm'
      );
    });

    it('populates the time input with the UTC hour and minute of the active side', async () => {
      const startDate = new Date('2026-04-30T08:00:00Z');
      const endDate = new Date('2026-04-30T14:30:00Z');

      const { getAllByTestId, getByTestId } = renderCUI(
        <DateTimeRangePicker
          endDate={endDate}
          onSelectDateRange={vi.fn()}
          startDate={startDate}
          timezone="UTC"
        />
      );

      await userEvent.click(getByTestId('datetimepicker-input'));

      const timeInputs = getAllByTestId('date-time-picker-time-input');
      expect((timeInputs[0] as HTMLInputElement).value).toBe('08:00');
    });
  });

  describe('clearing the selected date range', () => {
    it('hides the clear control until it is explicitly enabled', () => {
      const { queryByTestId } = renderCUI(
        <DateTimeRangePicker onSelectDateRange={vi.fn()} />
      );

      expect(queryByTestId('datetimepicker-input-clear')).not.toBeInTheDocument();
    });

    it('offers a clear control when enabled', () => {
      const { getByTestId } = renderCUI(
        <DateTimeRangePicker
          hasClearButton
          onSelectDateRange={vi.fn()}
        />
      );

      expect(getByTestId('datetimepicker-input-clear')).toBeInTheDocument();
    });

    it('withholds the clear control while the picker is disabled', () => {
      const { queryByTestId } = renderCUI(
        <DateTimeRangePicker
          disabled
          hasClearButton
          onSelectDateRange={vi.fn()}
        />
      );

      expect(queryByTestId('datetimepicker-input-clear')).not.toBeInTheDocument();
    });

    describe('when the clear control is clicked', () => {
      it('removes both the start and end dates', async () => {
        const startDate = new Date('07-04-2020');
        const endDate = new Date('07-05-2020');
        const { getByTestId } = renderCUI(
          <DateTimeRangePicker
            hasClearButton
            startDate={startDate}
            endDate={endDate}
            onSelectDateRange={vi.fn()}
          />
        );

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'Jul 04, 12:00 pm – Jul 05, 12:00 pm'
        );

        await userEvent.click(getByTestId('datetimepicker-input-clear'));

        expect(getByTestId('datetimepicker-input').textContent).toBe(
          'start date – end date'
        );
      });

      it('leaves the calendar closed', async () => {
        const { getByTestId, queryByTestId } = renderCUI(
          <DateTimeRangePicker
            hasClearButton
            startDate={new Date('07-04-2020')}
            onSelectDateRange={vi.fn()}
          />
        );

        await userEvent.click(getByTestId('datetimepicker-input-clear'));

        expect(queryByTestId('datepicker-calendar-container')).not.toBeInTheDocument();
      });
    });
  });
});
