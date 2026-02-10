import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { isSameDate, UseCalendarOptions } from '@h6s/calendar';
import { styled } from 'styled-components';
import { Dropdown } from '../Dropdown/Dropdown';
import { Body, CalendarRenderer, DateTimePickerInput, DateTableCell } from './Common';
import { Container } from '../Container/Container';
import { Panel } from '../Panel/Panel';
import { Icon } from '../Icon/Icon';
import { DateRangeListItem, datesAreWithinMaxRange } from './utils';
import dayjs from 'dayjs';
import { Text } from '../Typography/Text/Text';
import { Tabs } from '../Tabs/Tabs';
import { TextField } from '../Input/TextField';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const calendarFullWidth = '258px';

const PredefinedCalendarContainer = styled(Panel)`
  align-items: start;
  background: ${({ theme }) => theme.click.panel.color.background.muted};
`;

const PredefinedTimesContainer = styled(Container)`
  width: ${calendarFullWidth};
`;

// left value of 259px is the width of the PredefinedTimesContainer + 1 pixel for border
const CalendarRendererContainer = styled.div`
  border: ${({ theme }) =>
    `${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.background.range}`};
  border-radius: ${({ theme }) => theme.click.datePicker.dateOption.radii.default};
  box-shadow:
    lch(6.77 0 0 / 0.15) 4px 4px 6px -1px,
    lch(6.77 0 0 / 0.15) 2px 2px 4px -1px;
  left: 259px;
  position: absolute;
  top: 0;
`;

// Height of 221px is height the height the calendar needs to match the PredefinedTimesContainer
const StyledCalendarRenderer = styled(CalendarRenderer)`
  border-radius: ${({ theme }) => theme.click.datePicker.dateOption.radii.default};
  min-height: 221px;
`;

const StyledTriggerList = styled(Tabs.TriggersList)`
  justify-content: space-around;
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  min-height: 24px;
`;

// max-height of 210px allows the scrollable container to be a reasonble height that matches the calendar
const ScrollableContainer = styled(Container)`
  max-height: 210px;
  overflow-y: auto;
`;

const TimeInputContainer = styled(Container)`
  background: ${({ theme }) =>
    theme.click.datePicker.dateOption.color.background.default};
`;

const DateRangeTableCell = styled(DateTableCell)<{
  $shouldShowRangeIndicator?: boolean;
}>`
  ${({ $shouldShowRangeIndicator, theme }) =>
    $shouldShowRangeIndicator &&
    `
    background: ${theme.click.datePicker.dateOption.color.background.range};
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.background.range};
    border-radius: 0;
    `}
`;

type CalendarType = 'startDate' | 'endDate';
type SetSelectedDate = (selectedDate: Date, calendarType: CalendarType) => void;

interface CalendarProps {
  calendarBody: Body;
  calendarType: CalendarType;
  closeDatepicker?: () => void;
  futureDatesDisabled: boolean;
  futureStartDatesDisabled: boolean;
  maxRangeLength: number;
  setSelectedDate: SetSelectedDate;
  startDate?: Date;
  endDate?: Date;
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
}: CalendarProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date>();

  const handleMouseOut = (): void => {
    setHoveredDate(undefined);
  };

  return calendarBody.value.map(({ key: weekKey, value: week }) => {
    return (
      <tr key={weekKey}>
        {week.map(({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
          const isSelected =
            (startDate && isSameDate(startDate, fullDate)) ||
            (endDate && isSameDate(endDate, fullDate));

          const today = new Date();

          const isCurrentDate = isSameDate(today, fullDate);
          const isBetweenStartAndEndDates = Boolean(
            startDate && endDate && fullDate > startDate && fullDate < endDate
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
            startDate &&
            !datesAreWithinMaxRange(startDate, fullDate, maxRangeLength)
          ) {
            isDisabled = true;
          }

          // start date is selected, end date is not; disable anything before start date
          if (
            calendarType === 'endDate' &&
            startDate &&
            startDate > fullDate &&
            !isSameDate(startDate, fullDate)
          ) {
            isDisabled = true;
          }

          // start date isn't selected, but end date is; disable anything after end date
          if (
            calendarType === 'startDate' &&
            !startDate &&
            endDate &&
            fullDate > endDate
          ) {
            isDisabled = true;
          }

          const startDateSelectedAndIsSelectingEndDate =
            calendarType === 'endDate' &&
            !endDate &&
            Boolean(
              startDate && hoveredDate && fullDate > startDate && fullDate < hoveredDate
            );

          const endDateSelectedAndIsSelectingStartDate =
            calendarType === 'startDate' &&
            !startDate &&
            Boolean(
              endDate && hoveredDate && fullDate < endDate && fullDate > hoveredDate
            );

          const shouldShowRangeIndicator =
            startDateSelectedAndIsSelectingEndDate ||
            endDateSelectedAndIsSelectingStartDate;

          const handleMouseEnter = () => {
            setHoveredDate(fullDate);
          };

          const handleClick = () => {
            console.log('click', fullDate);
            if (isDisabled) {
              return false;
            }
            setSelectedDate(fullDate, calendarType);
          };

          return (
            <DateRangeTableCell
              $shouldShowRangeIndicator={
                shouldShowRangeIndicator || isBetweenStartAndEndDates
              }
              $isCurrentMonth={isCurrentMonth}
              $isDisabled={isDisabled}
              $isSelected={isSelected}
              $isToday={isCurrentDate}
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
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  predefinedTimesList: Array<DateRangeListItem>;
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
            onSelectDateRange(startDate, endDate);
          };

          const rangeIsSelected =
            selectedEndDate &&
            selectedEndDate === endDate &&
            selectedStartDate &&
            selectedStartDate === startDate;

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
          Since a specific date and time <Icon name="chevron-right" />
        </Container>
      </StyledDropdownItem>
    </PredefinedTimesContainer>
  );
};

const validTimeRegex = /^\d{1,2}(:\d{1,2}(:\d{1,2})?)?$/;

interface TimeInputProps {
  date: Date | undefined;
  onSetMeridiem?: () => void;
  setDate: (date: Date) => void;
  shouldShowSeconds: boolean;
}

const TimeInput = ({
  date,
  onSetMeridiem,
  setDate,
  shouldShowSeconds,
}: TimeInputProps) => {
  let dayjsDate = dayjs(date);
  if (!date) {
    dayjsDate = dayjsDate.hour(12).minute(0);
  }

  const formattedDate = shouldShowSeconds
    ? dayjsDate.format('hh:mm:ss')
    : dayjsDate.format('hh:mm');
  const [dateString, setDateString] = useState<string>(formattedDate);
  const [dateIsValid, setDateIsValid] = useState<boolean>(true);
  const [meridiem, setMeridiem] = useState<string>();
  const isEnabled = Boolean(date);

  useEffect(() => {
    if (date) {
      setMeridiem(dayjsDate.format('a'));
    }
  }, [date, dayjsDate]);

  const handleTimeChange = useCallback(
    (newDateString: string) => {
      setDateString(newDateString);

      if (!date) {
        return;
      }

      const trimmedDate = newDateString.trim();
      if (!trimmedDate) {
        return;
      }

      if (!validTimeRegex.test(trimmedDate)) {
        setDateIsValid(false);
        return;
      }

      const [hours, minutes, seconds] = trimmedDate.split(':');

      const hoursAsNumber = parseInt(hours, 10);
      if (Number.isNaN(hoursAsNumber)) {
        setDateIsValid(false);
        return;
      }

      if (hoursAsNumber > 23 || hoursAsNumber < 0) {
        setDateIsValid(false);
        return;
      }

      let parsedDate;
      if (!minutes) {
        parsedDate = dayjs(hours, 'h');
      } else {
        const minutesAsNumber = parseInt(minutes, 10);
        if (Number.isNaN(minutesAsNumber)) {
          setDateIsValid(false);
          return;
        }

        if (minutesAsNumber > 59 || minutesAsNumber < 0) {
          setDateIsValid(false);
          return;
        }

        if (!seconds) {
          parsedDate = dayjs(`${hours}:${minutes}`, 'h:mm');
        } else {
          const secondsAsNumber = parseInt(seconds, 10);

          if (Number.isNaN(secondsAsNumber)) {
            setDateIsValid(false);
            return;
          }

          if (secondsAsNumber > 59 || secondsAsNumber < 0) {
            setDateIsValid(false);
            return;
          }

          parsedDate = dayjs(`${hours}:${minutes}:${seconds}`, 'h:mm:ss');
        }
      }

      if (!parsedDate.isValid()) {
        setDateIsValid(false);
        return;
      }

      if (!parsedDate.isValid()) {
        setDateIsValid(false);
        return;
      }
      setDateIsValid(true);

      let hour = parsedDate.hour();
      if (meridiem === 'pm' && parsedDate.hour() < 12) {
        hour = parsedDate.hour() + 12;
      }
      if (meridiem === 'am' && parsedDate.hour() >= 12) {
        hour = parsedDate.hour() - 12;
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
    [date, meridiem]
  );

  const handleMeridiemChange = useCallback(
    (newMeridiem: string) => {
      setMeridiem(newMeridiem);

      if (newMeridiem === 'pm' && dayjsDate.hour() < 12) {
        const newDate = dayjsDate.hour(dayjsDate.hour() + 12).toDate();

        setDate(newDate);
        if (onSetMeridiem) {
          onSetMeridiem();
        }

        return;
      }

      if (newMeridiem === 'am' && dayjsDate.hour() >= 12) {
        const newDate = dayjsDate.hour(dayjsDate.hour() - 12).toDate();

        setDate(newDate);
        if (onSetMeridiem) {
          onSetMeridiem();
        }

        return;
      }

      if (onSetMeridiem) {
        onSetMeridiem();
      }
    },
    [date]
  );

  return (
    <TimeInputContainer
      gap="sm"
      padding="xs"
      maxWidth={`${calendarFullWidth}`}
      orientation="horizontal"
    >
      <Container maxWidth="10%">
        <label htmlFor="date-time-picker-time-input">
          <Text size="md">Time</Text>
        </label>
      </Container>
      <Container
        gap="md"
        justifyContent="space-evenly"
        orientation="horizontal"
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
            value={dateString}
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

type Tab = 'startDate' | 'endDate';

interface TabbedCalendarProps {
  closeDatePicker: () => void;
  endDate: Date | undefined;
  futureDatesDisabled: boolean;
  futureStartDatesDisabled: boolean;
  maxRangeLength: number;
  setEndDate: (endDate: Date) => void;
  setSelectedDate: SetSelectedDate;
  setStartDate: (startDate: Date) => void;
  shouldShowSeconds: boolean;
  startDate: Date | undefined;
}

const TabbedCalendar = ({
  closeDatePicker,
  endDate,
  futureDatesDisabled,
  futureStartDatesDisabled,
  maxRangeLength,
  setEndDate,
  setSelectedDate,
  setStartDate,
  shouldShowSeconds,
  startDate,
}: TabbedCalendarProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('startDate');
  const hasChangedTab = useRef<boolean>(false);

  const handleTabChange = useCallback(
    (newTab: string) => {
      setActiveTab(newTab as Tab);
      hasChangedTab.current = true;
    },
    [hasChangedTab]
  );

  const handleMeridiemChange = useCallback(() => {
    // We only change to the end date tab after selecting meridiem if we haven't changed tabs yet
    // i.e. it's the first time on start date
    if (!hasChangedTab.current) {
      handleTabChange('endDate');
    }
  }, [hasChangedTab]);

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

  return (
    <Tabs
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
        <StyledCalendarRenderer calendarOptions={startDateCalendarOptions}>
          {(body: Body) => (
            <Calendar
              calendarBody={body}
              calendarType="startDate"
              closeDatepicker={closeDatePicker}
              endDate={endDate}
              futureDatesDisabled={futureDatesDisabled}
              futureStartDatesDisabled={futureStartDatesDisabled}
              maxRangeLength={maxRangeLength}
              setSelectedDate={setSelectedDate}
              startDate={startDate}
            />
          )}
        </StyledCalendarRenderer>
        <TimeInput
          date={startDate}
          onSetMeridiem={handleMeridiemChange}
          setDate={setStartDate}
          shouldShowSeconds={shouldShowSeconds}
        />
      </Tabs.Content>
      <Tabs.Content value="endDate">
        <StyledCalendarRenderer calendarOptions={endDateCalendarOptions}>
          {(body: Body) => (
            <Calendar
              calendarBody={body}
              calendarType="endDate"
              closeDatepicker={closeDatePicker}
              endDate={endDate}
              futureDatesDisabled={futureDatesDisabled}
              futureStartDatesDisabled={futureStartDatesDisabled}
              maxRangeLength={maxRangeLength}
              setSelectedDate={setSelectedDate}
              startDate={startDate}
            />
          )}
        </StyledCalendarRenderer>
        <TimeInput
          date={endDate}
          setDate={setEndDate}
          shouldShowSeconds={shouldShowSeconds}
        />
      </Tabs.Content>
    </Tabs>
  );
};

export interface DateTimePickerProps {
  endDate?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  futureStartDatesDisabled?: boolean;
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  placeholder?: string;
  predefinedTimesList?: Array<DateRangeListItem>;
  maxRangeLength?: number;
  shouldShowSeconds?: boolean;
  startDate?: Date;
}

export const DateTimePicker = ({
  endDate,
  startDate,
  disabled = false,
  futureDatesDisabled = false,
  futureStartDatesDisabled = false,
  maxRangeLength = -1,
  onSelectDateRange,
  placeholder = 'start date – end date',
  predefinedTimesList,
  shouldShowSeconds,
}: DateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [shouldShowCustomRange, setShouldShowCustomRange] = useState<boolean>(false);

  useEffect(() => {
    if (startDate) {
      if (startDate.getHours() === 0) {
        startDate.setHours(12);
      }
      setSelectedStartDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      if (endDate.getHours() === 0) {
        endDate.setHours(12);
      }
      setSelectedEndDate(endDate);
    }
  }, [endDate]);

  const closeDatePicker = useCallback((): void => {
    setIsOpen(false);
    setShouldShowCustomRange(false);
  }, []);

  const handleOpenChange = useCallback((isOpen: boolean): void => {
    setIsOpen(isOpen);

    if (!isOpen) {
      setShouldShowCustomRange(false);
    }
  }, []);

  const handleSelectDate = useCallback(
    (selectedDate: Date, calendarType: CalendarType): void => {
      selectedDate.setHours(12); // set the time to 12 noon

      if (calendarType === 'startDate') {
        setSelectedStartDate(selectedDate);
      }

      if (calendarType === 'endDate' && selectedStartDate) {
        setSelectedEndDate(selectedDate);
        onSelectDateRange(selectedStartDate, selectedDate);
      }
    },
    [onSelectDateRange, selectedStartDate]
  );

  const shouldShowPredefinedTimes =
    predefinedTimesList !== undefined && predefinedTimesList.length > 0;

  return (
    <Dropdown
      onOpenChange={handleOpenChange}
      open={isOpen}
    >
      <Dropdown.Trigger disabled={disabled}>
        <DateTimePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          placeholder={placeholder}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
          shouldShowSeconds={shouldShowSeconds}
        />
      </Dropdown.Trigger>
      <Dropdown.Content align="start">
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
                <CalendarRendererContainer>
                  <TabbedCalendar
                    closeDatepicker={closeDatePicker}
                    endDate={selectedEndDate}
                    futureDatesDisabled={futureDatesDisabled}
                    futureStartDatesDisabled={futureStartDatesDisabled}
                    maxRangeLength={maxRangeLength}
                    setEndDate={setSelectedEndDate}
                    setSelectedDate={handleSelectDate}
                    setStartDate={setSelectedStartDate}
                    shouldShowSeconds={Boolean(shouldShowSeconds)}
                    startDate={selectedStartDate}
                  />
                </CalendarRendererContainer>
              )}
            </PredefinedCalendarContainer>
          ) : (
            <>
              <TabbedCalendar
                closeDatepicker={closeDatePicker}
                endDate={selectedEndDate}
                futureDatesDisabled={futureDatesDisabled}
                futureStartDatesDisabled={futureStartDatesDisabled}
                maxRangeLength={maxRangeLength}
                setEndDate={setSelectedEndDate}
                setSelectedDate={handleSelectDate}
                setStartDate={setSelectedStartDate}
                shouldShowSeconds={Boolean(shouldShowSeconds)}
                startDate={selectedStartDate}
              />
            </>
          )}
        </Container>
      </Dropdown.Content>
    </Dropdown>
  );
};
