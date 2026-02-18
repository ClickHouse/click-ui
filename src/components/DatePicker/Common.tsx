import { styled } from 'styled-components';
import { InputElement, InputStartContent, InputWrapper } from '../Input/InputWrapper';
import { ReactNode, useCallback, useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { Container } from '../Container/Container';
import { useCalendar, UseCalendarOptions } from '@h6s/calendar';
import { IconButton, IconButtonSize } from '../IconButton/IconButton';
import { Text } from '../Typography/Text/Text';
import { headerDateFormatter, selectedDateFormatter, weekdayFormatter } from './utils';
import { getMonthNames, DAYS, MONTHS, YEARS, DAYS_IN_WEEK } from '@/utils/date';
import { IconName } from '@/components/Icon/types';

const explicitWidth = '250px';
const TXT_ON_MONTH_SELECT = 'Select Month';

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

const HighlightedInputWrapper = styled(InputWrapper) <{ $isActive: boolean }>`
  ${({ $isActive, theme }) => {
    return `border: ${theme.click.datePicker.dateOption.stroke} solid ${$isActive
        ? theme.click.datePicker.dateOption.color.stroke.active
        : theme.click.field.color.stroke.default
      };`;
  }}

  width: ${explicitWidth};
}`;

interface DatePickerInputProps {
  isActive: boolean;
  disabled: boolean;
  id?: string;
  placeholder?: string;
  selectedDate?: Date;
}

export const DatePickerInput = ({
  isActive,
  disabled,
  id,
  placeholder,
  selectedDate,
}: DatePickerInputProps) => {
  const defaultId = useId();
  const formattedSelectedDate =
    selectedDate instanceof Date ? selectedDateFormatter.format(selectedDate) : '';

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

const DatePickerContainer = styled(Container)`
  background: ${({ theme }) =>
    theme.click.datePicker.dateOption.color.background.default};
`;

const ClickableTitle = styled.button`
  ${({ theme }) => `
    color: ${theme.click.datePicker.color.title.default};
    font: ${theme.click.datePicker.typography.title.default};
  `}

  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.click.datePicker.dateOption.radii.default};

  &:hover {
    background: ${({ theme }) =>
    theme.click.datePicker.dateOption.color.background.hover};
  }
`;

const UnselectableTitle = styled.h2`
  ${({ theme }) => `
    color: ${theme.click.datePicker.color.title.default};
    font: ${theme.click.datePicker.typography.title.default};
  `}

  user-select: none;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 4px;
  padding: 4px 0;
`;

const MonthsGrid = styled(GridContainer)`
  grid-template-columns: repeat(${VIEW_GRID_MONTHS.columns}, 1fr);
  grid-template-rows: repeat(${VIEW_GRID_MONTHS.rows}, 1fr);
`;

const YearsGrid = styled(GridContainer)`
  grid-template-columns: repeat(${VIEW_GRID_YEARS.columns}, 1fr);
  grid-template-rows: repeat(${VIEW_GRID_YEARS.rows}, 1fr);
`;

const GridCell = styled.div`
  ${({ theme }) => `
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.default};
    border-radius: ${theme.click.datePicker.dateOption.radii.default};
    font: ${theme.click.datePicker.dateOption.typography.label.default};
    color: ${theme.click.datePicker.dateOption.color.label.default};
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  cursor: pointer;
  text-align: center;
  min-height: 26px;

  &:hover {
    border-color: ${({ theme }) => theme.click.datePicker.dateOption.color.stroke.hover};
  }
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
  $isToday?: boolean;
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
      background: ${theme.click.datePicker.dateOption.color.background.active};
      color: ${theme.click.datePicker.dateOption.color.label.active};
    `}


  text-align: center;

  ${({ $isToday, theme }) =>
    $isToday && `font: ${theme.click.datePicker.dateOption.typography.label.active};`}

  &:hover {
    ${({ $isDisabled, theme }) =>
    `border: ${theme.click.datePicker.dateOption.stroke} solid ${$isDisabled
      ? theme.click.datePicker.dateOption.color.stroke.disabled
      : theme.click.datePicker.dateOption.color.stroke.hover
    };


    border-radius: ${theme.click.datePicker.dateOption.radii.default};`};
  }
`;

export type Body = ReturnType<typeof useCalendar>['body'];

interface CalendarRendererProps {
  calendarOptions?: UseCalendarOptions;
  children: (body: Body) => ReactNode;
}

const monthAbbreviations = getMonthNames('short');

type DateViewOption = 'days' | 'months' | 'years';

const EmptyDateSelectNav = styled(IconButton)`
  visibility: hidden;
  pointer-events: none;
`;

const DateSelectNav = ({
  id,
  icon,
  onClick,
  view,
  size = 'sm',
}: {
  id: string;
  icon: Extract<IconName, 'chevron-left' | 'chevron-right'>;
  onClick: () => void;
  view: DateViewOption;
  size?: IconButtonSize;
}) => {
  if (view === MONTHS) {
    return <EmptyDateSelectNav icon={icon} size={size} type="ghost" />;
  }
  return (
    <IconButton
      data-testid={id}
      icon={icon}
      onClick={onClick}
      size={size}
      type="ghost"
    />
  );
};

export const CalendarRenderer = ({
  calendarOptions = {},
  children,
  ...props
}: CalendarRendererProps) => {
  const { body, headers, month, navigation, year } = useCalendar({
    defaultWeekStart: 1,
    ...calendarOptions,
  });

  const [view, setView] = useState<DateViewOption>(DAYS);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);
  const [yearOffset, setYearOffset] = useState(0);

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
    if (view !== DAYS) return;

    setView(MONTHS);
  }, [view]);

  const onMonthSelection = useCallback((monthIndex: number) => {
    setSelectedMonthIndex(monthIndex);
    setView(YEARS);
  }, []);

  const onYearSelection = useCallback(
    (selectedYear: number) => {
      const finalMonth = typeof selectedMonthIndex === 'number' ? selectedMonthIndex : month;
      const newDate = new Date(selectedYear, finalMonth, 1);

      navigation.setDate(newDate);

      setView(DAYS);
      setSelectedMonthIndex(null);
      setYearOffset(0);
    },
    [selectedMonthIndex, month, navigation]
  );

  const headerDate = new Date();
  headerDate.setMonth(month);
  headerDate.setFullYear(year);

  const getHeaderTitle = (view: DateViewOption) => {
    if (view === MONTHS) {
      return TXT_ON_MONTH_SELECT;
    }

    if (view === YEARS) {
      const startYear = year + yearOffset - VIEW_NAVIGATION_OFFSET_YEARS;
      const endYear = year + yearOffset + VIEW_NAVIGATION_OFFSET_YEARS;

      return `${startYear} - ${endYear}`;
    }

    return headerDateFormatter.format(headerDate);
  };

  const renderMonthsGrid = () => {
    return (
      <MonthsGrid data-testid="months-grid">
        {monthAbbreviations.map((abbr, index) => (
          <GridCell
            key={abbr}
            onClick={() => onMonthSelection(index)}
            data-testid={`month-cell-${index}`}
          >
            {abbr}
          </GridCell>
        ))}
      </MonthsGrid>
    );
  };

  const renderYearsGrid = () => {
    const years = [];
    const baseYear = year + yearOffset;

    // Note: Try to keep the current year in the middle
    for (let i = -VIEW_NAVIGATION_OFFSET_YEARS; i <= VIEW_NAVIGATION_OFFSET_YEARS; i++) {
      years.push(baseYear + i);
    }

    return (
      <YearsGrid data-testid="years-grid">
        {years.map(currYear => (
          <GridCell
            key={currYear}
            onClick={() => onYearSelection(currYear)}
            data-testid={`year-cell-${currYear}`}
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
            view={view}
        />
        {view === DAYS ? (
          <ClickableTitle
            onClick={onTitleClick}
            data-testid="calendar-title"
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
            view={view}
        />
      </Container>
      <DateTable>{renderTableContent()}</DateTable>
    </DatePickerContainer>
  );
};
