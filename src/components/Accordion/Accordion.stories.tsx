import { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "..";
import { Accordion } from "./Accordion";
import { Spacer } from "../Spacer/Spacer";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Accordion/Accordion",
  tags: ["accordion", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const children = (
  <Panel color="muted">
    <Title type="h2">Content</Title>
    <Spacer />
    <Text>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's standard
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard.
    </Text>
  </Panel>
);

export const Playground: Story = {
  args: {
    title: "Accordion title",
    size: "md",
    gap: "md",
    color: "default",
    fillWidth: false,
    children,
  },
};
