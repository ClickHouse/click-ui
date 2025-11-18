import { Meta, StoryObj } from "@storybook/react-vite";

import { Alert, Container } from "@/components";
import { ICON_NAMES } from "@/components/Icon/types";

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Display/Alert",
  tags: ["alert", "autodocs"],
  argTypes: {
    customIcon: { type: { name: "enum", value: [...ICON_NAMES] } },
  },
  decorators: Story => (
    <Container maxWidth="65%">
      <Story />
    </Container>
  ),
};

export default meta;

export const Playground: StoryObj<typeof Alert> = {
  args: {
    title: "",
    text: "An alert example",
    state: "success",
    size: "small",
    type: "default",
    showIcon: true,
    dismissible: false,
  },
};

export const TitleWithLink: StoryObj<typeof Alert> = {
  args: {
    title: (
      <>
        Important: Please review our{" "}
        <a
          href={"https://clickhouse.com/docs"}
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>{" "}
        before progressing
      </>
    ),
    text: "Example demos how you can pass react elements like links to the title prop",
    state: "info",
    size: "medium",
    type: "default",
    showIcon: true,
    dismissible: false,
  },
};
