import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isSameDate, UseCalendarOptions } from "@h6s/calendar";
import { styled } from "styled-components";
import { Dropdown } from "../Dropdown/Dropdown";
import { Body, CalendarRenderer, DateTimePickerInput, DateTableCell } from "./Common";
import { Container } from "../Container/Container";
import { Panel } from "../Panel/Panel";
import { Icon } from "../Icon/Icon";
import { DateRangeListItem, datesAreWithinMaxRange, Time, timeFormatter } from "./utils";
import dayjs from "dayjs";
import { Text } from "../Typography/Text/Text";

const PredefinedCalendarContainer = styled(Panel)`
  align-items: start;
  background: ${({ theme }) => theme.click.panel.color.background.muted};
`;

const PredefinedTimesContainer = styled(Container)`
  width: 275px;
`;

// left value of 276px is the width of the PredefinedTimesContainer + 1 pixel for border
const CalendarRendererContainer = styled.div`
  border: ${({ theme }) =>
    `${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.background.range}`};
  border-radius: ${({ theme }) => theme.click.datePicker.dateOption.radii.default};
  box-shadow:
    lch(6.77 0 0 / 0.15) 4px 4px 6px -1px,
    lch(6.77 0 0 / 0.15) 2px 2px 4px -1px;
  left: 276px;
  position: absolute;
  top: 0;
`;

// Height of 221px is height the height the calendar needs to match the PredefinedTimesContainer
const StyledCalendarRenderer = styled(CalendarRenderer)`
  border-radius: ${({ theme }) => theme.click.datePicker.dateOption.radii.default};
  min-height: 221px;
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  min-height: 24px;
`;

// max-height of 210px allows the scrollable container to be a reasonble height that matches the calendar
const ScrollableContainer = styled(Container)`
  max-height: 210px;
  overflow-y: auto;
`;

const TimesDropdownItem = styled(StyledDropdownItem)`
  ${({ theme }) => `
    background: ${theme.click.datePicker.dateOption.color.background.default};
    border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.default};
    border-radius: ${theme.click.datePicker.dateOption.radii.default};
    padding: 4px 6px;
  `};

  &:hover {
    ${({ theme }) => `
      background: ${theme.click.datePicker.dateOption.color.background.default};
      border: ${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.stroke.hover};
    `}
  }
`;

// max height calculation: 210px height (matches calendar) + 15px padding top and bottom
const ScrollableTimesContainer = styled(Container)`
  background: ${({ theme }) =>
    theme.click.datePicker.dateOption.color.background.default};
  max-height: 240px;
  overflow-y: auto;
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

interface CalendarProps {
  calendarBody: Body;
  closeDatepicker?: () => void;
  futureDatesDisabled: boolean;
  futureStartDatesDisabled: boolean;
  maxRangeLength: number;
  setSelectedDate: (selectedDate: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

const Calendar = ({
  calendarBody,
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

          if (futureStartDatesDisabled && !startDate && fullDate > today) {
            isDisabled = true;
          }

          if (
            maxRangeLength > 1 &&
            startDate &&
            !datesAreWithinMaxRange(startDate, fullDate, maxRangeLength)
          ) {
            isDisabled = true;
          }

          const shouldShowRangeIndicator =
            !endDate &&
            Boolean(
              startDate && hoveredDate && fullDate > startDate && fullDate < hoveredDate
            );

          const handleMouseEnter = () => {
            setHoveredDate(fullDate);
          };

          const handleClick = () => {
            if (isDisabled) {
              return false;
            }
            setSelectedDate(fullDate);

            // User has a date range selected and clicked a new date.
            // This will cause the selected date to be reset, thus do not close the datepicker.
            if (startDate && endDate) {
              return;
            }

            // The user has selected a new start date, don't close
            if (startDate && fullDate < startDate) {
              return;
            }
          };
          return (
            <DateRangeTableCell
              $shouldShowRangeIndicator={
                !isSelected && (shouldShowRangeIndicator || isBetweenStartAndEndDates)
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
  setEndTimeIsSet: (endTimeIsSetSet: boolean) => void;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setStartTimeIsSet: (startTimeIsSetSet: boolean) => void;
  shouldShowCustomRange: boolean;
  showCustomDateRange: Dispatch<SetStateAction<boolean>>;
}

const PredefinedTimes = ({
  onSelectDateRange,
  predefinedTimesList,
  selectedEndDate,
  selectedStartDate,
  setEndDate,
  setEndTimeIsSet,
  setStartDate,
  setStartTimeIsSet,
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
            setStartTimeIsSet(true);
            setEndTimeIsSet(true);
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

interface TimesListProps {
  setSelectedTime: (selectedTime: Time, event: MouseEvent<HTMLElement>) => void;
}

const TimesList = ({ setSelectedTime }: TimesListProps) => {
  const midnight = dayjs().startOf("day");

  const times = useMemo(() => {
    const times = [];
    for (let i = 0; i < 48; i++) {
      const dayjsDate = midnight.add(i * 30, "minutes");

      const handleItemClick = (event: MouseEvent<HTMLElement>) => {
        setSelectedTime({ hour: dayjsDate.hour(), minutes: dayjsDate.minute() }, event);
      };

      times.push(
        <TimesDropdownItem
          key={dayjsDate.toISOString()}
          onClick={handleItemClick}
        >
          <Container
            justifyContent="space-between"
            orientation="horizontal"
          >
            <Text size="sm">
              {timeFormatter
                .format(dayjsDate.toDate())
                .replace("AM", "am")
                .replace("PM", "pm")}
            </Text>
          </Container>
        </TimesDropdownItem>
      );
    }
    return times;
  }, [midnight, setSelectedTime]);

  return (
    <ScrollableTimesContainer orientation="vertical">{times}</ScrollableTimesContainer>
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
  placeholder = "start date – end date",
  predefinedTimesList,
}: DateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [shouldShowCustomRange, setShouldShowCustomRange] = useState<boolean>(false);
  const [startTimeIsSet, setStartTimeIsSet] = useState<boolean>(false);
  const [endTimeIsSet, setEndTimeIsSet] = useState<boolean>(false);

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
    (selectedDate: Date): void => {
      // Start date and end date are selected, user clicks any date.
      // Set start date to the selected date, clear the end date.
      if (selectedStartDate && selectedEndDate) {
        // If futureStartDatesDisabled is true, only set the selected date to the date clicked if it's before today
        if (futureStartDatesDisabled && selectedDate > new Date()) {
          setSelectedEndDate(undefined);
          setEndTimeIsSet(false);
          return;
        }
        setSelectedStartDate(selectedDate);
        setSelectedEndDate(undefined);
        setStartTimeIsSet(false);
        setEndTimeIsSet(false);
        return;
      }

      if (selectedStartDate) {
        if (isSameDate(selectedStartDate, selectedDate)) {
          // Start date is selected, user clicks start date.
          // Reset the start date.
          setSelectedStartDate(undefined);
          setStartTimeIsSet(false);
          return;
        }

        // Start date is selected, user clicks an earlier date.
        // Set the earlier date to the new start date.
        if (selectedDate < selectedStartDate) {
          setSelectedStartDate(selectedDate);
          setStartTimeIsSet(false);
          return;
        }

        // Otherwise, set the end date to the date the user clicked.
        setSelectedEndDate(selectedDate);
        onSelectDateRange(selectedStartDate, selectedDate);
        return;
      }

      setSelectedStartDate(selectedDate);
    },
    [futureStartDatesDisabled, onSelectDateRange, selectedEndDate, selectedStartDate]
  );

  const handleSelectTime = useCallback(
    (time: Time, event: MouseEvent<HTMLElement>) => {
      if (selectedStartDate && selectedEndDate) {
        const endDateWithTime = dayjs(selectedEndDate)
          .hour(time.hour)
          .minute(time.minutes)
          .toDate();
        setSelectedEndDate(endDateWithTime);
        setEndTimeIsSet(true);
        return;
      }

      // prevent the calendar from closing when selecting anything but the end date's time
      event.preventDefault();

      if (selectedStartDate) {
        const startDateWithTime = dayjs(selectedStartDate)
          .hour(time.hour)
          .minute(time.minutes)
          .toDate();
        setSelectedStartDate(startDateWithTime);
        setStartTimeIsSet(true);
      }
    },
    [selectedEndDate, selectedStartDate]
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
          startTimeIsSet={startTimeIsSet}
          endTimeIsSet={endTimeIsSet}
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
                setEndTimeIsSet={setEndTimeIsSet}
                setStartDate={setSelectedStartDate}
                setStartTimeIsSet={setStartTimeIsSet}
                shouldShowCustomRange={shouldShowCustomRange}
                showCustomDateRange={setShouldShowCustomRange}
              />

              {shouldShowCustomRange && (
                <CalendarRendererContainer>
                  <Container orientation="horizontal">
                    <StyledCalendarRenderer calendarOptions={calendarOptions}>
                      {(body: Body) => (
                        <Calendar
                          calendarBody={body}
                          closeDatepicker={closeDatePicker}
                          futureDatesDisabled={futureDatesDisabled}
                          futureStartDatesDisabled={futureStartDatesDisabled}
                          maxRangeLength={maxRangeLength}
                          setSelectedDate={handleSelectDate}
                          startDate={selectedStartDate}
                          endDate={selectedEndDate}
                        />
                      )}
                    </StyledCalendarRenderer>
                    <TimesList setSelectedTime={handleSelectTime} />
                  </Container>
                </CalendarRendererContainer>
              )}
            </PredefinedCalendarContainer>
          ) : (
            <>
              <CalendarRenderer calendarOptions={calendarOptions}>
                {(body: Body) => (
                  <Calendar
                    calendarBody={body}
                    closeDatepicker={closeDatePicker}
                    futureDatesDisabled={futureDatesDisabled}
                    futureStartDatesDisabled={futureStartDatesDisabled}
                    maxRangeLength={maxRangeLength}
                    setSelectedDate={handleSelectDate}
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                  />
                )}
              </CalendarRenderer>
              <TimesList setSelectedTime={handleSelectTime} />
            </>
          )}
        </Container>
      </Dropdown.Content>
    </Dropdown>
  );
};
