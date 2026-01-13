import { Alert } from "@/components/Alert/Alert";
import { ICON_NAMES } from "@/components/Icon/types.ts";
import { Container, Link } from "@/components";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

export const Variations: StoryObj<typeof Alert> = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Alert States - Default Type</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Alert
            text="This is a neutral alert message"
            state="neutral"
          />
          <Alert
            text="This is a success alert message"
            state="success"
          />
          <Alert
            text="This is a warning alert message"
            state="warning"
          />
          <Alert
            text="This is a danger alert message"
            state="danger"
          />
          <Alert
            text="This is an info alert message"
            state="info"
          />
        </div>
      </section>

      <section>
        <h3>Alert States - Banner Type</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Alert
            text="This is a neutral banner"
            state="neutral"
            type="banner"
          />
          <Alert
            text="This is a success banner"
            state="success"
            type="banner"
          />
          <Alert
            text="This is a warning banner"
            state="warning"
            type="banner"
          />
          <Alert
            text="This is a danger banner"
            state="danger"
            type="banner"
          />
          <Alert
            text="This is an info banner"
            state="info"
            type="banner"
          />
        </div>
      </section>

      <section>
        <h3>Alert Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Alert
            text="Small alert size"
            state="info"
            size="small"
          />
          <Alert
            text="Medium alert size"
            state="info"
            size="medium"
          />
        </div>
      </section>

      <section>
        <h3>With Titles</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Alert
            title="Success Title"
            text="This alert includes a title above the main message"
            state="success"
          />
          <Alert
            title="Warning Title"
            text="This alert includes a title above the main message"
            state="warning"
            size="medium"
          />
        </div>
      </section>

      <section>
        <h3>Without Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Alert
            text="Success without icon"
            state="success"
            showIcon={false}
          />
          <Alert
            text="Danger without icon"
            state="danger"
            showIcon={false}
          />
        </div>
      </section>

      <section>
        <h3>Custom Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Alert
            text="Alert with custom user icon"
            state="info"
            customIcon="user"
          />
          <Alert
            text="Alert with custom settings icon"
            state="neutral"
            customIcon="settings"
          />
        </div>
      </section>

      <section>
        <h3>Dismissible Alerts</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Alert
            text="This alert can be dismissed"
            state="info"
            dismissible
          />
          <Alert
            title="Dismissible with Title"
            text="This alert has a title and can be dismissed"
            state="warning"
            dismissible
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiWrapper", ".cuiDismissWrapper"],
      focus: [".cuiDismissWrapper"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
