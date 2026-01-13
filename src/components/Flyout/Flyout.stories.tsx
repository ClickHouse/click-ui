import { Button, Link, Text } from "@/components";
import { Flyout, FlyoutProps } from "./Flyout";

interface Props extends FlyoutProps {
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
}: Props) => {
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
export default {
  component: FlyoutExample,
  title: "Display/Flyout",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    alignBody: {
      control: "radio",
      options: ["default", "top"],
      defaultValue: "default",
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

export const Playground = {
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

export const Variations = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}
    >
      <section>
        <h3>Size Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="narrow"
            >
              <Flyout.Header
                type="default"
                title="Narrow Flyout"
                description="Narrow size flyout"
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Narrow flyout content.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header
                type="default"
                title="Default Flyout"
                description="Default size flyout"
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Default flyout content.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="wide"
            >
              <Flyout.Header
                type="default"
                title="Wide Flyout"
                description="Wide size flyout"
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Wide flyout content.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="widest"
            >
              <Flyout.Header
                type="default"
                title="Widest Flyout"
                description="Widest size flyout"
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Widest flyout content.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>
        </div>
      </section>

      <section>
        <h3>Type Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header
                type="default"
                title="Default Type"
                description="Default type flyout with regular padding"
              />
              <Flyout.Body>
                <Flyout.Element type="default">
                  <Text>Default type content with standard spacing.</Text>
                </Flyout.Element>
              </Flyout.Body>
              <Flyout.Footer type="default">
                <Flyout.Close label="Cancel" />
                <Button>Confirm</Button>
              </Flyout.Footer>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header
                type="inline"
                title="Inline Type"
                description="Inline type flyout with compact padding"
              />
              <Flyout.Body>
                <Flyout.Element type="inline">
                  <Text>Inline type content with compact spacing.</Text>
                </Flyout.Element>
              </Flyout.Body>
              <Flyout.Footer type="inline">
                <Flyout.Close label="Cancel" />
                <Button>Confirm</Button>
              </Flyout.Footer>
            </Flyout.Content>
          </Flyout>
        </div>
      </section>

      <section>
        <h3>Alignment Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="start"
              size="default"
            >
              <Flyout.Header
                title="Left Aligned"
                description="Flyout aligned to the left"
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Left-aligned flyout content.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header
                title="Right Aligned"
                description="Flyout aligned to the right"
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Right-aligned flyout content.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>
        </div>
      </section>

      <section>
        <h3>Header Variants</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header
                title="With Close & Separator"
                description="Header with close button and separator"
                showClose={true}
                showSeparator={true}
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Content here.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header
                title="Without Close"
                description="Header without close button"
                showClose={false}
                showSeparator={true}
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Content here.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header
                title="Without Separator"
                showClose={true}
                showSeparator={false}
              />
              <Flyout.Body>
                <Flyout.Element>
                  <Text>Content without separator.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>
        </div>
      </section>

      <section>
        <h3>Body Alignment</h3>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header title="Default Alignment" />
              <Flyout.Body align="default">
                <Flyout.Element>
                  <Text>Body with default alignment.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>

          <Flyout open={true}>
            <Flyout.Content
              strategy="relative"
              align="end"
              size="default"
            >
              <Flyout.Header title="Top Alignment" />
              <Flyout.Body align="top">
                <Flyout.Element>
                  <Text>Body with top alignment.</Text>
                </Flyout.Element>
              </Flyout.Body>
            </Flyout.Content>
          </Flyout>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiFlyoutContent", ".cuiFlyoutHeaderContainer"],
      focus: [".cuiFlyoutContent", ".cuiFlyoutHeaderContainer"],
      focusVisible: [".cuiFlyoutContent", ".cuiFlyoutHeaderContainer"],
    },
  },
};
