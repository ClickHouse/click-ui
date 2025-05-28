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
import { Body, CalendarRenderer, DateRangePickerInput, DateTableCell } from "./Common";
import { Container } from "../Container/Container";
import dayjs from "dayjs";
import { Panel } from "../Panel/Panel";
import { Icon } from "../Icon/Icon";

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

const PredefinedDatesContainer = styled(Container)`
  width: 275px;
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  min-height: 24px;
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

interface DateRange {
  startDate: Date;
  endDate: Date;
}

const getMonthsByNumber = (numberOfMonths: number): Array<DateRange> => {
  const now = dayjs();

  if (numberOfMonths < 0) {
    const lastSixMonths: Array<DateRange> = [];
    for (let i = 0; i < Math.abs(numberOfMonths); i++) {
      const date = now.subtract(i, "month");
      lastSixMonths.push({
        startDate: date.startOf("month").toDate(),
        endDate: i === 0 ? now.toDate() : date.endOf("month").toDate(),
      });
    }

    return lastSixMonths;
  }

  const nextSixMonths: Array<DateRange> = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const date = now.add(i, "month");
    nextSixMonths.push({
      startDate: date.startOf("month").toDate(),
      endDate: i === 0 ? now.toDate() : date.endOf("month").toDate(),
    });
  }

  return nextSixMonths;
};

interface PredefinedDatesProps {
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  predefinedDatesCount: number;
  selectedEndDate: Date | undefined;
  selectedStartDate: Date | undefined;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  shouldShowCustomRange: boolean;
  showCustomDateRange: Dispatch<SetStateAction<boolean>>;
}

const PredefinedDates = ({
  onSelectDateRange,
  predefinedDatesCount,
  selectedEndDate,
  selectedStartDate,
  setEndDate,
  setStartDate,
  shouldShowCustomRange,
  showCustomDateRange,
}: PredefinedDatesProps) => {
  const pastSixMonths = getMonthsByNumber(predefinedDatesCount);

  const handleCustomTimePeriodClick = (event: MouseEvent) => {
    event.preventDefault();
    showCustomDateRange(!shouldShowCustomRange);
  };

  return (
    <PredefinedDatesContainer
      isResponsive={false}
      orientation="vertical"
    >
      {pastSixMonths.map(({ startDate, endDate }) => {
        const handleItemClick = () => {
          setStartDate(startDate);
          setEndDate(endDate);
          onSelectDateRange(startDate, endDate);
        };
        return (
          <StyledDropdownItem
            key={startDate.toISOString()}
            onClick={handleItemClick}
          >
            <Container
              justifyContent="space-between"
              orientation="horizontal"
            >
              {monthFormatter.format(startDate)}
              {selectedEndDate &&
                isSameDate(selectedEndDate, endDate) &&
                selectedStartDate &&
                isSameDate(selectedStartDate, startDate) && <Icon name="check" />}
            </Container>
          </StyledDropdownItem>
        );
      })}
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
  predefinedDatesCount?: number;
  startDate?: Date;
}

export const DateRangePicker = ({
  endDate,
  startDate,
  disabled = false,
  futureDatesDisabled = false,
  onSelectDateRange,
  placeholder = "start date – end date",
  predefinedDatesCount,
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
    predefinedDatesCount !== undefined && predefinedDatesCount !== 0;

  let clampedPredefinedDatesCount = 0;
  if (shouldShowPredefinedDates) {
    if (predefinedDatesCount > 0) {
      clampedPredefinedDatesCount = Math.min(6, predefinedDatesCount);
    } else {
      clampedPredefinedDatesCount = Math.max(-6, predefinedDatesCount);
    }
  }

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
          <Panel
            orientation="horizontal"
            padding="none"
          >
            <PredefinedDates
              onSelectDateRange={onSelectDateRange}
              predefinedDatesCount={clampedPredefinedDatesCount}
              selectedEndDate={selectedEndDate}
              selectedStartDate={selectedStartDate}
              setEndDate={setSelectedEndDate}
              setStartDate={setSelectedStartDate}
              shouldShowCustomRange={shouldShowCustomRange}
              showCustomDateRange={setShouldShowCustomRange}
            />

            {shouldShowCustomRange && (
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
          </Panel>
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
