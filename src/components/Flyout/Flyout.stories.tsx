import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Link, Text } from "..";
import { Flyout, FlyoutProps } from "./Flyout";

interface FlyoutExampleProps extends FlyoutProps {
  title: string;
  description?: string;
  alignBody: "default" | "top";
  align: "start" | "end";
  type: "default" | "inline";
  size: "default" | "narrow" | "wide" | "widest";
  width?: string;
}

const FlyoutExample = ({
  title,
  description,
  alignBody,
  type,
  size,
  width,
  align,
  ...props
}: FlyoutExampleProps) => {
  return (
    <Flyout {...props}>
      <Flyout.Trigger>
        <Link>Flyout Trigger</Link>
      </Flyout.Trigger>
      <Flyout.Content
        strategy="fixed"
        align={align}
        size={size}
        width={width}
      >
        <Flyout.Header
          type={type}
          title={title}
          description={description}
        />
        <Flyout.Body align={alignBody}>
          <Flyout.Element type={type}>
            <Text>Flyout content belongs here.</Text>
          </Flyout.Element>
        </Flyout.Body>
        <Flyout.Footer type={type}>
          <Flyout.Close label="Cancel" />
          <Button>Test Primary</Button>
        </Flyout.Footer>
      </Flyout.Content>
    </Flyout>
  );
};

const meta: Meta<typeof FlyoutExample> = {
  component: FlyoutExample,
  subcomponents: {
    "Flyout.Trigger": Flyout.Trigger as React.ComponentType<unknown>,
    "Flyout.Content": Flyout.Content as React.ComponentType<unknown>,
    "Flyout.Header": Flyout.Header as React.ComponentType<unknown>,
    "Flyout.Body": Flyout.Body as React.ComponentType<unknown>,
    "Flyout.Element": Flyout.Element as React.ComponentType<unknown>,
    "Flyout.Footer": Flyout.Footer as React.ComponentType<unknown>,
    "Flyout.Close": Flyout.Close as React.ComponentType<unknown>,
  },
  title: "Display/Flyout",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    alignBody: {
      control: "radio",
      options: ["default", "top"],
      description: "Align the content inside the flyout",
    },
    align: {
      control: "radio",
      options: ["start", "end"],
      description: "Align the flyout",
    },
    size: { control: "select", options: ["default", "narrow", "wide", "widest"] },
    type: { control: "select", options: ["default", "inline"] },
    width: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof FlyoutExample>;

export const Playground: Story = {
  args: {
    title: "Title",
    description: "Description",
    align: "end",
    size: "default",
    type: "default",
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: FlyoutExampleProps; [x: string]: unknown }) => {
          const { title, description, align, size, width, ...props } = story.args;
          return `<Flyout\n
          ${Object.entries(props)
            .flatMap(([key, value]) =>
              typeof value === "boolean"
                ? value
                  ? `  ${key}`
                  : []
                : `  ${key}=${typeof value == "string" ? `"${value}"` : `{${value}}`}`
            )
            .join("\n")}
>

      <Flyout.Content
        strategy="fixed"
        size="${size}"${width ? `\n\t\twidth="${width}"` : "\b"}
      >
        <Flyout.Header
          title="${title}"
          description="${description}"
        />
        <Flyout.Body align="${align}">
          <Flyout.Element>Content1 long text content</Flyout.Element>
        </Flyout.Body>
        <Flyout.Footer>
          <Flyout.Close label="Cancel" />
          <Button>Test Primary</Button>
        </Flyout.Footer>
      </Flyout.Content>
</Flyout>
`;
        },
      },
    },
  },
};
