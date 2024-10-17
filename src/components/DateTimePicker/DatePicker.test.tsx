import { renderCUI } from "@/utils/test-utils";
import { DatePicker } from "./DatePicker";
import userEvent from "@testing-library/user-event";

describe("DatePicker", () => {
  it("opens the calendar on click", async () => {
    const handleSelectDate = vi.fn();

    const { getByTestId, queryByTestId } = renderCUI(
      <DatePicker onSelectDate={handleSelectDate} />
    );

    expect(queryByTestId("datepicker-calendar-container")).not.toBeInTheDocument();

    await userEvent.click(getByTestId("datepicker-input"));

    expect(queryByTestId("datepicker-calendar-container")).toBeVisible();
  });

  it("sets the value of the DatePicker input to the date passed in", () => {
    const handleSelectDate = vi.fn();
    const date = new Date("07-04-2020");
    const { getByDisplayValue } = renderCUI(
      <DatePicker
        date={date}
        onSelectDate={handleSelectDate}
      />
    );

    expect(getByDisplayValue("Jul 04, 2020")).toBeInTheDocument();
  });

  it("calls onSelectDate when a date is selected and passes in the selected date", async () => {
    const handleSelectDate = vi.fn();
    const date = new Date("07-04-2020");

    const { getByTestId, getByText } = renderCUI(
      <DatePicker
        date={date}
        onSelectDate={handleSelectDate}
      />
    );

    await userEvent.click(getByTestId("datepicker-input"));
    await userEvent.click(getByText("22"));

    const selectedDate = handleSelectDate.mock.lastCall?.[0];
    expect(selectedDate).toEqual(new Date("2020-07-22 00:00.00"));
  });
});
