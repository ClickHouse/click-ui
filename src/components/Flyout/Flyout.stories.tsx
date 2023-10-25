import { Button } from "..";
import { Flyout, FlyoutProps } from "./Flyout";

interface Props extends FlyoutProps {
  title: string;
  description?: string;
  showClose?: boolean;
}

const FlyoutExample = ({ title, description, showClose, ...props }: Props) => {
  return (
    <Flyout {...props}>
      <Flyout.Trigger>Flyout Trigger</Flyout.Trigger>
      <Flyout.Content strategy="fixed">
        <Flyout.Header
          title={title}
          description={description}
        />
        <Flyout.Body>
          <Flyout.Element>Content1 long text content</Flyout.Element>
        </Flyout.Body>
        <Flyout.Footer showClose={showClose}>
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
    showClose: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    title: "Title",
    description: "Description",
    showClose: true,
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { title, description, showClose, ...props } = story.args;
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

      <Flyout.Header
        title="${title}"
        description="${description}"
      />
      <Flyout.Body>
        <Flyout.Element>Content1 long text content</Flyout.Element>
      </Flyout.Body>
      <Flyout.Footer showClose={${showClose}}>
        <Button>Test Primary</Button>
      </Flyout.Footer>
</Flyout>
`;
        },
      },
    },
  },
};