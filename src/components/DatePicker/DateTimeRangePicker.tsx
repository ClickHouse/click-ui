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
  useRef,
  useState,
} from 'react';
import { isSameDate, UseCalendarOptions } from '@h6s/calendar';
import { Dropdown } from '../Dropdown/Dropdown';
import {
  Body,
  CalendarRenderer,
  DateTimeRangePickerInput,
  DateTableCell,
  StyledDropdownItem,
} from './Common';
import { Container } from '../Container/Container';
import { Panel } from '../Panel/Panel';
import { Icon } from '../Icon/Icon';
import {
  DateRangeListItem,
  datesAreWithinMaxRange,
  shiftFromTimezone,
  Meridiem,
  Timezone,
  shiftToTimezone,
  dateRangeIsValid,
} from './utils';
import { dayjs, Dayjs } from '@/utils/date';
import { Tabs } from '../Tabs/Tabs';
import { TextField } from '@/components/TextField';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Label } from '../Label/Label';
import { Text } from '../Text';
import { cn } from '@/lib/cva';
import styles from './DateTimeRangePicker.module.css';

const calendarFullWidth = '258px';

const PredefinedCalendarContainer = ({
  className,
  ...props
}: ComponentProps<typeof Panel>) => (
  <Panel
    {...props}
    className={cn(styles['predefined-calendar-container'], className)}
  />
);

const PredefinedTimesContainer = ({
  className,
  ...props
}: ComponentProps<typeof Container>) => (
  <Container
    {...props}
    className={cn(styles['predefined-times-container'], className)}
  />
);

type OpenDirection = 'left' | 'right';

const CalendarRendererContainer = forwardRef<
  HTMLDivElement,
  { openDirection?: OpenDirection; children: ReactNode }
>(({ openDirection, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      styles['calendar-renderer-container'],
      openDirection === 'left'
        ? styles['calendar-renderer-container_left']
        : styles['calendar-renderer-container_right']
    )}
  >
    {children}
  </div>
));
CalendarRendererContainer.displayName = 'CalendarRendererContainer';

const NoOverflowDropdownContent = ({
  className,
  ...props
}: ComponentProps<typeof Dropdown.Content>) => (
  <Dropdown.Content
    {...props}
    className={cn(styles['no-overflow-dropdown-content'], className)}
  />
);

const StyledCalendarRenderer = ({
  className,
  ...props
}: ComponentProps<typeof CalendarRenderer>) => (
  <CalendarRenderer
    {...props}
    className={cn(styles['styled-calendar-renderer'], className)}
  />
);

const BottomPaddingTabs = ({ className, ...props }: ComponentProps<typeof Tabs>) => (
  <Tabs
    {...props}
    className={cn(styles['bottom-padding-tabs'], className)}
  />
);

const StyledTriggerList = ({
  className,
  ...props
}: ComponentProps<typeof Tabs.TriggersList>) => (
  <Tabs.TriggersList
    {...props}
    className={cn(styles['styled-trigger-list'], className)}
  />
);

const ScrollableContainer = ({
  className,
  ...props
}: ComponentProps<typeof Container>) => (
  <Container
    {...props}
    className={cn(styles['scrollable-container'], className)}
  />
);

const TimeInputContainer = ({
  className,
  ...props
}: ComponentProps<typeof Container>) => (
  <Container
    {...props}
    className={cn(styles['time-input-container'], className)}
  />
);

const DateRangeTableCell = ({
  shouldShowRangeIndicator,
  className,
  ...props
}: ComponentProps<typeof DateTableCell> & {
  shouldShowRangeIndicator?: boolean;
}) => (
  <DateTableCell
    {...props}
    className={cn(
      shouldShowRangeIndicator && styles['date-range-table-cell_indicator'],
      className
    )}
  />
);

type CalendarType = 'startDate' | 'endDate';

type SetSelectedDate = (selectedDate: Date, calendarType: CalendarType) => void;

type SetDate = (date: Date) => void;

interface CalendarProps {
  calendarBody: Body;
  calendarType: CalendarType;
  futureDatesDisabled: boolean;
  futureStartDatesDisabled: boolean;
  maxRangeLength: number;
  setSelectedDate: SetSelectedDate;
  startDate?: Date;
  endDate?: Date;
  timezone: Timezone;
}

const Calendar = ({
  calendarBody,
  calendarType,
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

          const isCurrentDate = isSameDate(today, fullDate);
          const isBetweenStartAndEndDates = Boolean(
            shiftedStart && shiftedEnd && fullDate > shiftedStart && fullDate < shiftedEnd
          );

          let isDisabled = false;
          if (futureDatesDisabled && fullDate > today) {
            isDisabled = true;
          }

          if (
            futureStartDatesDisabled &&
            calendarType === 'startDate' &&
            fullDate > today
          ) {
            isDisabled = true;
          }

          if (
            maxRangeLength > 1 &&
            shiftedStart &&
            !datesAreWithinMaxRange(shiftedStart, fullDate, maxRangeLength)
          ) {
            isDisabled = true;
          }

          // start date is selected, end date is not; disable anything before start date
          if (
            calendarType === 'endDate' &&
            !shiftedEnd &&
            shiftedStart &&
            shiftedStart > fullDate &&
            !isSameDate(shiftedStart, fullDate)
          ) {
            isDisabled = true;
          }

          // start date isn't selected, but end date is; disable anything after end date
          if (
            calendarType === 'startDate' &&
            !shiftedStart &&
            shiftedEnd &&
            fullDate > shiftedEnd
          ) {
            isDisabled = true;
          }

          const startDateSelectedAndIsSelectingEndDate =
            calendarType === 'endDate' &&
            !shiftedEnd &&
            Boolean(
              shiftedStart &&
              hoveredDate &&
              fullDate > shiftedStart &&
              fullDate < hoveredDate
            );

          const endDateSelectedAndIsSelectingStartDate =
            calendarType === 'startDate' &&
            !shiftedStart &&
            Boolean(
              shiftedEnd && hoveredDate && fullDate < shiftedEnd && fullDate > hoveredDate
            );

          const shouldShowRangeIndicator =
            startDateSelectedAndIsSelectingEndDate ||
            endDateSelectedAndIsSelectingStartDate;

          const handleMouseEnter = () => {
            setHoveredDate(fullDate);
          };

          const handleClick = () => {
            if (isDisabled) {
              return false;
            }

            const originalFullDate = shiftFromTimezone(fullDate, timezone);

            // If the user selects a start date and changes the start date
            // use any hours, minutes, seconds they've already set
            if (calendarType === 'startDate' && startDate) {
              if (timezone === 'UTC') {
                originalFullDate.setUTCHours(startDate.getUTCHours());
                originalFullDate.setUTCMinutes(startDate.getUTCMinutes());
                originalFullDate.setUTCSeconds(startDate.getUTCSeconds());
              } else {
                originalFullDate.setHours(startDate.getHours());
                originalFullDate.setMinutes(startDate.getMinutes());
                originalFullDate.setSeconds(startDate.getSeconds());
              }
            }

            // If the user selects an end date and changes the end date
            // use any hours, minutes, seconds they've already set
            if (calendarType === 'endDate' && endDate) {
              if (timezone === 'UTC') {
                originalFullDate.setUTCHours(endDate.getUTCHours());
                originalFullDate.setUTCMinutes(endDate.getUTCMinutes());
                originalFullDate.setUTCSeconds(endDate.getUTCSeconds());
              } else {
                originalFullDate.setHours(endDate.getHours());
                originalFullDate.setMinutes(endDate.getMinutes());
                originalFullDate.setSeconds(endDate.getSeconds());
              }
            }

            setSelectedDate(originalFullDate, calendarType);
          };

          return (
            <DateRangeTableCell
              shouldShowRangeIndicator={
                shouldShowRangeIndicator || isBetweenStartAndEndDates
              }
              isCurrentMonth={isCurrentMonth}
              isDisabled={isDisabled}
              isSelected={Boolean(isSelected)}
              isPresent={isCurrentDate}
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

interface PredefinedTimesProps {
  onSelectDateRange: (
    startDate: Date,
    endDate: Date,
    predefinedDateLabel?: string
  ) => void;
  predefinedTimesList: DateRangeListItem[];
  selectedEndDate: Date | undefined;
  selectedStartDate: Date | undefined;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  shouldShowCustomRange: boolean;
  showCustomDateRange: Dispatch<SetStateAction<boolean>>;
}

const PredefinedTimes = ({
  onSelectDateRange,
  predefinedTimesList,
  selectedEndDate,
  selectedStartDate,
  setEndDate,
  setStartDate,
  shouldShowCustomRange,
  showCustomDateRange,
}: PredefinedTimesProps) => {
  const handleCustomTimePeriodClick = (event: MouseEvent) => {
    event.preventDefault();
    showCustomDateRange(!shouldShowCustomRange);
  };

  return (
    <PredefinedTimesContainer
      data-testid="predefined-times-list"
      isResponsive={false}
      orientation="vertical"
    >
      <ScrollableContainer orientation="vertical">
        {predefinedTimesList.map(({ dateRange: { startDate, endDate }, label }) => {
          const handleItemClick = () => {
            setStartDate(startDate);
            setEndDate(endDate);
            onSelectDateRange(startDate, endDate, label);
          };

          const rangeIsSelected =
            selectedEndDate &&
            selectedEndDate.getTime() === endDate.getTime() &&
            selectedStartDate &&
            selectedStartDate.getTime() === startDate.getTime();

          return (
            <StyledDropdownItem
              data-testid={`predefined-date-${startDate.getTime()}`}
              key={startDate.toISOString()}
              onClick={handleItemClick}
            >
              <Container
                data-selected={rangeIsSelected}
                data-testid={label}
                justifyContent="space-between"
                orientation="horizontal"
              >
                {label}
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
    </PredefinedTimesContainer>
  );
};

const parseTimeString = (
  timeString: string
): { isValid: boolean; parsedDate?: Dayjs } => {
  if (!validTimeRegex.test(timeString)) {
    return { isValid: false };
  }

  const [hours, minutes, seconds] = timeString.split(':');

  const hoursAsNumber = parseInt(hours, 10);
  if (Number.isNaN(hoursAsNumber)) {
    return { isValid: false };
  }

  if (hoursAsNumber > 23 || hoursAsNumber < 0) {
    return { isValid: false };
  }

  let parsedDate;
  if (!minutes) {
    parsedDate = dayjs(hours, 'h');
  } else {
    const minutesAsNumber = parseInt(minutes, 10);
    if (Number.isNaN(minutesAsNumber)) {
      return { isValid: false };
    }

    if (minutesAsNumber > 59 || minutesAsNumber < 0) {
      return { isValid: false };
    }

    if (!seconds) {
      parsedDate = dayjs(`${hours}:${minutes}`, 'h:mm');
    } else {
      const secondsAsNumber = parseInt(seconds, 10);

      if (Number.isNaN(secondsAsNumber)) {
        return { isValid: false };
      }

      if (secondsAsNumber > 59 || secondsAsNumber < 0) {
        return { isValid: false };
      }

      parsedDate = dayjs(`${hours}:${minutes}:${seconds}`, 'h:mm:ss');
    }
  }

  if (!parsedDate.isValid()) {
    return { isValid: false };
  }

  return { isValid: true, parsedDate };
};

const validTimeRegex = /^\d{1,2}(:\d{1,2}(:\d{1,2})?)?$/;

interface TimeInputProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
  shouldShowSeconds: boolean;
  timezone: Timezone;
}

const TimeInput = ({ date, setDate, shouldShowSeconds, timezone }: TimeInputProps) => {
  let dayjsDate = timezone === 'UTC' ? dayjs.utc(date) : dayjs(date);

  if (!date) {
    dayjsDate = dayjsDate.hour(12).minute(0);
  }

  const formattedDate = shouldShowSeconds
    ? dayjsDate.format('hh:mm:ss')
    : dayjsDate.format('hh:mm');
  const [timeString, setTimeString] = useState<string>(formattedDate);
  const [dateIsValid, setDateIsValid] = useState<boolean>(true);
  const [meridiem, setMeridiem] = useState<Meridiem>();
  const isEnabled = Boolean(date);

  useEffect(() => {
    if (date) {
      setMeridiem(dayjsDate.format('a') as Meridiem);
    }
  }, [date, dayjsDate]);

  const handleTimeChange = useCallback(
    (newTimeString: string) => {
      setTimeString(newTimeString);

      if (!date) {
        return;
      }

      const trimmedTime = newTimeString.trim();
      if (!trimmedTime) {
        return;
      }

      const { isValid, parsedDate } = parseTimeString(trimmedTime);

      if (!isValid) {
        setDateIsValid(false);
        return;
      }

      if (!parsedDate) {
        setDateIsValid(false);
        return;
      }

      setDateIsValid(true);

      let hour = parsedDate.hour();

      // If the meridiem is set to am and the user enters a time greater than 12,
      // e.g. 18:00, it's a pretty clear indication they mean afternoon, so set the
      // meridiem to pm
      if (meridiem === 'am' && hour >= 12) {
        setMeridiem('pm');
      }
      // It's not as easy to infer that a user intended 8:00 to mean 08:00 when the meridiem
      // is set to pm, so don't change the meridiem in that case
      if (meridiem === 'pm' && hour < 12) {
        hour = parsedDate.hour() + 12;
      }

      const newDate = shouldShowSeconds
        ? dayjsDate
            .hour(hour)
            .minute(parsedDate.minute())
            .second(parsedDate.second())
            .toDate()
        : dayjsDate.hour(hour).minute(parsedDate.minute()).toDate();

      setDate(newDate);
    },
    [date, dayjsDate, meridiem, setDate, shouldShowSeconds]
  );

  const handleMeridiemChange = useCallback(
    (newMeridiem: string) => {
      setMeridiem(newMeridiem as Meridiem);

      if (newMeridiem === 'pm' && dayjsDate.hour() < 12) {
        const newDate = dayjsDate.hour(dayjsDate.hour() + 12).toDate();

        setDate(newDate);

        return;
      }

      if (newMeridiem === 'am' && dayjsDate.hour() >= 12) {
        const newDate = dayjsDate.hour(dayjsDate.hour() - 12).toDate();

        setDate(newDate);

        return;
      }
    },
    [dayjsDate, setDate]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const { isValid, parsedDate } = parseTimeString(timeString);

        if (!isValid) {
          return;
        }

        if (!parsedDate) {
          return;
        }

        const newDate = shouldShowSeconds
          ? dayjsDate
              .hour(parsedDate.hour())
              .minute(parsedDate.minute())
              .second(parsedDate.second())
              .toDate()
          : dayjsDate.hour(parsedDate.hour()).minute(parsedDate.minute()).toDate();

        setDate(newDate);
      }
    },
    [dayjsDate, setDate, shouldShowSeconds, timeString]
  );

  return (
    <TimeInputContainer
      gap="sm"
      padding="xs"
      maxWidth={`${calendarFullWidth}`}
      orientation="horizontal"
      justifyContent="end"
    >
      <Container maxWidth="8%">
        <Label htmlFor="date-time-picker-time-input">Time</Label>
      </Container>
      <Container
        justifyContent="space-evenly"
        orientation="horizontal"
        maxWidth="85%"
      >
        <Container
          maxWidth="45%"
          orientation="horizontal"
        >
          <TextField
            data-testid="date-time-picker-time-input"
            disabled={!isEnabled}
            error={dateIsValid ? null : true}
            id="date-time-picker-time-input"
            onChange={handleTimeChange}
            onKeyDown={handleKeyDown}
            value={timeString}
          />
        </Container>
        <Container maxWidth="45%">
          <ButtonGroup
            onClick={handleMeridiemChange}
            options={[
              {
                label: 'am',
                value: 'am',
              },
              {
                label: 'pm',
                value: 'pm',
              },
            ]}
            selected={meridiem}
            type="default"
          />
        </Container>
      </Container>
    </TimeInputContainer>
  );
};

export type Tab = 'startDate' | 'endDate';

interface TabbedCalendarProps {
  defaultActiveTab?: Tab;
  endDate: Date | undefined;
  futureDatesDisabled: boolean;
  futureStartDatesDisabled: boolean;
  maxRangeLength: number;
  setEndDate: SetDate;
  setSelectedDate: SetSelectedDate;
  setStartDate: SetDate;
  shouldShowSeconds: boolean;
  startDate: Date | undefined;
  timezone: Timezone;
}

const TabbedCalendar = ({
  defaultActiveTab = 'startDate',
  endDate,
  futureDatesDisabled,
  futureStartDatesDisabled,
  maxRangeLength,
  setEndDate,
  setSelectedDate,
  setStartDate,
  shouldShowSeconds,
  startDate,
  timezone,
}: TabbedCalendarProps) => {
  const [activeTab, setActiveTab] = useState<Tab>(defaultActiveTab);

  useEffect(() => {
    setActiveTab(defaultActiveTab);
  }, [defaultActiveTab]);

  const handleTabChange = useCallback((newTab: string) => {
    setActiveTab(newTab as Tab);
  }, []);

  const handleSetStartDate = useCallback(
    (startDate: Date) => {
      setStartDate(startDate);

      setSelectedDate(startDate, 'startDate');
    },
    [setSelectedDate, setStartDate]
  );

  const handleSetEndDate = useCallback(
    (endDate: Date) => {
      setEndDate(endDate);

      setSelectedDate(endDate, 'endDate');
    },
    [setEndDate, setSelectedDate]
  );

  const startDateCalendarOptions: UseCalendarOptions = {};
  const endDateCalendarOptions: UseCalendarOptions = {};

  // If a start date is selected, open the calendar to that date
  if (startDate) {
    startDateCalendarOptions.defaultDate = startDate;
  }

  // If an end date is selected, open the calendar to that date
  if (endDate) {
    endDateCalendarOptions.defaultDate = endDate;
  }

  const startDateIsAfterEndDate =
    startDate && endDate && !dateRangeIsValid({ startDate, endDate });

  return (
    <BottomPaddingTabs
      onValueChange={handleTabChange}
      value={activeTab}
    >
      <StyledTriggerList>
        <Tabs.Trigger
          value="startDate"
          data-testid="tabbed-calendar-trigger-start"
        >
          Start date
        </Tabs.Trigger>
        <Tabs.Trigger
          value="endDate"
          data-testid="tabbed-calendar-trigger-end"
        >
          End date
        </Tabs.Trigger>
      </StyledTriggerList>
      <Tabs.Content value="startDate">
        <StyledCalendarRenderer
          calendarOptions={startDateCalendarOptions}
          timezone={timezone}
        >
          {(body: Body) => (
            <Calendar
              calendarBody={body}
              calendarType="startDate"
              endDate={endDate}
              futureDatesDisabled={futureDatesDisabled}
              futureStartDatesDisabled={futureStartDatesDisabled}
              maxRangeLength={maxRangeLength}
              setSelectedDate={setSelectedDate}
              startDate={startDate}
              timezone={timezone}
            />
          )}
        </StyledCalendarRenderer>
        <TimeInput
          date={startDate}
          setDate={handleSetStartDate}
          shouldShowSeconds={shouldShowSeconds}
          timezone={timezone}
        />
      </Tabs.Content>
      <Tabs.Content value="endDate">
        <StyledCalendarRenderer
          calendarOptions={endDateCalendarOptions}
          timezone={timezone}
        >
          {(body: Body) => (
            <Calendar
              calendarBody={body}
              calendarType="endDate"
              endDate={endDate}
              futureDatesDisabled={futureDatesDisabled}
              futureStartDatesDisabled={futureStartDatesDisabled}
              maxRangeLength={maxRangeLength}
              setSelectedDate={setSelectedDate}
              startDate={startDate}
              timezone={timezone}
            />
          )}
        </StyledCalendarRenderer>
        <TimeInput
          date={endDate}
          setDate={handleSetEndDate}
          shouldShowSeconds={shouldShowSeconds}
          timezone={timezone}
        />
      </Tabs.Content>
      {startDateIsAfterEndDate && (
        <Text
          align="center"
          color="danger"
          fillWidth
        >
          End date and time must be after start
        </Text>
      )}
    </BottomPaddingTabs>
  );
};

export interface DateTimeRangePickerProps {
  closeOnDateRangeSelected?: boolean;
  defaultActiveTab?: Tab;
  disabled?: boolean;
  endDate?: Date;
  futureDatesDisabled?: boolean;
  futureStartDatesDisabled?: boolean;
  onSelectDateRange: (
    startDate: Date,
    endDate: Date,
    predefinedDateLabel?: string
  ) => void;
  openDirection?: OpenDirection;
  placeholder?: string;
  predefinedTimesList?: DateRangeListItem[];
  maxRangeLength?: number;
  responsivePositioning?: boolean;
  shouldFireIfInvalid?: boolean;
  shouldShowSeconds?: boolean;
  startDate?: Date;
  timezone?: Timezone;
}

export const DateTimeRangePicker = ({
  closeOnDateRangeSelected = false,
  defaultActiveTab,
  disabled = false,
  endDate,
  futureDatesDisabled = false,
  futureStartDatesDisabled = false,
  maxRangeLength = -1,
  onSelectDateRange,
  openDirection = 'right',
  placeholder = 'start date – end date',
  predefinedTimesList,
  responsivePositioning = true,
  shouldFireIfInvalid = true,
  shouldShowSeconds,
  startDate,
  timezone = 'system',
}: DateTimeRangePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [shouldShowCustomRange, setShouldShowCustomRange] = useState<boolean>(false);
  const [calendarOpenDirection, setCalendarOpenDirection] =
    useState<OpenDirection>(openDirection);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startDate) {
      return;
    }

    const startDateCopy = new Date(startDate);

    const hours =
      timezone === 'UTC' ? startDateCopy.getUTCHours() : startDateCopy.getHours();

    if (hours === 0) {
      if (timezone === 'UTC') {
        startDateCopy.setUTCHours(12);
      } else {
        startDateCopy.setHours(12);
      }
    }

    setSelectedStartDate(startDateCopy);
  }, [startDate, timezone]);

  useEffect(() => {
    if (!endDate) {
      return;
    }

    const endDateCopy = new Date(endDate);

    const hours = timezone === 'UTC' ? endDateCopy.getUTCHours() : endDateCopy.getHours();
    if (hours === 0) {
      if (timezone === 'UTC') {
        endDateCopy.setUTCHours(12);
      } else {
        endDateCopy.setHours(12);
      }
    }

    setSelectedEndDate(endDateCopy);
  }, [endDate, timezone]);

  useLayoutEffect(() => {
    if (shouldShowCustomRange && calendarContainerRef.current) {
      const rect = calendarContainerRef.current.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        setCalendarOpenDirection('left');
      }
    }
  }, [shouldShowCustomRange]);

  const closeDatePicker = useCallback((): void => {
    setIsOpen(false);
    setShouldShowCustomRange(false);
    setCalendarOpenDirection('right');
  }, []);

  const handleOpenChange = useCallback((isOpen: boolean): void => {
    setIsOpen(isOpen);

    if (!isOpen) {
      setShouldShowCustomRange(false);
      setCalendarOpenDirection('right');
    }
  }, []);

  const handleSelectDate = useCallback(
    (selectedDate: Date, calendarType: CalendarType): void => {
      const isMidnight =
        timezone === 'UTC'
          ? selectedDate.getUTCHours() === 0 &&
            selectedDate.getUTCMinutes() === 0 &&
            selectedDate.getUTCSeconds() === 0
          : selectedDate.getHours() === 0 &&
            selectedDate.getMinutes() === 0 &&
            selectedDate.getSeconds() === 0;

      if (isMidnight) {
        // set the time to 12 noon if time hasn't been set yet

        if (timezone === 'UTC') {
          selectedDate.setUTCHours(12);
        } else {
          selectedDate.setHours(12);
        }
      }

      if (calendarType === 'startDate') {
        setSelectedStartDate(selectedDate);

        if (selectedEndDate) {
          if (
            !shouldFireIfInvalid &&
            !dateRangeIsValid({ startDate: selectedDate, endDate: selectedEndDate })
          ) {
            return;
          }

          onSelectDateRange(selectedDate, selectedEndDate);

          if (closeOnDateRangeSelected) {
            closeDatePicker();
          }
        }
      }

      if (calendarType === 'endDate') {
        setSelectedEndDate(selectedDate);

        if (selectedStartDate) {
          if (
            !shouldFireIfInvalid &&
            !dateRangeIsValid({ startDate: selectedStartDate, endDate: selectedDate })
          ) {
            return;
          }

          onSelectDateRange(selectedStartDate, selectedDate);

          if (closeOnDateRangeSelected) {
            closeDatePicker();
          }
        }
      }
    },
    [
      closeDatePicker,
      closeOnDateRangeSelected,
      onSelectDateRange,
      selectedEndDate,
      selectedStartDate,
      shouldFireIfInvalid,
      timezone,
    ]
  );

  const onTriggerKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  }, []);

  const shouldShowPredefinedTimes =
    predefinedTimesList !== undefined && predefinedTimesList.length > 0;

  return (
    <Dropdown
      onOpenChange={handleOpenChange}
      open={isOpen}
    >
      <Dropdown.Trigger
        disabled={disabled}
        onKeyDown={onTriggerKeyDown}
      >
        <DateTimeRangePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          placeholder={placeholder}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
          shouldShowSeconds={shouldShowSeconds}
          timezone={timezone}
        />
      </Dropdown.Trigger>
      <NoOverflowDropdownContent
        align="start"
        responsivePositioning={responsivePositioning}
      >
        <Container orientation="horizontal">
          {shouldShowPredefinedTimes ? (
            <PredefinedCalendarContainer
              gap="none"
              orientation="horizontal"
              padding="none"
            >
              <PredefinedTimes
                onSelectDateRange={onSelectDateRange}
                predefinedTimesList={predefinedTimesList}
                selectedEndDate={selectedEndDate}
                selectedStartDate={selectedStartDate}
                setEndDate={setSelectedEndDate}
                setStartDate={setSelectedStartDate}
                shouldShowCustomRange={shouldShowCustomRange}
                showCustomDateRange={setShouldShowCustomRange}
              />

              {shouldShowCustomRange && (
                <CalendarRendererContainer
                  openDirection={calendarOpenDirection}
                  ref={calendarContainerRef}
                >
                  <TabbedCalendar
                    defaultActiveTab={defaultActiveTab}
                    endDate={selectedEndDate}
                    futureDatesDisabled={futureDatesDisabled}
                    futureStartDatesDisabled={futureStartDatesDisabled}
                    maxRangeLength={maxRangeLength}
                    setEndDate={setSelectedEndDate}
                    setSelectedDate={handleSelectDate}
                    setStartDate={setSelectedStartDate}
                    shouldShowSeconds={Boolean(shouldShowSeconds)}
                    startDate={selectedStartDate}
                    timezone={timezone}
                  />
                </CalendarRendererContainer>
              )}
            </PredefinedCalendarContainer>
          ) : (
            <>
              <TabbedCalendar
                defaultActiveTab={defaultActiveTab}
                endDate={selectedEndDate}
                futureDatesDisabled={futureDatesDisabled}
                futureStartDatesDisabled={futureStartDatesDisabled}
                maxRangeLength={maxRangeLength}
                setEndDate={setSelectedEndDate}
                setSelectedDate={handleSelectDate}
                setStartDate={setSelectedStartDate}
                shouldShowSeconds={Boolean(shouldShowSeconds)}
                startDate={selectedStartDate}
                timezone={timezone}
              />
            </>
          )}
        </Container>
      </NoOverflowDropdownContent>
    </Dropdown>
  );
};
