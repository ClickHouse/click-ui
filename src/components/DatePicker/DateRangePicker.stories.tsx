import { Args, Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "./DateRangePicker";
import { getPredefinedMonthsForDateRangePicker } from "./utils";

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  args: {
    maxRangeLength: undefined,
    onSelectDateRange: (startDate: Date, endDate: Date) => {
      console.log("Date range selected: ", startDate, endDate);
    },
  },
  tags: ["autodocs"],
  title: "Display/DateRangePicker",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    predefinedDatesList: [],
  },
  render: (args: Args) => {
    const endDate = args.endDate ? new Date(args.endDate) : undefined;
    const startDate = args.startDate ? new Date(args.startDate) : undefined;

    return (
      <DateRangePicker
        key="default"
        endDate={endDate}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        futureStartDatesDisabled={args.futureStartDatesDisabled}
        maxRangeLength={args.maxRangeLength}
        onSelectDateRange={args.onSelectDateRange}
        placeholder={args.placeholder}
        startDate={startDate}
      />
    );
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Default</h4>
            <DateRangePicker
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
              placeholder="Select date range"
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              With Selected Range
            </h4>
            <DateRangePicker
              startDate={new Date("2024-12-01")}
              endDate={new Date("2024-12-15")}
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Disabled</h4>
            <DateRangePicker
              disabled
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
              placeholder="Select date range"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>With Max Range Length</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Max 7 Days</h4>
            <DateRangePicker
              maxRangeLength={7}
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
              placeholder="Max 7 days"
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Max 15 Days</h4>
            <DateRangePicker
              maxRangeLength={15}
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
              placeholder="Max 15 days"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>Date Restrictions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Future Dates Disabled
            </h4>
            <DateRangePicker
              futureDatesDisabled
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
              placeholder="Past dates only"
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Future Start Dates Disabled
            </h4>
            <DateRangePicker
              futureStartDatesDisabled
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
              placeholder="Past start dates only"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>With Predefined Dates</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Last 3 Months
            </h4>
            <DateRangePicker
              predefinedDatesList={getPredefinedMonthsForDateRangePicker(-3)}
              onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
              placeholder="Select from predefined"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>With Custom Placeholder</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DateRangePicker
            onSelectDateRange={(start, end) => console.log("Selected:", start, end)}
            placeholder="Choose your date range"
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ['[data-testid="datepicker-input-container"]'],
      focus: ['[data-testid="datepicker-input-container"]'],
    },
    chromatic: {
      delay: 300,
    },
  },
};
