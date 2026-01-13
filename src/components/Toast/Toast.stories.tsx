import { Meta, StoryObj } from "@storybook/react-vite";
import { Button, useToast, ToastProps, Toast } from "@/components";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Display/Toast",
  tags: ["form-field", "toast", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

const ToastTrigger = (props: ToastProps) => {
  const { createToast } = useToast();
  return (
    <Button
      onClick={() => {
        createToast(props);
      }}
    >
      Create Toast
    </Button>
  );
};

export const Playground: Story = {
  args: {
    description: "description",
    title: "title",
  },
  render: args => <ToastTrigger {...args} />,
};

export const Variations: Story = {
  render: () => {
    const { createToast } = useToast();

    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}
      >
        <section>
          <h3>Toast Types</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button
              onClick={() =>
                createToast({
                  title: "Default Toast",
                  description: "This is a default informational toast message.",
                  type: "default",
                  duration: 5000,
                })
              }
            >
              Default Toast
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Success",
                  description: "Your action completed successfully.",
                  type: "success",
                  duration: 5000,
                })
              }
            >
              Success Toast
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Warning",
                  description: "Please review this important warning message.",
                  type: "warning",
                  duration: 5000,
                })
              }
            >
              Warning Toast
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Error",
                  description: "An error occurred while processing your request.",
                  type: "danger",
                  duration: 5000,
                })
              }
            >
              Danger Toast
            </Button>
          </div>
        </section>

        <section>
          <h3>Toast with Actions</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button
              onClick={() =>
                createToast({
                  title: "Single Action",
                  description: "Toast with one action button.",
                  type: "default",
                  duration: 5000,
                  actions: [
                    {
                      label: "Undo",
                      altText: "Undo action",
                      type: "secondary",
                      onClick: () => console.log("Undo clicked"),
                    },
                  ],
                })
              }
            >
              Single Action
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Multiple Actions",
                  description: "Toast with multiple action buttons.",
                  type: "default",
                  duration: 5000,
                  actions: [
                    {
                      label: "Cancel",
                      altText: "Cancel action",
                      type: "secondary",
                      onClick: () => console.log("Cancel clicked"),
                    },
                    {
                      label: "Confirm",
                      altText: "Confirm action",
                      type: "primary",
                      onClick: () => console.log("Confirm clicked"),
                    },
                  ],
                })
              }
            >
              Multiple Actions
            </Button>
          </div>
        </section>

        <section>
          <h3>Toast Content Variants</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button
              onClick={() =>
                createToast({
                  title: "Title Only",
                  type: "default",
                  duration: 5000,
                })
              }
            >
              Title Only
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "With Description",
                  description: "This toast includes additional description text.",
                  type: "default",
                  duration: 5000,
                })
              }
            >
              With Description
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Long Content",
                  description:
                    "This toast contains a much longer description to demonstrate how the component handles extended text content. It should wrap appropriately and maintain readability.",
                  type: "default",
                  duration: 5000,
                })
              }
            >
              Long Content
            </Button>
          </div>
        </section>

        <section>
          <h3>Toast Duration Variants</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button
              onClick={() =>
                createToast({
                  title: "Short Duration",
                  description: "Disappears after 2 seconds.",
                  type: "default",
                  duration: 2000,
                })
              }
            >
              2s Duration
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Medium Duration",
                  description: "Disappears after 5 seconds.",
                  type: "default",
                  duration: 5000,
                })
              }
            >
              5s Duration
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Long Duration",
                  description: "Disappears after 10 seconds.",
                  type: "default",
                  duration: 10000,
                })
              }
            >
              10s Duration
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Infinite Duration",
                  description: "Stays until manually closed.",
                  type: "default",
                  duration: Infinity,
                })
              }
            >
              Infinite
            </Button>
          </div>
        </section>

        <section>
          <h3>Toast Alignment</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button
              onClick={() =>
                createToast(
                  {
                    title: "Start Aligned",
                    description: "Toast aligned to the start (left).",
                    type: "default",
                    duration: 5000,
                  },
                  "start"
                )
              }
            >
              Start Alignment
            </Button>

            <Button
              onClick={() =>
                createToast(
                  {
                    title: "End Aligned",
                    description: "Toast aligned to the end (right).",
                    type: "default",
                    duration: 5000,
                  },
                  "end"
                )
              }
            >
              End Alignment
            </Button>
          </div>
        </section>

        <section>
          <h3>Toast Type Variants</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Button
              onClick={() =>
                createToast({
                  title: "Foreground Toast",
                  description: "Announced immediately by screen readers.",
                  type: "default",
                  toastType: "foreground",
                  duration: 5000,
                })
              }
            >
              Foreground
            </Button>

            <Button
              onClick={() =>
                createToast({
                  title: "Background Toast",
                  description: "Announced politely by screen readers.",
                  type: "default",
                  toastType: "background",
                  duration: 5000,
                })
              }
            >
              Background
            </Button>
          </div>
        </section>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiToastRoot", ".cuiToastIcon"],
      focus: [".cuiToastRoot"],
      focusVisible: [".cuiToastRoot"],
    },
  },
};
