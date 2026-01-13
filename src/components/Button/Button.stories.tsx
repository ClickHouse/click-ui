import { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

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

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiButton"],
      focus: [".cuiButton"],
      active: [".cuiButton"],
    },
    chromatic: {
      delay: 300,
    },
  },

  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Button Types</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            type="primary"
            label="Primary"
          />
          <Button
            type="secondary"
            label="Secondary"
          />
          <Button
            type="empty"
            label="Empty"
          />
          <Button
            type="danger"
            label="Danger"
          />
        </div>
      </section>

      <section>
        <h3>States</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            type="primary"
            label="Default"
          />
          <Button
            type="primary"
            label="Disabled"
            disabled
          />
          <Button
            type="primary"
            label="Loading"
            loading
          />
        </div>
      </section>

      <section>
        <h3>With Icons</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            type="primary"
            label="Icon Left"
            iconLeft="home"
          />
          <Button
            type="primary"
            label="Icon Right"
            iconRight="home"
          />
          <Button
            type="primary"
            label="Both Icons"
            iconLeft="home"
            iconRight="arrow-right"
          />
        </div>
      </section>

      <section>
        <h3>Alignment & Width</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "400px",
          }}
        >
          <Button
            type="primary"
            label="Left Aligned"
            align="left"
            fillWidth
          />
          <Button
            type="primary"
            label="Center Aligned"
            align="center"
            fillWidth
          />
        </div>
      </section>

      <section>
        <h3>All Types - Disabled</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            type="primary"
            label="Primary"
            disabled
          />
          <Button
            type="secondary"
            label="Secondary"
            disabled
          />
          <Button
            type="empty"
            label="Empty"
            disabled
          />
          <Button
            type="danger"
            label="Danger"
            disabled
          />
        </div>
      </section>
    </div>
  ),
};
