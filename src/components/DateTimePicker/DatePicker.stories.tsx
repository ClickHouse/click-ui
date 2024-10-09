import { DatePicker } from "./DatePicker";

export default {
  argTypes: {
    locale: {
      options: ["en-US", "en-GB", "fr-FR", "de-DE", "ru-RU"],
      control: {
        type: "select",
      },
    },
    systemTimeZone: {
      options: [
        "America/Denver",
        "America/Los_Angeles",
        "America/New_York",
        "Asia/Shanghai",
        "Asia/Tokyo",
        "Europe/London",
        "Europe/Berlin",
        "Europe/Moscow",
        "Europe/Rome",
      ],
      control: {
        type: "select",
      },
    },
  },
  component: DatePicker,
  title: "Display/DatePicker",
  tags: ["autodocs"],
};

export const Playground = {
  args: {
    date: new Date(),
    locale: "en-US",
    systemTimeZone: "America/Los_Angeles",
    title: "DatePicker",
  },
};
