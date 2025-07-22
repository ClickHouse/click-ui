import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { isSameDate, UseCalendarOptions } from "@h6s/calendar";
import { styled } from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import {
  Body,
  CalendarRenderer,
  DateRangePickerInput,
  DateTableCell,
  selectedDateFormatter,
} from "./Common";
import { Container } from "../Container/Container";
import { Panel } from "../Panel/Panel";
import { Icon } from "../Icon/Icon";

const PredefinedCalendarContainer = styled(Panel)`
  align-items: start;
  background: ${({ theme }) => theme.click.panel.color.background.muted};
`;

const PredefinedDatesContainer = styled(Container)`
  width: 275px;
`;

const CalendarRendererContainer = styled.div`
  border: ${({ theme }) =>
    `${theme.click.datePicker.dateOption.stroke} solid ${theme.click.datePicker.dateOption.color.background.range}`};
  left: 276px;
  position: absolute;
  top: 0;
`;

const StyledCalendarRenderer = styled(CalendarRenderer)`
  height: 221px;
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  min-height: 24px;
`;

const ScrollableContainer = styled(Container)`
  max-height: 210px;
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
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  setSelectedDate: (selectedDate: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

const Calendar = ({
  calendarBody,
  closeDatepicker,
  futureDatesDisabled,
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
          const isDisabled = futureDatesDisabled ? fullDate > today : false;
          const isBetweenStartAndEndDates = Boolean(
            startDate && endDate && fullDate > startDate && fullDate < endDate
          );

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

            // Only close the datepicker if the user hasn't clicked the selected start date.
            if (startDate && !isSameDate(fullDate, startDate)) {
              closeDatepicker();
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

const locale = "en-US";
const monthFormatter = new Intl.DateTimeFormat(locale, {
  month: "short",
  year: "numeric",
});

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

const isDateRangeTheWholeMonth = ({ startDate, endDate }: DateRange): boolean => {
  if (startDate.getMonth() !== endDate.getMonth()) {
    return false;
  }

  const normalizedStartDate = new Date(startDate);
  normalizedStartDate.setHours(0, 0, 0, 0);
  const normalizedEndDate = new Date(endDate);
  normalizedEndDate.setHours(0, 0, 0, 0);

  const startDateIsFirstDay = normalizedStartDate.getDate() === 1;

  const endDateNextMonth = new Date(
    normalizedEndDate.getFullYear(),
    normalizedEndDate.getMonth() + 1,
    1
  ).getTime();
  const lastDayOfMonth = new Date(endDateNextMonth - 1).getDate();
  const endDateIsLastDay = normalizedEndDate.getDate() === lastDayOfMonth;

  return startDateIsFirstDay && endDateIsLastDay;
};

interface PredefinedDatesProps {
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  predefinedDatesList: Array<DateRange>;
  selectedEndDate: Date | undefined;
  selectedStartDate: Date | undefined;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  shouldShowCustomRange: boolean;
  showCustomDateRange: Dispatch<SetStateAction<boolean>>;
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

          const isWholeMonth = isDateRangeTheWholeMonth({ startDate, endDate });

          return (
            <StyledDropdownItem
              data-testid={`predefined-date-${startDate.getTime()}`}
              key={startDate.toISOString()}
              onClick={handleItemClick}
            >
              <Container
                data-selected={rangeIsSelected}
                justifyContent="space-between"
                orientation="horizontal"
              >
                {isWholeMonth
                  ? monthFormatter.format(startDate)
                  : `
                  ${selectedDateFormatter.format(startDate)} -
                  ${selectedDateFormatter.format(endDate)}
                `}
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
  endDate?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  placeholder?: string;
  predefinedDatesList?: Array<DateRange>;
  startDate?: Date;
}

export const DateRangePicker = ({
  endDate,
  startDate,
  disabled = false,
  futureDatesDisabled = false,
  onSelectDateRange,
  placeholder = "start date – end date",
  predefinedDatesList,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [shouldShowCustomRange, setShouldShowCustomRange] = useState<boolean>(false);

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

  const handleOpenChange = (isOpen: boolean): void => {
    setIsOpen(isOpen);

    if (!isOpen) {
      setShouldShowCustomRange(false);
    }
  };

  const handleSelectDate = useCallback(
    (selectedDate: Date): void => {
      // Start date and end date are selected, user clicks any date.
      // Set start date to the selected date, clear the end date.
      if (selectedStartDate && selectedEndDate) {
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
    [onSelectDateRange, selectedEndDate, selectedStartDate]
  );

  const shouldShowPredefinedDates =
    predefinedDatesList !== undefined && predefinedDatesList.length > 0;

  return (
    <Dropdown
      onOpenChange={handleOpenChange}
      open={isOpen}
    >
      <Dropdown.Trigger disabled={disabled}>
        <DateRangePickerInput
          data-testid="datepicker-input-container"
          disabled={disabled}
          isActive={isOpen}
          placeholder={placeholder}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
        />
      </Dropdown.Trigger>
      <Dropdown.Content align="start">
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
            />

            {shouldShowCustomRange && (
              <CalendarRendererContainer>
                <StyledCalendarRenderer calendarOptions={calendarOptions}>
                  {body => (
                    <Calendar
                      calendarBody={body}
                      closeDatepicker={closeDatePicker}
                      futureDatesDisabled={futureDatesDisabled}
                      setSelectedDate={handleSelectDate}
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                    />
                  )}
                </StyledCalendarRenderer>
              </CalendarRendererContainer>
            )}
          </PredefinedCalendarContainer>
        ) : (
          <CalendarRenderer calendarOptions={calendarOptions}>
            {body => (
              <Calendar
                calendarBody={body}
                closeDatepicker={closeDatePicker}
                futureDatesDisabled={futureDatesDisabled}
                setSelectedDate={handleSelectDate}
                startDate={selectedStartDate}
                endDate={selectedEndDate}
              />
            )}
          </CalendarRenderer>
        )}
      </Dropdown.Content>
    </Dropdown>
  );
};
