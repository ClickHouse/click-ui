import { Meta, StoryObj } from "@storybook/react-vite";
import { DateDetails } from "./DateDetails";

const meta: Meta<typeof DateDetails> = {
  component: DateDetails,
  title: "Display/DateDetails",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DateDetails>;

export const Playground: Story = {
  args: {
    date: new Date(),
    side: "top",
    size: "sm",
    weight: "normal",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiUnderlinedTrigger",
      focus: ".cuiUnderlinedTrigger",
      active: ".cuiUnderlinedTrigger",
    },
    chromatic: {
      delay: 300,
    },
  },
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}
    >
      <section>
        <h3>Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
            size="xs"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
            size="sm"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
            size="md"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
            size="lg"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
            size="xl"
          />
        </div>
      </section>

      <section>
        <h3>Weights</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24)}
            weight="normal"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24)}
            weight="medium"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24)}
            weight="semibold"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24)}
            weight="bold"
          />
        </div>
      </section>

      <section>
        <h3>Different Time Periods</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DateDetails date={new Date()} />
          <DateDetails date={new Date(Date.now() - 1000 * 60 * 30)} />
          <DateDetails date={new Date(Date.now() - 1000 * 60 * 60 * 2)} />
          <DateDetails date={new Date(Date.now() - 1000 * 60 * 60 * 24)} />
          <DateDetails date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)} />
          <DateDetails date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)} />
          <DateDetails date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)} />
        </div>
      </section>

      <section>
        <h3>Popover Positions</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
            padding: "2rem",
          }}
        >
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Top
            </span>
            <DateDetails
              date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)}
              side="top"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Right
            </span>
            <DateDetails
              date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)}
              side="right"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Bottom
            </span>
            <DateDetails
              date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)}
              side="bottom"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Left
            </span>
            <DateDetails
              date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)}
              side="left"
            />
          </div>
        </div>
      </section>

      <section>
        <h3>With System Timezone</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)}
            systemTimeZone="America/New_York"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)}
            systemTimeZone="Europe/London"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)}
            systemTimeZone="Asia/Tokyo"
          />
        </div>
      </section>

      <section>
        <h3>Size & Weight Combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 12)}
            size="sm"
            weight="normal"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 12)}
            size="md"
            weight="medium"
          />
          <DateDetails
            date={new Date(Date.now() - 1000 * 60 * 60 * 12)}
            size="lg"
            weight="semibold"
          />
        </div>
      </section>

      <section>
        <h3>In Content Context</h3>
        <div style={{ maxWidth: "600px", lineHeight: "1.6" }}>
          <p style={{ margin: 0 }}>
            This item was last updated{" "}
            <DateDetails date={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)} /> and will
            expire{" "}
            <DateDetails
              date={new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)}
              weight="semibold"
            />
            .
          </p>
        </div>
      </section>
    </div>
  ),
};
