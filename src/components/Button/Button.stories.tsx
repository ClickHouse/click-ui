import { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { SearchField } from "../Input/SearchField";
import { Select } from "../Select/SingleSelect";
import { Container } from "../Container/Container";
import { Title } from "../Typography/Title/Title";
import { Text } from "../Typography/Text/Text";
import Separator from "../Separator/Separator";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Buttons/Button",
  tags: ["button", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
    align: "center",
    fillWidth: false,
    loading: false,
  },
};

/**
 * This story demonstrates an issue where the button's `overflow: hidden`
 * style causes the button to not grow to fit its content inside a flex container.
 * The button text gets clipped because the button doesn't expand to its intrinsic width.
 */
export const FlexContainerTextClipping: Story = {
  render: args => (
    <Container orientation="vertical">
      <Container orientation="vertical">
        <Title type="h2">Issue: Button text clipped in flex container</Title>
        <Text>
          The button has <code>overflow: hidden</code> which causes text to be clipped
          when the button is inside a flex container and doesn't have enough space to
          grow.
        </Text>
      </Container>

      <Separator size="lg" />

      {/* Simulating the exact layout from the screenshot */}
      <Container
        padding="none"
        gap="xs"
        isResponsive={false}
      >
        <Container
          justifyContent="start"
          isResponsive={false}
        >
          <Title
            size="sm"
            type="h2"
          >
            Services
          </Title>
        </Container>
        <SearchField
          placeholder="Search services and warehouses"
          onChange={() => {}}
        />

        {/* Select dropdown */}
        <Container
          isResponsive={false}
          maxWidth="185px"
        >
          <Select placeholder="Sort by warehouse">
            <Select.Item value="warehouse">Sort by warehouse</Select.Item>
            <Select.Item value="name">Sort by name</Select.Item>
            <Select.Item value="date">Sort by date</Select.Item>
          </Select>
        </Container>
        {/* Button that gets clipped */}
        <Button
          {...args}
          label="New service"
          iconLeft="plus"
          type="primary"
        />
      </Container>
    </Container>
  ),
  args: {
    disabled: false,
    loading: false,
  },
};
