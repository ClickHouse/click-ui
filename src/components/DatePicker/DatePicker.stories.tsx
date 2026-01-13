import { Args } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker";

const defaultStory = {
  args: {
    onSelectDate: (date: Date) => {
      console.log("Date selected: ", date);
    },
  },
  argTypes: {
    date: {
      control: "date",
    },
    futureDatesDisabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    onSelectDate: {
      control: "object",
    },
  },
  component: DatePicker,
  render: (args: Args) => {
    const date = args.date ? new Date(args.date) : undefined;
    return (
      <DatePicker
        date={date}
        disabled={args.disabled}
        futureDatesDisabled={args.futureDatesDisabled}
        onSelectDate={args.onSelectDate}
        placeholder={args.placeholder}
      />
    );
  },
  title: "Display/DatePicker",
  tags: ["autodocs"],
};

export default defaultStory;

export const Playground = {
  ...defaultStory,
};

export const Variations = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Default</h4>
            <DatePicker
              onSelectDate={date => console.log("Selected:", date)}
              placeholder="Select a date"
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              With Selected Date
            </h4>
            <DatePicker
              date={new Date("2024-12-15")}
              onSelectDate={date => console.log("Selected:", date)}
            />
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Disabled</h4>
            <DatePicker
              disabled
              onSelectDate={date => console.log("Selected:", date)}
              placeholder="Select a date"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>With Future Dates Disabled</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DatePicker
            futureDatesDisabled
            onSelectDate={date => console.log("Selected:", date)}
            placeholder="Select a past date"
          />
        </div>
      </section>

      <section>
        <h3>With Custom Placeholder</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DatePicker
            onSelectDate={date => console.log("Selected:", date)}
            placeholder="Choose your birthday"
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
