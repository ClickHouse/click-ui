import { Panel } from "@/components";
import { Accordion } from "./Accordion";
import { Spacer } from "@/components/Spacer/Spacer";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";

export default {
  component: Accordion,
  title: "Accordion/Accordion",
  tags: ["accordion", "autodocs"],
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    gap: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    color: {
      options: ["default", "link"],
      control: { type: "radio" },
    },
  },
};

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

export const Playground = {
  args: {
    title: "Accordion title",
    size: "md",
    gap: "md",
    color: "default",
    fillWidth: false,
    children,
  },
};
