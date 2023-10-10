import { Panel } from "..";
import { Accordion } from "./Accordion";
import { Spacer } from "../Spacer/Spacer";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";

export default {
  component: Accordion,
  title: "Display/Accordion",
  tags: ["accordion", "autodocs"],
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
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
    children,
  },
};
