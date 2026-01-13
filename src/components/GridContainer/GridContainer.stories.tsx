import { GridContainer } from "./GridContainer";
import { Text } from "@/components";
import styles from "./GridContainer.stories.module.scss";

const ContainerExample = ({ ...props }) => {
  return (
    <div className={styles.cuiGridCenter}>
      <GridContainer
        {...props}
        style={{ border: "1px solid grey" }}
      >
        <Text>Parent container</Text>
        <div style={{ border: "1px solid grey" }}>
          <Text>Child</Text>
        </div>
        <div style={{ border: "1px solid grey" }}>
          <Text>Child</Text>
        </div>
        <div style={{ border: "1px solid grey" }}>
          <Text>Child</Text>
        </div>
      </GridContainer>
    </div>
  );
};

export default {
  component: ContainerExample,
  title: "Layout/GridContainer",
  tags: ["grid_container", "autodocs"],
  argTypes: {
    alignContent: {
      control: "select",
      options: [
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch",
        "start",
        "end",
        "left",
        "right",
      ],
    },
    alignItems: { control: "select", options: ["start", "center", "end", "stretch"] },
    columnGap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    gap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    gridAutoFlow: {
      control: "select",
      options: ["row", "column", "row-dense", "column-dense"],
    },

    isResponsive: { control: "boolean" },
    justifyContent: {
      control: "select",
      options: [
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "start",
        "stretch",
        "end",
        "left",
        "right",
      ],
    },
    justifyItems: { control: "select", options: ["start", "center", "end", "stretch"] },
    rowGap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
  },
};

export const Variations = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiGridContainer",
      focus: ".cuiGridContainer",
      active: ".cuiGridContainer",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Gap Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {(["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"] as const).map(gap => (
            <div key={gap}>
              <span
                style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
              >
                Gap: {gap}
              </span>
              <GridContainer
                gap={gap}
                gridTemplateColumns="repeat(3, 1fr)"
                style={{ border: "1px solid grey" }}
              >
                <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 1</div>
                <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 2</div>
                <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 3</div>
              </GridContainer>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Column & Row Gaps</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              Column Gap: lg, Row Gap: xs
            </span>
            <GridContainer
              columnGap="lg"
              rowGap="xs"
              gridTemplateColumns="repeat(3, 1fr)"
              style={{ border: "1px solid grey" }}
            >
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 1</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 2</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 3</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 4</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 5</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Item 6</div>
            </GridContainer>
          </div>
        </div>
      </section>

      <section>
        <h3>Align Items</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {(["start", "center", "end", "stretch"] as const).map(align => (
            <div key={align}>
              <span
                style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
              >
                Align Items: {align}
              </span>
              <GridContainer
                alignItems={align}
                gridTemplateColumns="repeat(3, 1fr)"
                gap="sm"
                style={{ border: "1px solid grey", minHeight: "100px" }}
              >
                <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Short</div>
                <div style={{ border: "1px solid grey", padding: "0.5rem" }}>
                  Medium content
                </div>
                <div style={{ border: "1px solid grey", padding: "0.5rem" }}>
                  Taller content here
                </div>
              </GridContainer>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Justify Content</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {(["start", "center", "end", "space-between", "space-around"] as const).map(
            justify => (
              <div key={justify}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Justify: {justify}
                </span>
                <GridContainer
                  justifyContent={justify}
                  gridTemplateColumns="repeat(3, auto)"
                  gap="sm"
                  style={{ border: "1px solid grey" }}
                >
                  <div style={{ border: "1px solid grey", padding: "0.5rem" }}>
                    Item 1
                  </div>
                  <div style={{ border: "1px solid grey", padding: "0.5rem" }}>
                    Item 2
                  </div>
                  <div style={{ border: "1px solid grey", padding: "0.5rem" }}>
                    Item 3
                  </div>
                </GridContainer>
              </div>
            )
          )}
        </div>
      </section>

      <section>
        <h3>Grid Template Columns</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              repeat(3, 1fr)
            </span>
            <GridContainer
              gridTemplateColumns="repeat(3, 1fr)"
              gap="sm"
              style={{ border: "1px solid grey" }}
            >
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>1</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>2</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>3</div>
            </GridContainer>
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              1fr 2fr 1fr
            </span>
            <GridContainer
              gridTemplateColumns="1fr 2fr 1fr"
              gap="sm"
              style={{ border: "1px solid grey" }}
            >
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>1</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>2</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>3</div>
            </GridContainer>
          </div>
          <div>
            <span
              style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}
            >
              200px 1fr 200px
            </span>
            <GridContainer
              gridTemplateColumns="200px 1fr 200px"
              gap="sm"
              style={{ border: "1px solid grey" }}
            >
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Sidebar</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Main</div>
              <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Sidebar</div>
            </GridContainer>
          </div>
        </div>
      </section>

      <section>
        <h3>Inline Grid</h3>
        <div>
          <GridContainer
            inline
            gridTemplateColumns="repeat(2, auto)"
            gap="sm"
            style={{ border: "1px solid grey" }}
          >
            <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Inline</div>
            <div style={{ border: "1px solid grey", padding: "0.5rem" }}>Grid</div>
          </GridContainer>
          <span style={{ marginLeft: "1rem" }}>Text after inline grid</span>
        </div>
      </section>

      <section>
        <h3>Responsive</h3>
        <div>
          <span style={{ fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>
            Collapses on small screens
          </span>
          <GridContainer
            isResponsive
            gridTemplateColumns="repeat(4, 1fr)"
            gap="md"
            style={{ border: "1px solid grey" }}
          >
            <div style={{ border: "1px solid grey", padding: "0.5rem" }}>1</div>
            <div style={{ border: "1px solid grey", padding: "0.5rem" }}>2</div>
            <div style={{ border: "1px solid grey", padding: "0.5rem" }}>3</div>
            <div style={{ border: "1px solid grey", padding: "0.5rem" }}>4</div>
          </GridContainer>
        </div>
      </section>
    </div>
  ),
};

export const Playground = {
  args: {
    alignContent: "stretch",
    alignItems: "stretch",
    columnGap: "none",
    gap: "",
    gridAutoColumns: "",
    gridAutoFlow: "",
    gridAutoRows: "",
    gridTemplateAreas: "",
    gridTemplateColumns: "",
    gridTemplateRows: "",
    gridTemplate: "",
    inline: false,
    isResponsive: true,
    justifyContent: "stretch",
    justifyItems: "stretch",
    rowGap: "none",
  },
};
