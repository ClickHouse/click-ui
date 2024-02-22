import { Button, Link, Text } from "..";
import { Flyout, FlyoutProps } from "./Flyout";

interface Props extends FlyoutProps {
  title: string;
  description?: string;
  align: "default" | "top";
  type: "default" | "inline";
  size: "default" | "narrow" | "wide";
  width?: string;
}

const FlyoutExample = ({
  title,
  description,
  align,
  type,
  size,
  width,
  ...props
}: Props) => {
  return (
    <Flyout {...props}>
      <Flyout.Trigger>
        <Link>Flyout Trigger</Link>
      </Flyout.Trigger>
      <Flyout.Content
        strategy="fixed"
        size={size}
        width={width}
        align="start"
      >
        <Flyout.Header
          type={type}
          title={title}
          description={description}
        />
        <Flyout.Body align={align}>
          <Flyout.CodeBlock statement="aaaa" />
        </Flyout.Body>
        <Flyout.Footer type={type}>
          <Flyout.Close label="Cancel" />
          <Button>Test Primary</Button>
        </Flyout.Footer>
      </Flyout.Content>
    </Flyout>
  );
};
export default {
  component: FlyoutExample,
  title: "Display/Flyout",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    align: { control: "select", options: ["default", "top"] },
    size: { control: "select", options: ["default", "narrow", "wide"] },
    type: { control: "select", options: ["default", "inline"] },
    width: { control: "text" },
  },
};

export const Playground = {
  args: {
    title: "Title",
    description: "Description",
    align: "default",
    size: "default",
    type: "default",
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
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
