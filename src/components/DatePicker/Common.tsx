import { InputElement, InputStartContent, InputWrapper } from '@/components/InputWrapper';
import {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Icon, IconName } from '@/components/Icon';
import { Container } from '@/components/Container';
import { useCalendar, UseCalendarOptions } from '@h6s/calendar';
import { IconButton, IconButtonSize } from '@/components/IconButton';
import { Text } from '@/components/Text';
import { cn } from '@/lib/cva';
import styles from './Common.module.css';
import {
  dateRangeIsValid,
  formatDateHeader,
  formatSelectedDate,
  formatSelectedDateTime,
  formatSelectedDateTimeWithSeconds,
  formatWeekday,
  shiftToTimezone,
  Timezone,
} from './utils';
import { getMonthNames, DAYS, MONTHS, YEARS, DAYS_IN_WEEK } from '@/utils/date';
import { Dropdown } from '@/components/Dropdown';

const viewGridMonths = {
  columns: 4,
  rows: 3,
} as const;

const viewGridYears = {
  columns: 3,
  rows: 3,
} as const;

const totalYears = viewGridYears.columns * viewGridYears.rows;
const yearsOffset = Math.floor(totalYears / 2);

interface HighlightedInputWrapperProps extends Omit<
  ComponentProps<typeof InputWrapper>,
  'error'
> {
  isActive: boolean;
  error?: boolean;
  fillWidth?: boolean;
}

// The resting default border and the error border are identical to what the
// InputWrapper base / `.wrapper_error` already render, so only the width and the
// active border are overridden here (see Common.module.css).
const HighlightedInputWrapper = ({
  isActive,
  error,
  fillWidth,
  disabled,
  id,
  children,
  className,
}: HighlightedInputWrapperProps) => (
  <InputWrapper
    error={error}
    disabled={disabled}
    id={id}
    className={cn(
      styles['highlighted-input-wrapper'],
      fillWidth && styles['highlighted-input-wrapper_fill-width'],
      isActive && !error && styles['highlighted-input-wrapper_active'],
      className
    )}
  >
    {children}
  </InputWrapper>
);

interface DatePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  partialMonth?: number;
  partialYear?: number;
  placeholder?: string;
  selectedDate?: Date;
  timezone?: Timezone;
}

const formatPartialDate = (
  timezone: Timezone,
  selectedDate?: Date,
  partialYear?: number,
  partialMonth?: number
): string => {
  if (typeof partialYear === 'number' && typeof partialMonth === 'number') {
    const date =
      timezone === 'UTC'
        ? new Date(Date.UTC(partialYear, partialMonth, 1))
        : new Date(partialYear, partialMonth, 1);
    return formatDateHeader(timezone, date);
  }

  if (typeof partialYear === 'number') {
    return String(partialYear);
  }

  if (selectedDate instanceof Date) {
    return formatSelectedDate(timezone, selectedDate);
  }

  return '';
};

export const DatePickerInput = ({
  isActive,
  disabled,
  id,
  partialMonth,
  partialYear,
  placeholder,
  selectedDate,
  timezone = 'system',
}: DatePickerInputProps) => {
  const defaultId = useId();
  const formattedSelectedDate = formatPartialDate(
    timezone,
    selectedDate,
    partialYear,
    partialMonth
  );

  return (
    <HighlightedInputWrapper
      isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <InputElement
        $hasStartContent
        data-testid="datepicker-input"
        placeholder={placeholder}
        readOnly
        value={formattedSelectedDate}
      />
    </HighlightedInputWrapper>
  );
};

interface DateRangePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  placeholder?: string;
  selectedEndDate?: Date;
  selectedStartDate?: Date;
  timezone?: Timezone;
}

export const DateRangePickerInput = ({
  isActive,
  disabled,
  id,
  placeholder,
  selectedEndDate,
  selectedStartDate,
  timezone = 'system',
}: DateRangePickerInputProps) => {
  const defaultId = useId();

  let formattedValue = (
    <Text
      color="muted"
      component="span"
    >
      {placeholder ?? ''}
    </Text>
  );
  if (selectedStartDate) {
    if (selectedEndDate) {
      formattedValue = (
        <span>
          {formatSelectedDate(timezone, selectedStartDate)} –{' '}
          {formatSelectedDate(timezone, selectedEndDate)}
        </span>
      );
    } else {
      formattedValue = (
        <span>
          {formatSelectedDate(timezone, selectedStartDate)}{' '}
          <Text
            color="muted"
            component="span"
          >
            – end date
          </Text>
        </span>
      );
    }
  }

  return (
    <HighlightedInputWrapper
      isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <InputElement
        $hasStartContent
        as="div"
        data-testid="daterangepicker-input"
      >
        {formattedValue}
      </InputElement>
    </HighlightedInputWrapper>
  );
};

interface DateTimeRangePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  placeholder?: string;
  selectedEndDate?: Date;
  selectedStartDate?: Date;
  shouldShowSeconds?: boolean;
  timezone?: Timezone;
}

export const DateTimeRangePickerInput = ({
  isActive,
  disabled,
  id,
  placeholder,
  selectedEndDate,
  selectedStartDate,
  shouldShowSeconds,
  timezone = 'system',
}: DateTimeRangePickerInputProps) => {
  const defaultId = useId();

  const formatDateTime = useCallback(
    (date: Date) => {
      if (shouldShowSeconds) {
        return formatSelectedDateTimeWithSeconds(timezone, date);
      }

      return formatSelectedDateTime(timezone, date);
    },
    [shouldShowSeconds, timezone]
  );

  let formattedValue = (
    <Text
      color="muted"
      component="span"
    >
      {placeholder ?? ''}
    </Text>
  );

  if (selectedStartDate) {
    if (selectedEndDate) {
      formattedValue = (
        <span>
          {formatDateTime(selectedStartDate).replace('AM', 'am').replace('PM', 'pm')} –{' '}
          {formatDateTime(selectedEndDate).replace('AM', 'am').replace('PM', 'pm')}
        </span>
      );
    } else {
      formattedValue = (
        <span>
          {formatDateTime(selectedStartDate).replace('AM', 'am').replace('PM', 'pm')}{' '}
          <Text
            color="muted"
            component="span"
          >
            – end date
          </Text>
        </span>
      );
    }
  } else if (selectedEndDate) {
    formattedValue = (
      <span>
        <Text
          color="muted"
          component="span"
        >
          start date –{' '}
        </Text>
        {formatDateTime(selectedEndDate).replace('AM', 'am').replace('PM', 'pm')}
      </span>
    );
  }

  const startDateIsAfterEndDate =
    selectedStartDate &&
    selectedEndDate &&
    !dateRangeIsValid({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });

  return (
    <HighlightedInputWrapper
      isActive={isActive}
      fillWidth
      disabled={disabled}
      error={startDateIsAfterEndDate}
      id={id ?? defaultId}
    >
      <InputStartContent>
        <Icon name="calendar" />
      </InputStartContent>
      <InputElement
        $hasStartContent
        as="div"
        data-testid="datetimepicker-input"
      >
        {formattedValue}
      </InputElement>
    </HighlightedInputWrapper>
  );
};

interface DateTableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  isCurrentMonth?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  isPresent?: boolean;
}

export const DateTableCell = forwardRef<HTMLTableCellElement, DateTableCellProps>(
  (
    {
      isCurrentMonth,
      isDisabled,
      isSelected,
      isPresent,
      className,
      children,
      onClick,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      role,
      tabIndex,
      'aria-label': ariaLabel,
    },
    ref
  ) => (
    <td
      ref={ref}
      className={cn(
        styles['date-table-cell'],
        (!isCurrentMonth || isDisabled) && styles['date-table-cell_muted'],
        isDisabled && styles['date-table-cell_disabled'],
        isSelected && styles['date-table-cell_selected'],
        isPresent && !isSelected && styles['date-table-cell_present'],
        className
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      {children}
    </td>
  )
);
DateTableCell.displayName = 'DateTableCell';

export const StyledDropdownItem = ({
  className,
  children,
  onClick,
  'data-testid': dataTestId,
}: ComponentProps<typeof Dropdown.Item> & { 'data-testid'?: string }) => (
  <Dropdown.Item
    onClick={onClick}
    data-testid={dataTestId}
    className={cn(styles['styled-dropdown-item'], className)}
  >
    {children}
  </Dropdown.Item>
);

export type Body = ReturnType<typeof useCalendar>['body'];

interface CalendarRendererProps {
  calendarOptions?: UseCalendarOptions;
  children: (body: Body) => ReactNode;
  allowYearMonthSelection?: boolean;
  onYearSelect?: (year: number) => void;
  onMonthSelect?: (year: number, month: number) => void;
  selectedDate?: Date;
  timezone?: Timezone;
  className?: string;
  'data-testid'?: string;
}

const monthAbbreviations = getMonthNames('short');

type DateViewOption = 'days' | 'months' | 'years';

const PickerNavControl = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof IconButton> & { 'data-testid'?: string }
>(
  (
    {
      className,
      icon,
      onClick,
      onKeyDown,
      size,
      type,
      tabIndex,
      'data-testid': dataTestId,
    },
    ref
  ) => (
    <IconButton
      ref={ref}
      icon={icon}
      onClick={onClick}
      onKeyDown={onKeyDown}
      size={size}
      type={type}
      tabIndex={tabIndex}
      data-testid={dataTestId}
      className={cn(styles['picker-nav-control'], className)}
    />
  )
);
PickerNavControl.displayName = 'PickerNavControl';

const EmptyDateSelectNav = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof IconButton> & { 'data-testid'?: string }
>(
  (
    { className, icon, onKeyDown, size, type, tabIndex, 'data-testid': dataTestId },
    ref
  ) => (
    <PickerNavControl
      ref={ref}
      icon={icon}
      onKeyDown={onKeyDown}
      size={size}
      type={type}
      tabIndex={tabIndex}
      data-testid={dataTestId}
      className={cn(styles['empty-date-select-nav'], className)}
    />
  )
);
EmptyDateSelectNav.displayName = 'EmptyDateSelectNav';

const DateSelectNav = ({
  id,
  icon,
  onClick,
  onKeyDown,
  view,
  size = 'sm',
  tabIndex,
  buttonRef,
}: {
  id: string;
  icon: Extract<IconName, 'chevron-left' | 'chevron-right'>;
  onClick: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
  view: DateViewOption;
  size?: IconButtonSize;
  tabIndex?: number;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}) => {
  if (view === MONTHS) {
    return (
      <EmptyDateSelectNav
        ref={buttonRef}
        data-testid={id}
        icon={icon}
        size={size}
        type="ghost"
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
      />
    );
  }
  return (
    <PickerNavControl
      ref={buttonRef}
      data-testid={id}
      icon={icon}
      onClick={onClick}
      onKeyDown={onKeyDown}
      size={size}
      type="ghost"
      tabIndex={tabIndex}
    />
  );
};

export const CalendarRenderer = ({
  calendarOptions = {},
  children,
  allowYearMonthSelection = true,
  onYearSelect,
  onMonthSelect,
  selectedDate,
  timezone = 'system',
  className,
  ...props
}: CalendarRendererProps) => {
  // useCalendar reads dates as local; shiftToTimezone is a no-op in local mode.
  const shiftedCalendarOptions: UseCalendarOptions =
    calendarOptions.defaultDate instanceof Date
      ? {
          ...calendarOptions,
          defaultDate: shiftToTimezone(calendarOptions.defaultDate, timezone),
        }
      : calendarOptions;
  const { body, headers, month, navigation, year } = useCalendar({
    defaultWeekStart: 1,
    ...shiftedCalendarOptions,
  });

  const [view, setView] = useState<DateViewOption>(DAYS);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [yearOffset, setYearOffset] = useState(0);
  const [focusedMonthIndex, setFocusedMonthIndex] = useState(month);
  const [focusedYearIndex, setFocusedYearIndex] = useState(yearsOffset);

  const monthGridRef = useRef<Array<HTMLButtonElement | null>>([]);
  const yearGridRef = useRef<Array<HTMLButtonElement | null>>([]);
  const headerNavRefs = useRef<Array<HTMLButtonElement | null>>([null, null, null]);

  useEffect(() => {
    if (view === YEARS) {
      yearGridRef.current[focusedYearIndex]?.focus();
    } else if (view === MONTHS) {
      monthGridRef.current[focusedMonthIndex]?.focus();
    }
  }, [view, focusedYearIndex, focusedMonthIndex]);

  const onNextClick = useCallback(() => {
    if (view === YEARS) {
      setYearOffset(prev => prev + totalYears);
    } else {
      navigation.toNext();
    }
  }, [navigation, view]);

  const onPreviousClick = useCallback(() => {
    if (view === YEARS) {
      setYearOffset(prev => prev - totalYears);
      return;
    }

    navigation.toPrev();
  }, [navigation, view]);

  const onTitleClick = useCallback(() => {
    if (view !== DAYS) {
      return;
    }

    setView(YEARS);
  }, [view]);

  const onHeaderNavKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    const validRefs = headerNavRefs.current.filter(ref => {
      if (!ref) {
        return false;
      }
      return (
        ref.offsetParent !== null ||
        (!ref.hasAttribute('hidden') && ref.getAttribute('aria-hidden') !== 'true')
      );
    });

    const currentValidIndex = validRefs.indexOf(e.currentTarget);
    if (currentValidIndex === -1 || validRefs.length <= 1) {
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextValidIndex = (currentValidIndex + 1) % validRefs.length;
      validRefs[nextValidIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevValidIndex =
        (currentValidIndex - 1 + validRefs.length) % validRefs.length;
      validRefs[prevValidIndex]?.focus();
    }
  }, []);

  const onYearSelection = useCallback(
    (yearValue: number) => {
      setSelectedYear(yearValue);
      setView(MONTHS);
      onYearSelect?.(yearValue);
    },
    [onYearSelect]
  );

  const onMonthSelection = useCallback(
    (monthIndex: number) => {
      const finalYear = typeof selectedYear === 'number' ? selectedYear : year;
      const newDate = new Date(finalYear, monthIndex, 1);

      navigation.setDate(newDate);
      onMonthSelect?.(finalYear, monthIndex);

      setView(DAYS);
      setSelectedYear(null);
      setYearOffset(0);
    },
    [selectedYear, year, navigation, onMonthSelect]
  );

  const onMonthGridKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const columns = viewGridMonths.columns;
      const totalItems = 12;
      let newIndex = index;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          newIndex = (index + 1) % totalItems;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = (index - 1 + totalItems) % totalItems;
          break;
        case 'ArrowDown':
          event.preventDefault();
          newIndex = (index + columns) % totalItems;
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex = (index - columns + totalItems) % totalItems;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onMonthSelection(index);
          return;
        default:
          return;
      }

      setFocusedMonthIndex(newIndex);
      monthGridRef.current[newIndex]?.focus();
    },
    [onMonthSelection]
  );

  const onYearGridKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number, yearValue: number) => {
      const columns = viewGridYears.columns;
      const totalItems = totalYears;
      let newIndex = index;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          newIndex = (index + 1) % totalItems;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = (index - 1 + totalItems) % totalItems;
          break;
        case 'ArrowDown':
          event.preventDefault();
          newIndex = (index + columns) % totalItems;
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex = (index - columns + totalItems) % totalItems;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onYearSelection(yearValue);
          return;
        default:
          return;
      }

      setFocusedYearIndex(newIndex);
      yearGridRef.current[newIndex]?.focus();
    },
    [onYearSelection]
  );

  const headerDate = new Date();
  headerDate.setMonth(month);
  headerDate.setFullYear(year);

  const getHeaderTitle = (view: DateViewOption) => {
    if (view === MONTHS) {
      return 'Month';
    }

    if (view === YEARS) {
      return 'Year';
    }

    // headerDate already has the right month/year in its local fields.
    return formatDateHeader('system', headerDate);
  };

  const renderMonthsGrid = () => {
    const today = shiftToTimezone(new Date(), timezone);
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
    const shiftedSelected = selectedDate
      ? shiftToTimezone(selectedDate, timezone)
      : undefined;
    const selectedMonth = shiftedSelected?.getMonth();
    const selectedYear = shiftedSelected?.getFullYear();

    return (
      <div
        className={cn(styles['grid-container'], styles['months-grid'])}
        data-testid="months-grid"
        role="grid"
        aria-label="Select month"
      >
        {monthAbbreviations.map((month, index) => {
          const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
            onMonthGridKeyDown(event, index);
          };

          const handleClick = () => {
            onMonthSelection(index);
          };

          const ref = (element: HTMLButtonElement) => {
            monthGridRef.current[index] = element;
          };

          const isActive = Boolean(
            selectedDate && index === selectedMonth && year === selectedYear
          );
          const isPresent = index === thisMonth && year === thisYear;

          return (
            <button
              key={month}
              type="button"
              ref={ref}
              className={cn(
                styles['grid-cell'],
                isActive && styles['grid-cell_active'],
                isPresent && !isActive && styles['grid-cell_present']
              )}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              data-testid={`month-cell-${index}`}
              tabIndex={index === focusedMonthIndex ? 0 : -1}
              aria-label={month}
            >
              {month}
            </button>
          );
        })}
      </div>
    );
  };

  const renderYearsGrid = () => {
    const years: Array<number> = [];
    const baseYear = year + yearOffset;
    const thisYear = shiftToTimezone(new Date(), timezone).getFullYear();
    const selectedYear = selectedDate
      ? shiftToTimezone(selectedDate, timezone).getFullYear()
      : undefined;

    for (let i = -yearsOffset; i <= yearsOffset; i++) {
      years.push(baseYear + i);
    }

    return (
      <div
        className={cn(styles['grid-container'], styles['years-grid'])}
        data-testid="years-grid"
        role="grid"
        aria-label="Select year"
      >
        {years.map((currentYear, index) => {
          const ref = (element: HTMLButtonElement) => {
            yearGridRef.current[index] = element;
          };

          const handleClick = () => {
            onYearSelection(currentYear);
          };

          const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
            onYearGridKeyDown(event, index, currentYear);
          };

          const isActive = Boolean(selectedDate && currentYear === selectedYear);
          const isPresent = currentYear === thisYear;

          return (
            <button
              key={currentYear}
              type="button"
              ref={ref}
              className={cn(
                styles['grid-cell'],
                isActive && styles['grid-cell_active'],
                isPresent && !isActive && styles['grid-cell_present']
              )}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              data-testid={`year-cell-${currentYear}`}
              tabIndex={index === focusedYearIndex ? 0 : -1}
              aria-label={String(currentYear)}
            >
              {currentYear}
            </button>
          );
        })}
      </div>
    );
  };

  const renderTableContent = () => {
    if (view === MONTHS) {
      return (
        <tbody>
          <tr>
            <td colSpan={DAYS_IN_WEEK}>{renderMonthsGrid()}</td>
          </tr>
        </tbody>
      );
    }

    if (view === YEARS) {
      return (
        <tbody>
          <tr>
            <td colSpan={DAYS_IN_WEEK}>{renderYearsGrid()}</td>
          </tr>
        </tbody>
      );
    }

    return (
      <>
        <thead>
          <tr>
            {headers.weekdays.map(({ key, value: date }) => {
              return (
                <th
                  key={key}
                  className={styles['date-table-header']}
                >
                  {formatWeekday('system', date)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children(body)}</tbody>
      </>
    );
  };

  return (
    <Container
      data-testid="datepicker-calendar-container"
      isResponsive={false}
      fillWidth={false}
      orientation="vertical"
      padding="sm"
      {...props}
      className={cn(styles['date-picker-container'], className)}
    >
      <Container
        isResponsive={false}
        justifyContent="space-between"
        orientation="horizontal"
      >
        <DateSelectNav
          id="calendar-previous-month"
          icon="chevron-left"
          onClick={onPreviousClick}
          onKeyDown={onHeaderNavKeyDown}
          view={view}
          tabIndex={view === MONTHS ? -1 : 0}
          buttonRef={el => {
            if (view !== MONTHS) {
              headerNavRefs.current[0] = el;
            } else {
              headerNavRefs.current[0] = null;
            }
          }}
        />
        {view === DAYS && allowYearMonthSelection ? (
          <button
            type="button"
            className={styles['clickable-title']}
            ref={el => {
              headerNavRefs.current[1] = el as HTMLButtonElement;
            }}
            onClick={onTitleClick}
            onKeyDown={onHeaderNavKeyDown}
            data-testid="calendar-title"
            tabIndex={0}
          >
            {getHeaderTitle(view)}
          </button>
        ) : (
          <h2 className={styles['unselectable-title']}>{getHeaderTitle(view)}</h2>
        )}
        <DateSelectNav
          id="calendar-next-month"
          icon="chevron-right"
          onClick={onNextClick}
          onKeyDown={onHeaderNavKeyDown}
          view={view}
          tabIndex={view === MONTHS ? -1 : 0}
          buttonRef={el => {
            if (view !== MONTHS) {
              headerNavRefs.current[2] = el;
            } else {
              headerNavRefs.current[2] = null;
            }
          }}
        />
      </Container>
      <table className={styles['date-table']}>{renderTableContent()}</table>
    </Container>
  );
};
