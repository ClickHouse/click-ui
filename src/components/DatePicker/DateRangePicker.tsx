import { useCallback, useEffect, useState } from "react";
import { isSameDate, useCalendar, UseCalendarOptions } from "@h6s/calendar";
import { styled } from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import { Container } from "../Container/Container";
import { IconButton } from "../IconButton/IconButton";
import { CalendarRenderer, DateRangePickerInput, DateTableCell, WeekRenderer } from "./Common";

// const locale = "en-US";
// const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
// const headerDateFormatter = new Intl.DateTimeFormat(locale, {
//   month: "short",
//   year: "numeric",
// });

// const explicitWidth = "250px";

// const DatePickerContainer = styled(Container)`
//   background: ${({ theme }) =>
//     theme.click.datePicker.dateOption.color.background.default};
// `;

// const UnselectableTitle = styled.h2`
//   ${({ theme }) => `
//     color: ${theme.click.datePicker.color.title.default};
//     font: ${theme.click.datePicker.typography.title.default};
//   `}

//   user-select: none;
// `;

// const DateTable = styled.table`
//   border-collapse: separate;
//   border-spacing: 0;
//   font: ${({ theme }) => theme.typography.styles.product.text.normal.md}
//   table-layout: fixed;
//   user-select: none;
//   width: ${explicitWidth};

//   thead tr {
//     height: ${({ theme }) => theme.click.datePicker.dateOption.size.height};
//   }

//   tbody {
//     cursor: pointer;
//   }

//   td, th {
//     padding: 4px;
//   }
// `;

// const DateTableHeader = styled.th`
//   ${({ theme }) => `
//     color: ${theme.click.datePicker.color.daytitle.default};
//     font: ${theme.click.datePicker.typography.daytitle.default};
//   `}

//   width: 14%;
// `;

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
  closeDatepicker: () => void;
  futureDatesDisabled: boolean;
  setSelectedDate: (selectedDate: Date) => void;
  startDate?: Date;
  endDate?: Date;
}

const Calendar = ({
  closeDatepicker,
  futureDatesDisabled,
  setSelectedDate,
  startDate,
  endDate,
}: CalendarProps) => {
  const [hoveredDate, setHoveredDate] = useState<Date>();
  // const calendarOptions: UseCalendarOptions = {
  //   defaultWeekStart: 1,
  // };

  // const { body, headers, month, navigation, year } = useCalendar(calendarOptions);

  // const handleNextClick = (): void => {
  //   navigation.toNext();
  // };

  // const handlePreviousClick = (): void => {
  //   navigation.toPrev();
  // };

  // const headerDate = new Date();
  // headerDate.setMonth(month);
  // headerDate.setFullYear(year);

  const handleMouseOut = (): void => {
    setHoveredDate(undefined);
  };

  const weekRenderer: WeekRenderer = ({ date, isCurrentMonth, key: dayKey, value: fullDate }) => {
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
      Boolean(startDate && hoveredDate && fullDate > startDate && fullDate < hoveredDate);

    const handleMouseEnter = () => {
      setHoveredDate(fullDate);
    };

    const handleClick = () => {
      if (isDisabled) {
        return false;
      }
      setSelectedDate(fullDate);

      // User has a date range selected and clicked the selected end date.
      // This will cause the end date to be unselected, thus do not close the datepicker.
      if (startDate && endDate && isSameDate(fullDate, endDate)) {
        return
      }

      // Only close the datepicker if the user hasn't clicked the selected start date.
      if (startDate && !isSameDate(fullDate, startDate)) {
        closeDatepicker();
        return;
      }
    };

    return (
      <DateRangeTableCell
        $shouldShowRangeIndicator={shouldShowRangeIndicator || isBetweenStartAndEndDates}
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
  };

  return (
    <CalendarRenderer
      renderWeek={weekRenderer}
      onMouseOut={handleMouseOut}
    />
  );
  // <DatePickerContainer
  //   data-testid="datepicker-calendar-container"
  //   isResponsive={false}
  //   fillWidth={false}
  //   orientation="vertical"
  //   padding="sm"
  //   onMouseLeave={handleMouseOut}
  // >
  //   <Container
  //     isResponsive={false}
  //     justifyContent="space-between"
  //     orientation="horizontal"
  //   >
  //     <IconButton
  //       icon="chevron-left"
  //       onClick={handlePreviousClick}
  //       size="sm"
  //       type="ghost"
  //     />
  //     <UnselectableTitle>{headerDateFormatter.format(headerDate)}</UnselectableTitle>
  //     <IconButton
  //       icon="chevron-right"
  //       onClick={handleNextClick}
  //       size="sm"
  //       type="ghost"
  //     />
  //   </Container>
  //   <DateTable>
  //     <thead>
  //       <tr>
  //         {headers.weekDays.map(({ key, value: date }) => {
  //           return (
  //             <DateTableHeader key={key}>
  //               {weekdayFormatter.format(date)}
  //             </DateTableHeader>
  //           );
  //         })}
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {body.value.map(({ key: weekKey, value: week }) => {
  //         return (
  //           <tr key={weekKey}>
  // {week.map(

  //               })}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </DateTable>
  //   </DatePickerContainer>
  // );
};

export interface DatePickerProps {
  endDate?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  onSelectDate: (selectedDate: Date) => void;
  placeholder?: string;
  startDate?: Date;
}

export const DateRangePicker = ({
  endDate,
  startDate,
  disabled = false,
  futureDatesDisabled = false,
  onSelectDate,
  placeholder = "start date - end date",
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();

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

  // useEffect(() => {
  //   if (selectedStartDate && selectedEndDate) {
  //     closeDatePicker();
  //   }
  // }, [selectedStartDate, selectedEndDate]);

  const closeDatePicker = () => {
    setIsOpen(false);
  };

  const handleSelectDate = (selectedDate: Date): void => {
    // Start date and end date are selected, user clicks end date.
    // Reset the end date.
    if (selectedEndDate && isSameDate(selectedEndDate, selectedDate)) {
      setSelectedEndDate(undefined);
      return;
    }

    if (selectedStartDate) {
      if (isSameDate(selectedStartDate, selectedDate)) {
        // Start date and end date are selected, user clicks start date.
        // Set the start date to the old end date, reset end date.
        if (selectedEndDate) {
          setSelectedStartDate(selectedEndDate);
          setSelectedEndDate(undefined);
          return;
        }

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
      onSelectDate(selectedDate);
      return;
    }

    setSelectedStartDate(selectedDate);
  };

  return (
    <Dropdown
      onOpenChange={setIsOpen}
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
        <Calendar
          closeDatepicker={closeDatePicker}
          futureDatesDisabled={futureDatesDisabled}
          setSelectedDate={handleSelectDate}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
        />
      </Dropdown.Content>
    </Dropdown>
  );
};
