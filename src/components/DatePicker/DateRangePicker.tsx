import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { isSameDate, UseCalendarOptions } from "@h6s/calendar";
import { Dropdown } from "@/components";
import { Body, CalendarRenderer, DateRangePickerInput, DateTableCell } from "./Common";
import { Container } from "@/components";
import { Panel } from "@/components";
import { Icon } from "@/components";
import {
  DateRange,
  datesAreWithinMaxRange,
  isDateRangeTheWholeMonth,
  selectedDateFormatter,
} from "./utils";
import styles from "./DateRangePicker.module.scss";

interface CalendarProps {
  calendarBody: Body;
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  futureStartDatesDisabled: boolean;
  maxRangeLength: number;
  setSelectedDate: (selectedDate: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

const Calendar = ({
  calendarBody,
  closeDatepicker,
  futureDatesDisabled,
  futureStartDatesDisabled,
  maxRangeLength,
  setSelectedDate,
  startDate,
  endDate,
}: CalendarProps) => {
  return calendarBody.value.map(({ key: weekKey, value: week }) => {
    return (
      <tr key={weekKey}>
        {week.map(({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
          const isSelected =
            (startDate && isSameDate(startDate, fullDate)) ||
            (endDate && isSameDate(endDate, fullDate));

          const today = new Date();

          const isCurrentDate = isSameDate(today, fullDate);
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

          const handleMouseEnter = () => {};
          const handleMouseLeave = () => {};

          const handleClick = () => {
            if (isDisabled) {
              return false;
            }
            setSelectedDate(fullDate);

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
            <DateTableCell
              $isCurrentMonth={isCurrentMonth}
              $isDisabled={isDisabled}
              $isSelected={isSelected}
              $isToday={isCurrentDate}
              key={dayKey}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {date}
            </DateTableCell>
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
    <Container
      className={styles.cuiPredefinedDatesContainer}
      data-testid="predefined-dates-list"
      isResponsive={false}
      orientation="vertical"
    >
      <Container
        className={styles.cuiScrollableContainer}
        orientation="vertical"
      >
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

          const formattedText = isWholeMonth
            ? monthFormatter.format(startDate)
            : `${selectedDateFormatter.format(
                startDate
              )} - ${selectedDateFormatter.format(endDate)}`.trim();

          return (
            <Dropdown.Item
              className={styles.cuiStyledDropdownItem}
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
            </Dropdown.Item>
          );
        })}
      </Container>
      <Dropdown.Item
        className={styles.cuiStyledDropdownItem}
        onClick={handleCustomTimePeriodClick}
      >
        <Container
          justifyContent="space-between"
          orientation="horizontal"
        >
          Custom time period <Icon name="chevron-right" />
        </Container>
      </Dropdown.Item>
    </Container>
  );
};

export interface DateRangePickerProps {
  endDate?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  futureStartDatesDisabled?: boolean;
  onSelectDateRange: (selectedStartDate: Date, selectedEndDate: Date) => void;
  placeholder?: string;
  predefinedDatesList?: Array<DateRange>;
  maxRangeLength?: number;
  startDate?: Date;
}

export const DateRangePicker = ({
  endDate,
  startDate,
  disabled = false,
  futureDatesDisabled = false,
  futureStartDatesDisabled = false,
  maxRangeLength = -1,
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
          setSelectedStartDate(undefined);
          return;
        }

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
          <Panel
            className={styles.cuiPredefinedCalendarContainer}
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
              <div className={styles.cuiCalendarRendererContainer}>
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
              </div>
            )}
          </Panel>
        ) : (
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
        )}
      </Dropdown.Content>
    </Dropdown>
  );
};
