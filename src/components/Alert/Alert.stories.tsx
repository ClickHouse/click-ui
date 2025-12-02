import { Alert } from "@/components/Alert/Alert";
import { ICON_NAMES } from "@/components/Icon/types.ts";
import { Container } from "@/components";

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
        <Link
          href={"https://clickhouse.com/docs"}
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </Link>{" "}
        before progressing
      </>
    ),
    text: (
      <>
        Example demos how you can pass react elements like links to the title prop, with{" "}
        <Link href="https://clickhouse.com/docs">a link</Link>
      </>
    ),
    state: "info",
    size: "medium",
    type: "default",
    showIcon: true,
    dismissible: false,
  },
};
