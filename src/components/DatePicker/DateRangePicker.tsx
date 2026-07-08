import {
  ComponentProps,
  Dispatch,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isSameDate, UseCalendarOptions } from '@h6s/calendar';
import { Dropdown } from '@/components/Dropdown';
import {
  Body,
  CalendarRenderer,
  DateRangePickerInput,
  DateTableCell,
  StyledDropdownItem,
} from './Common';
import { Container } from '@/components/Container';
import { Panel } from '@/components/Panel';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import styles from './DateRangePicker.module.css';
import {
  DateRange,
  datesAreWithinMaxRange,
  formatDateHeader,
  formatSelectedDate,
  shiftFromTimezone,
  isDateNotInAllowList,
  isDateRangeTheWholeMonth,
  Timezone,
  shiftToTimezone,
} from './utils';

type OpenDirection = 'left' | 'right';

const PredefinedCalendarContainer = ({
  className,
  children,
  gap,
  orientation,
  padding,
}: ComponentProps<typeof Panel>) => (
  <Panel
    gap={gap}
    orientation={orientation}
    padding={padding}
    className={cn(styles['predefined-calendar-container'], className)}
  >
    {children}
  </Panel>
);

const PredefinedDatesContainer = ({
  className,
  children,
  isResponsive,
  orientation,
  'data-testid': dataTestId,
}: ComponentProps<typeof Container> & { 'data-testid'?: string }) => (
  <Container
    isResponsive={isResponsive}
    orientation={orientation}
    data-testid={dataTestId}
    className={cn(styles['predefined-dates-container'], className)}
  >
    {children}
  </Container>
);

const calendarRendererContainerVariants = cva(styles['calendar-renderer-container'], {
  variants: {
    openDirection: {
      left: styles['calendar-renderer-container_left'],
      right: styles['calendar-renderer-container_right'],
    },
  },
  defaultVariants: { openDirection: 'right' },
});

const CalendarRendererContainer = forwardRef<
  HTMLDivElement,
  { openDirection?: OpenDirection; children: ReactNode }
>(({ openDirection, children }, ref) => (
  <div
    ref={ref}
    className={calendarRendererContainerVariants({ openDirection })}
  >
    {children}
  </div>
));
CalendarRendererContainer.displayName = 'CalendarRendererContainer';

const StyledCalendarRenderer = ({
  className,
  children,
  calendarOptions,
  allowYearMonthSelection,
  selectedDate,
  timezone,
}: ComponentProps<typeof CalendarRenderer>) => (
  <CalendarRenderer
    calendarOptions={calendarOptions}
    allowYearMonthSelection={allowYearMonthSelection}
    selectedDate={selectedDate}
    timezone={timezone}
    className={cn(styles['styled-calendar-renderer'], className)}
  >
    {children}
  </CalendarRenderer>
);

const ScrollableContainer = ({
  className,
  children,
  orientation,
}: ComponentProps<typeof Container>) => (
  <Container
    orientation={orientation}
    className={cn(styles['scrollable-container'], className)}
  >
    {children}
  </Container>
);

const dateRangeTableCellVariants = cva(undefined, {
  variants: {
    showRangeIndicator: { true: styles['date-range-table-cell_indicator'] },
  },
});

const DateRangeTableCell = ({
  shouldShowRangeIndicator,
  className,
  children,
  isCurrentMonth,
  isDisabled,
  isSelected,
  isPresent,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ComponentProps<typeof DateTableCell> & {
  shouldShowRangeIndicator?: boolean;
}) => (
  <DateTableCell
    isCurrentMonth={isCurrentMonth}
    isDisabled={isDisabled}
    isSelected={isSelected}
    isPresent={isPresent}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={cn(
      dateRangeTableCellVariants({ showRangeIndicator: shouldShowRangeIndicator }),
      className
    )}
  >
    {children}
  </DateTableCell>
);

interface CalendarProps {
  allowOnlyDatesList?: Array<Date>;
  calendarBody: Body;
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  futureStartDatesDisabled: boolean;
  maxRangeLength: number;
  setSelectedDate: (selectedDate: Date) => void;
  startDate?: Date;
  endDate?: Date;
  timezone: Timezone;
}

const Calendar = ({
  allowOnlyDatesList,
  calendarBody,
  closeDatepicker,
  futureDatesDisabled,
  futureStartDatesDisabled,
  maxRangeLength,
  setSelectedDate,
  startDate,
  endDate,
  timezone,
}: CalendarProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date>();

  const today = shiftToTimezone(new Date(), timezone);
  const shiftedStart = startDate ? shiftToTimezone(startDate, timezone) : undefined;
  const shiftedEnd = endDate ? shiftToTimezone(endDate, timezone) : undefined;

  const shiftedAllowList = useMemo(() => {
    return allowOnlyDatesList?.map(date => {
      return shiftToTimezone(date, timezone);
    });
  }, [allowOnlyDatesList, timezone]);

  const handleMouseOut = (): void => {
    setHoveredDate(undefined);
  };

  return calendarBody.value.map(({ key: weekKey, value: week }) => {
    return (
      <tr key={weekKey}>
        {week.map(({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
          const isSelected =
            (shiftedStart && isSameDate(shiftedStart, fullDate)) ||
            (shiftedEnd && isSameDate(shiftedEnd, fullDate));
          const isPresent = isSameDate(today, fullDate);

          const isBetweenStartAndEndDates = Boolean(
            shiftedStart && shiftedEnd && fullDate > shiftedStart && fullDate < shiftedEnd
          );

          let isDisabled = false;
          if (futureDatesDisabled && fullDate > today) {
            isDisabled = true;
          }

          if (futureStartDatesDisabled && !shiftedStart && fullDate > today) {
            isDisabled = true;
          }

          if (
            maxRangeLength > 1 &&
            shiftedStart &&
            !datesAreWithinMaxRange(shiftedStart, fullDate, maxRangeLength) &&
            fullDate > shiftedStart
          ) {
            isDisabled = true;
          }

          if (isDateNotInAllowList(shiftedAllowList, fullDate)) {
            isDisabled = true;
          }

          const shouldShowRangeIndicator =
            !shiftedEnd &&
            Boolean(
              shiftedStart &&
              hoveredDate &&
              fullDate > shiftedStart &&
              fullDate < hoveredDate
            );

          const handleMouseEnter = () => {
            setHoveredDate(fullDate);
          };

          const handleClick = () => {
            if (isDisabled) {
              return false;
            }
            setSelectedDate(shiftFromTimezone(fullDate, timezone));

            // User has a date range selected and clicked a new date.
            // This will cause the selected date to be reset, thus do not close the datepicker.
            if (shiftedStart && shiftedEnd) {
              return;
            }

            // The user has selected a new start date, don't close
            if (shiftedStart && fullDate < shiftedStart) {
              return;
            }

            // Only close the datepicker if the user hasn't clicked the selected start date.
            if (shiftedStart && !isSameDate(fullDate, shiftedStart)) {
              closeDatepicker();
              return;
            }
          };
          return (
            <DateRangeTableCell
              shouldShowRangeIndicator={
                !isSelected && (shouldShowRangeIndicator || isBetweenStartAndEndDates)
              }
              isCurrentMonth={isCurrentMonth}
              isDisabled={isDisabled}
              isSelected={Boolean(isSelected)}
              isPresent={isPresent}
              key={dayKey}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseOut}
            >
              {date}
            </DateRangeTableCell>
          );
        })}
      </tr>
    );
  });
};

interface PredefinedDatesProps {
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  predefinedDatesList: DateRange[];
  selectedEndDate: Date | undefined;
  selectedStartDate: Date | undefined;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  shouldShowCustomRange: boolean;
  showCustomDateRange: Dispatch<SetStateAction<boolean>>;
  timezone: Timezone;
}

const PredefinedDates = ({
  onSelectDateRange,
  predefinedDatesList,
  selectedEndDate,
  selectedStartDate,
  setEndDate,
  setStartDate,
  shouldShowCustomRange,
  showCustomDateRange,
  timezone,
}: PredefinedDatesProps) => {
  const handleCustomTimePeriodClick = (event: MouseEvent) => {
    event.preventDefault();
    showCustomDateRange(!shouldShowCustomRange);
  };

  return (
    <PredefinedDatesContainer
      data-testid="predefined-dates-list"
      isResponsive={false}
      orientation="vertical"
    >
      <ScrollableContainer orientation="vertical">
        {predefinedDatesList.map(({ startDate, endDate }) => {
          const handleItemClick = () => {
            setStartDate(startDate);
            setEndDate(endDate);
            onSelectDateRange(startDate, endDate);
          };

          const rangeIsSelected =
            selectedEndDate &&
            isSameDate(selectedEndDate, endDate) &&
            selectedStartDate &&
            isSameDate(selectedStartDate, startDate);

          const isWholeMonth = isDateRangeTheWholeMonth({ startDate, endDate }, timezone);

          const formattedText = isWholeMonth
            ? formatDateHeader(timezone, startDate)
            : `${formatSelectedDate(timezone, startDate)} – ${formatSelectedDate(timezone, endDate)}`.trim();

          return (
            <StyledDropdownItem
              data-testid={`predefined-date-${startDate.getTime()}`}
              key={startDate.toISOString()}
              onClick={handleItemClick}
            >
              <Container
                data-selected={rangeIsSelected}
                data-testid={formattedText}
                justifyContent="space-between"
                orientation="horizontal"
              >
                {formattedText}
                {rangeIsSelected && <Icon name="check" />}
              </Container>
            </StyledDropdownItem>
          );
        })}
      </ScrollableContainer>
      <StyledDropdownItem onClick={handleCustomTimePeriodClick}>
        <Container
          justifyContent="space-between"
          orientation="horizontal"
        >
          Custom time period <Icon name="chevron-right" />
        </Container>
      </StyledDropdownItem>
    </PredefinedDatesContainer>
  );
};

export interface DateRangePickerProps {
  allowOnlyDatesList?: Array<Date>;
  endDate?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  futureStartDatesDisabled?: boolean;
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  openDirection?: OpenDirection;
  placeholder?: string;
  predefinedDatesList?: DateRange[];
  maxRangeLength?: number;
  startDate?: Date;
  responsivePositioning?: boolean;
  timezone?: Timezone;
}

export const DateRangePicker = ({
  allowOnlyDatesList,
  endDate,
  startDate,
  disabled = false,
  futureDatesDisabled = false,
  futureStartDatesDisabled = false,
  maxRangeLength = -1,
  onSelectDateRange,
  openDirection = 'right',
  placeholder = 'start date – end date',
  predefinedDatesList,
  responsivePositioning = true,
  timezone = 'system',
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [shouldShowCustomRange, setShouldShowCustomRange] = useState<boolean>(false);
  const [calendarOpenDirection, setCalendarOpenDirection] =
    useState<OpenDirection>(openDirection);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const calendarOptions: UseCalendarOptions = {};

  // If a start date is selected, open the calendar to that date
  if (selectedStartDate) {
    calendarOptions.defaultDate = selectedStartDate;
  }

  useEffect(() => {
    if (startDate) {
      setSelectedStartDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setSelectedEndDate(endDate);
    }
  }, [endDate]);

  useLayoutEffect(() => {
    if (shouldShowCustomRange && calendarContainerRef.current) {
      if (
        calendarContainerRef.current.getBoundingClientRect().right > window.innerWidth
      ) {
        setCalendarOpenDirection('left');
      }
    }
  }, [shouldShowCustomRange]);

  const closeDatePicker = useCallback((): void => {
    setIsOpen(false);
    setShouldShowCustomRange(false);
    setCalendarOpenDirection(openDirection);
  }, [openDirection]);

  const handleOpenChange = (isOpen: boolean): void => {
    setIsOpen(isOpen);

    if (!isOpen) {
      setShouldShowCustomRange(false);
      setCalendarOpenDirection(openDirection);
    }
  };

  const handleSelectDate = useCallback(
    (selectedDate: Date): void => {
      // Start date and end date are selected, user clicks any date.
      // Set start date to the selected date, clear the end date.
      if (selectedStartDate && selectedEndDate) {
        // If futureStartDatesDisabled is true, only set the selected date to the date clicked if it's before today
        if (futureStartDatesDisabled && selectedDate > new Date()) {
          setSelectedEndDate(undefined);
          return;
        }
        setSelectedStartDate(selectedDate);
        setSelectedEndDate(undefined);
        return;
      }

      if (selectedStartDate) {
        if (isSameDate(selectedStartDate, selectedDate)) {
          // Start date is selected, user clicks start date.
          // Reset the start date.
          setSelectedStartDate(undefined);
          return;
        }

        // Start date is selected, user clicks an earlier date.
        // Set the earlier date to the new start date.
        if (selectedDate < selectedStartDate) {
          setSelectedStartDate(selectedDate);
          return;
        }

        // Otherwise, set the end date to the date the user clicked.
        setSelectedEndDate(selectedDate);
        onSelectDateRange(selectedStartDate, selectedDate);
        setShouldShowCustomRange(false);
        return;
      }

      setSelectedStartDate(selectedDate);
    },
    [futureStartDatesDisabled, onSelectDateRange, selectedEndDate, selectedStartDate]
  );

  const onTriggerKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  }, []);

  const shouldShowPredefinedDates =
    predefinedDatesList !== undefined && predefinedDatesList.length > 0;

  return (
    <Dropdown
      onOpenChange={handleOpenChange}
      open={isOpen}
    >
      <Dropdown.Trigger
        disabled={disabled}
        onKeyDown={onTriggerKeyDown}
      >
        <DateRangePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          placeholder={placeholder}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
          timezone={timezone}
        />
      </Dropdown.Trigger>
      <Dropdown.Content
        align="start"
        responsivePositioning={responsivePositioning}
      >
        {shouldShowPredefinedDates ? (
          <PredefinedCalendarContainer
            gap="none"
            orientation="horizontal"
            padding="none"
          >
            <PredefinedDates
              onSelectDateRange={onSelectDateRange}
              predefinedDatesList={predefinedDatesList}
              selectedEndDate={selectedEndDate}
              selectedStartDate={selectedStartDate}
              setEndDate={setSelectedEndDate}
              setStartDate={setSelectedStartDate}
              shouldShowCustomRange={shouldShowCustomRange}
              showCustomDateRange={setShouldShowCustomRange}
              timezone={timezone}
            />

            {shouldShowCustomRange && (
              <CalendarRendererContainer
                openDirection={calendarOpenDirection}
                ref={calendarContainerRef}
              >
                <StyledCalendarRenderer
                  calendarOptions={calendarOptions}
                  allowYearMonthSelection={false}
                  selectedDate={selectedStartDate}
                  timezone={timezone}
                >
                  {(body: Body) => (
                    <Calendar
                      allowOnlyDatesList={allowOnlyDatesList}
                      calendarBody={body}
                      closeDatepicker={closeDatePicker}
                      futureDatesDisabled={futureDatesDisabled}
                      futureStartDatesDisabled={futureStartDatesDisabled}
                      maxRangeLength={maxRangeLength}
                      setSelectedDate={handleSelectDate}
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      timezone={timezone}
                    />
                  )}
                </StyledCalendarRenderer>
              </CalendarRendererContainer>
            )}
          </PredefinedCalendarContainer>
        ) : (
          <CalendarRenderer
            calendarOptions={calendarOptions}
            allowYearMonthSelection={false}
            selectedDate={selectedStartDate}
            timezone={timezone}
          >
            {(body: Body) => (
              <Calendar
                allowOnlyDatesList={allowOnlyDatesList}
                calendarBody={body}
                closeDatepicker={closeDatePicker}
                futureDatesDisabled={futureDatesDisabled}
                futureStartDatesDisabled={futureStartDatesDisabled}
                maxRangeLength={maxRangeLength}
                setSelectedDate={handleSelectDate}
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                timezone={timezone}
              />
            )}
          </CalendarRenderer>
        )}
      </Dropdown.Content>
    </Dropdown>
  );
};
