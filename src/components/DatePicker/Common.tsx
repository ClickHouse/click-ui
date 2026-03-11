import { styled } from 'styled-components';
import { InputElement, InputStartContent, InputWrapper } from '@/components/InputWrapper';
import {
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
import {
  headerDateFormatter,
  selectedDateFormatter,
  selectedDateTimeFormatter,
  selectedDateTimeFormatterWithSeconds,
  weekdayFormatter,
} from './utils';
import { getMonthNames, DAYS, MONTHS, YEARS, DAYS_IN_WEEK } from '@/utils/date';
import { Dropdown } from '@/components/Dropdown';

const explicitWidth = '250px';
const TXT_ON_MONTH_SELECT = 'Month';
const TXT_ON_YEAR_SELECT = 'Year';

const VIEW_GRID_MONTHS = {
  columns: 4,
  rows: 3,
} as const;

const VIEW_GRID_YEARS = {
  columns: 3,
  rows: 3,
} as const;

const VIEW_TOTAL_YEARS = VIEW_GRID_YEARS.columns * VIEW_GRID_YEARS.rows;
const VIEW_NAVIGATION_OFFSET_YEARS = Math.floor(VIEW_TOTAL_YEARS / 2);

const HighlightedInputWrapper = styled(InputWrapper)<{
  $isActive: boolean;
  $width?: string;
}>`
  ${({ $isActive, $width, theme }) => {
    return `border: ${theme.click.datePicker.dateOption.stroke} solid ${
      $isActive
        ? theme.click.datePicker.dateOption.color.stroke.active
        : theme.click.field.color.stroke.default
    };
    width: ${$width ? $width : explicitWidth};
    ${$width && `min-width: ${explicitWidth};`}
    `;
  }}
}`;

interface DatePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  partialMonth?: number;
  partialYear?: number;
  placeholder?: string;
  selectedDate?: Date;
}

const formatPartialDate = (
  selectedDate?: Date,
  partialYear?: number,
  partialMonth?: number
): string => {
  if (typeof partialYear === 'number' && typeof partialMonth === 'number') {
    const date = new Date(partialYear, partialMonth, 1);
    return headerDateFormatter.format(date);
  }
  if (typeof partialYear === 'number') {
    return String(partialYear);
  }
  if (selectedDate instanceof Date) {
    return selectedDateFormatter.format(selectedDate);
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
}: DatePickerInputProps) => {
  const defaultId = useId();
  const formattedSelectedDate = formatPartialDate(
    selectedDate,
    partialYear,
    partialMonth
  );

  return (
    <HighlightedInputWrapper
      $isActive={isActive}
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
}

export const DateRangePickerInput = ({
  isActive,
  disabled,
  id,
  placeholder,
  selectedEndDate,
  selectedStartDate,
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
          {selectedDateFormatter.format(selectedStartDate)} –{' '}
          {selectedDateFormatter.format(selectedEndDate)}
        </span>
      );
    } else {
      formattedValue = (
        <span>
          {selectedDateFormatter.format(selectedStartDate)}{' '}
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
      $isActive={isActive}
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
}

export const DateTimeRangePickerInput = ({
  isActive,
  disabled,
  id,
  placeholder,
  selectedEndDate,
  selectedStartDate,
  shouldShowSeconds,
}: DateTimeRangePickerInputProps) => {
  const defaultId = useId();

  const dateTimeFormatter = shouldShowSeconds
    ? selectedDateTimeFormatterWithSeconds
    : selectedDateTimeFormatter;

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
          {dateTimeFormatter
            .format(selectedStartDate)
            .replace('AM', 'am')
            .replace('PM', 'pm')}{' '}
          –{' '}
          {dateTimeFormatter
            .format(selectedEndDate)
            .replace('AM', 'am')
            .replace('PM', 'pm')}
        </span>
      );
    } else {
      formattedValue = (
        <span>
          {dateTimeFormatter
            .format(selectedStartDate)
            .replace('AM', 'am')
            .replace('PM', 'pm')}{' '}
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
        {dateTimeFormatter
          .format(selectedEndDate)
          .replace('AM', 'am')
          .replace('PM', 'pm')}
      </span>
    );
  }

  return (
    <HighlightedInputWrapper
      $isActive={isActive}
      disabled={disabled}
      id={id ?? defaultId}
      $width="max-content"
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

const DatePickerContainer = styled(Container)`
  background: ${({ theme }) =>
    theme.click.datePicker.dateOption.color.background.default};
`;

const ClickableTitle = styled.button`
  ${({ theme }) => `
    color: ${theme.click.datePicker.color.title.default};
    font: ${theme.click.datePicker.typography.title.default};
    border: 1px solid transparent;
  `}

  background: transparent;
  cursor: pointer;
  user-select: none;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.click.datePicker.dateOption.radii.default};
  outline: none;

  &:hover {
    background: ${({ theme }) =>
      theme.click.datePicker.dateOption.color.background.hover};
  }

  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.click.datePicker.dateOption.color.stroke.hover};
  }
`;

const UnselectableTitle = styled.h2`
  ${({ theme }) => `
    color: ${theme.click.datePicker.color.title.default};
    font: ${theme.click.datePicker.typography.title.default};
  `}

  margin: 0;
  padding: 0;
  user-select: none;
`;

const GridContainer = styled.div`
  display: grid;
  padding: 0.25rem 0 0;

  ${({ theme }) => `
    gap: calc(${theme.click.datePicker.space.gap} * 2);
  `}
`;

const MonthsGrid = styled(GridContainer)`
  grid-template-columns: repeat(${VIEW_GRID_MONTHS.columns}, 1fr);
  grid-template-rows: repeat(${VIEW_GRID_MONTHS.rows}, 1fr);
`;

const YearsGrid = styled(GridContainer)`
  grid-template-columns: repeat(${VIEW_GRID_YEARS.columns}, 1fr);
  grid-template-rows: repeat(${VIEW_GRID_YEARS.rows}, 1fr);
`;

const GridCell = styled.button<{ $isActive?: boolean; $isPresent?: boolean }>`
  ${({ theme }) => `
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.default};
    border-radius: ${theme.click.datePicker.dateOption.radii.default};
    font: ${theme.click.datePicker.dateOption.typography.label.default};
    color: ${theme.click.datePicker.dateOption.color.label.default};
    background: ${theme.click.datePicker.dateOption.color.background.default};
  `}

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background: ${theme.click.datePicker.dateOption.color.background.active};
    color: ${theme.click.datePicker.dateOption.color.label.active};
  `}

  ${({ $isActive, $isPresent, theme }) =>
    $isPresent &&
    !$isActive &&
    `background: ${theme.click.datePicker.dateOption.color.background.range};`}

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  cursor: pointer;
  text-align: center;
  min-height: 26px;

  ${({ theme }) => `
    &:hover {
      border-color: ${theme.click.datePicker.dateOption.color.stroke.hover};
    }

    &:focus {
      outline: none;
      border-color: ${theme.click.datePicker.dateOption.color.stroke.hover};
    }

    &:focus-visible {
      outline: none;
      border-color: ${theme.click.datePicker.dateOption.color.stroke.hover};
    }
  `}
`;

const DateTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  font: ${({ theme }) => theme.typography.styles.product.text.normal.md};
  table-layout: fixed;
  user-select: none;
  width: ${explicitWidth};

  thead tr {
    height: ${({ theme }) => theme.click.datePicker.dateOption.size.height};
  }

  tbody {
    cursor: pointer;
  }

  td,
  th {
    padding: 4px;
  }
`;

const DateTableHeader = styled.th`
  ${({ theme }) => `
    color: ${theme.click.datePicker.color.daytitle.default};
    font: ${theme.click.datePicker.typography.daytitle.default};
  `}

  width: 14%;
`;

export const DateTableCell = styled.td<{
  $isCurrentMonth?: boolean;
  $isDisabled?: boolean;
  $isSelected?: boolean;
  $isPresent?: boolean;
}>`
  ${({ theme }) => `
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.default};
    border-radius: ${theme.click.datePicker.dateOption.radii.default};
    font: ${theme.click.datePicker.dateOption.typography.label.default};
  `}

  ${({ $isCurrentMonth, $isDisabled, theme }) =>
    (!$isCurrentMonth || $isDisabled) &&
    `
    color: ${theme.click.datePicker.dateOption.color.label.disabled};
    font: ${theme.click.datePicker.dateOption.typography.label.disabled};
  `}

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
      background: ${theme.click.datePicker.dateOption.color.background.active} !important;
      color: ${theme.click.datePicker.dateOption.color.label.active};
    `}

  ${({ $isSelected, $isPresent, theme }) =>
    $isPresent &&
    !$isSelected &&
    `background: ${theme.click.datePicker.dateOption.color.background.range};`}

  text-align: center;
  outline: none;

  &:hover {
    ${({ $isDisabled, $isPresent, theme }) =>
      `border: ${theme.click.datePicker.dateOption.stroke} solid ${
        $isDisabled
          ? theme.click.datePicker.dateOption.color.stroke.disabled
          : theme.click.datePicker.dateOption.color.stroke.hover
      };
      background: ${$isPresent ? theme.click.datePicker.dateOption.color.background.range : ''};
      border-radius: ${theme.click.datePicker.dateOption.radii.default};`};
  }

  &:focus {
    ${({ $isDisabled, theme }) =>
      `outline: none;
      border: ${theme.click.datePicker.dateOption.stroke} solid ${
        $isDisabled
          ? theme.click.datePicker.dateOption.color.stroke.disabled
          : theme.click.datePicker.dateOption.color.stroke.hover
      };`};
  }

  &:focus-visible {
    ${({ $isDisabled, theme }) =>
      `outline: none;
      border: ${theme.click.datePicker.dateOption.stroke} solid ${
        $isDisabled
          ? theme.click.datePicker.dateOption.color.stroke.disabled
          : theme.click.datePicker.dateOption.color.stroke.hover
      };`};
  }
`;

export const StyledDropdownItem = styled(Dropdown.Item)`
  box-sizing: content-box;
  min-height: 24px;
`;

export type Body = ReturnType<typeof useCalendar>['body'];

interface CalendarRendererProps {
  calendarOptions?: UseCalendarOptions;
  children: (body: Body) => ReactNode;
  allowYearMonthSelection?: boolean;
  onYearSelect?: (year: number) => void;
  onMonthSelect?: (year: number, month: number) => void;
  selectedDate?: Date;
}

const monthAbbreviations = getMonthNames('short');

type DateViewOption = 'days' | 'months' | 'years';

const PickerNavControl = styled(IconButton)`
  && {
    &:focus,
    &:focus-visible {
      outline: none;
      border: ${({ theme }) => theme.click.datePicker.dateOption.stroke} solid
        ${({ theme }) => theme.click.datePicker.dateOption.color.stroke.hover};
    }
  }
`;

const EmptyDateSelectNav = styled(PickerNavControl)`
  visibility: hidden;
  pointer-events: none;
`;

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
  ...props
}: CalendarRendererProps) => {
  const { body, headers, month, navigation, year } = useCalendar({
    defaultWeekStart: 1,
    ...calendarOptions,
  });

  const [view, setView] = useState<DateViewOption>(DAYS);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [yearOffset, setYearOffset] = useState(0);
  const [focusedMonthIndex, setFocusedMonthIndex] = useState(month);
  const [focusedYearIndex, setFocusedYearIndex] = useState(VIEW_NAVIGATION_OFFSET_YEARS);

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
      setYearOffset(prev => prev + VIEW_TOTAL_YEARS);
    } else {
      navigation.toNext();
    }
  }, [navigation, view]);

  const onPreviousClick = useCallback(() => {
    if (view === YEARS) {
      setYearOffset(prev => prev - VIEW_TOTAL_YEARS);
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
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const columns = VIEW_GRID_MONTHS.columns;
      const totalItems = 12;
      let newIndex = index;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (index + 1) % totalItems;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = (index - 1 + totalItems) % totalItems;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (index + columns) % totalItems;
          break;
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (index - columns + totalItems) % totalItems;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
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
    (e: KeyboardEvent<HTMLButtonElement>, index: number, yearValue: number) => {
      const columns = VIEW_GRID_YEARS.columns;
      const totalItems = VIEW_TOTAL_YEARS;
      let newIndex = index;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (index + 1) % totalItems;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = (index - 1 + totalItems) % totalItems;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (index + columns) % totalItems;
          break;
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (index - columns + totalItems) % totalItems;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
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
      return TXT_ON_MONTH_SELECT;
    }

    if (view === YEARS) {
      return TXT_ON_YEAR_SELECT;
    }

    return headerDateFormatter.format(headerDate);
  };

  const renderMonthsGrid = () => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const selectedMonth = selectedDate?.getMonth();
    const selectedYear = selectedDate?.getFullYear();

    return (
      <MonthsGrid
        data-testid="months-grid"
        role="grid"
        aria-label="Select month"
      >
        {monthAbbreviations.map((abbr, index) => (
          <GridCell
            key={abbr}
            type="button"
            ref={el => {
              monthGridRef.current[index] = el;
            }}
            $isActive={selectedDate && index === selectedMonth && year === selectedYear}
            $isPresent={index === todayMonth && year === todayYear}
            onClick={() => onMonthSelection(index)}
            onKeyDown={e => onMonthGridKeyDown(e, index)}
            data-testid={`month-cell-${index}`}
            tabIndex={index === focusedMonthIndex ? 0 : -1}
            aria-label={abbr}
          >
            {abbr}
          </GridCell>
        ))}
      </MonthsGrid>
    );
  };

  const renderYearsGrid = () => {
    const years: Array<number> = [];
    const baseYear = year + yearOffset;
    const todayYear = new Date().getFullYear();
    const selectedYear = selectedDate?.getFullYear();

    for (let i = -VIEW_NAVIGATION_OFFSET_YEARS; i <= VIEW_NAVIGATION_OFFSET_YEARS; i++) {
      years.push(baseYear + i);
    }

    return (
      <YearsGrid
        data-testid="years-grid"
        role="grid"
        aria-label="Select year"
      >
        {years.map((currYear, index) => (
          <GridCell
            key={currYear}
            type="button"
            ref={el => {
              yearGridRef.current[index] = el;
            }}
            $isActive={selectedDate && currYear === selectedYear}
            $isPresent={currYear === todayYear}
            onClick={() => onYearSelection(currYear)}
            onKeyDown={e => onYearGridKeyDown(e, index, currYear)}
            data-testid={`year-cell-${currYear}`}
            tabIndex={index === focusedYearIndex ? 0 : -1}
            aria-label={String(currYear)}
          >
            {currYear}
          </GridCell>
        ))}
      </YearsGrid>
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
            {headers.weekDays.map(({ key, value: date }) => {
              return (
                <DateTableHeader key={key}>
                  {weekdayFormatter.format(date)}
                </DateTableHeader>
              );
            })}
          </tr>
        </thead>
        <tbody>{children(body)}</tbody>
      </>
    );
  };

  return (
    <DatePickerContainer
      data-testid="datepicker-calendar-container"
      isResponsive={false}
      fillWidth={false}
      orientation="vertical"
      padding="sm"
      {...props}
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
          <ClickableTitle
            ref={el => {
              headerNavRefs.current[1] = el as HTMLButtonElement;
            }}
            onClick={onTitleClick}
            onKeyDown={onHeaderNavKeyDown}
            data-testid="calendar-title"
            tabIndex={0}
          >
            {getHeaderTitle(view)}
          </ClickableTitle>
        ) : (
          <UnselectableTitle>{getHeaderTitle(view)}</UnselectableTitle>
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
      <DateTable>{renderTableContent()}</DateTable>
    </DatePickerContainer>
  );
};
