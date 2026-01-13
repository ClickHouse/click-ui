import LogosLight from "@/components/Logos/LogosLight";
import { FlagList } from "@/components/icons/Flags";
import { PaymentList } from "@/components/icons/Payments";
import { IconName } from "@/components/types";
import { ICONS_MAP } from "./IconCommon";
import { IconProps, ICON_NAMES } from "./types";
import { useState } from "react";
import styles from "./Icon.stories.module.scss";
import {
  Icon,
  Container,
  SearchField,
  Title,
  Panel,
  Text,
  GridContainer,
  Spacer,
} from "@/components";

const IconNames = Object.keys(ICONS_MAP);
const FlagNames = Object.keys(FlagList);
const LogoNames = Object.keys(LogosLight);
const PaymentNames = Object.keys(PaymentList);

const IconWrapper = (props: IconProps) => (
  <Container>
    <Icon {...props} />
  </Container>
);

export default {
  component: IconWrapper,
  title: "Display/Icon",
  tags: ["icon", "autodocs"],
  argTypes: {
    name: {
      options: [...IconNames, ...FlagNames, ...LogoNames, ...PaymentNames],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      control: { type: "select" },
    },
    state: {
      options: ["default", "info", "success", "warning", "danger", "neutral"],
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    name: "users",
    size: "md",
    state: "default",
    width: "",
    height: "",
  },
};

type IconGalleryProps = {
  name: IconName;
};

const IconGallery = ({ name }: IconGalleryProps) => (
  <Container gap="xs">
    <Panel
      hasBorder
      padding="xs"
    >
      <Icon
        name={name}
        size="md"
      />
    </Panel>
    <Text
      size="sm"
      color="muted"
    >
      {name}
    </Text>
  </Container>
);

const ResponsiveGridContainer = ({
  children,
  ...props
}: React.ComponentProps<typeof GridContainer>) => (
  <GridContainer
    className={styles.cuiResponsiveGridContainer}
    {...props}
  >
    {children}
  </GridContainer>
);

export const Variations = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiIconWrapper",
      focus: ".cuiIconWrapper",
      active: ".cuiIconWrapper",
    },
  },
  render: () => (
    <Container
      orientation="vertical"
      gap="lg"
      maxWidth="1000px"
      style={{ margin: "0 auto" }}
    >
      <section>
        <Title
          type="h3"
          size="md"
        >
          Sizes
        </Title>
        <Container
          gap="md"
          style={{ alignItems: "center" }}
        >
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="users"
              size="xs"
            />
            <Text size="xs">XS</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="users"
              size="sm"
            />
            <Text size="xs">SM</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="users"
              size="md"
            />
            <Text size="xs">MD</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="users"
              size="lg"
            />
            <Text size="xs">LG</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="users"
              size="xl"
            />
            <Text size="xs">XL</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="users"
              size="xxl"
            />
            <Text size="xs">XXL</Text>
          </Container>
        </Container>
      </section>

      <Spacer size="md" />

      <section>
        <Title
          type="h3"
          size="md"
        >
          States
        </Title>
        <Container
          gap="md"
          style={{ alignItems: "center" }}
        >
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="check-in-circle"
              state="default"
            />
            <Text size="xs">Default</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="info-in-circle"
              state="info"
            />
            <Text size="xs">Info</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="check-in-circle"
              state="success"
            />
            <Text size="xs">Success</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="warning"
              state="warning"
            />
            <Text size="xs">Warning</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="cross"
              state="danger"
            />
            <Text size="xs">Danger</Text>
          </Container>
          <Container
            orientation="vertical"
            gap="xs"
            style={{ alignItems: "center" }}
          >
            <Icon
              name="circle"
              state="default"
            />
            <Text size="xs">Neutral</Text>
          </Container>
        </Container>
      </section>

      <Spacer size="md" />

      <section>
        <Title
          type="h3"
          size="md"
        >
          Custom Colors
        </Title>
        <Container
          gap="md"
          style={{ alignItems: "center" }}
        >
          <Icon
            name="star"
            color="red"
          />
          <Icon
            name="star"
            color="gold"
          />
          <Icon
            name="thumbs-up"
            color="blue"
          />
          <Icon
            name="bell"
            color="green"
          />
        </Container>
      </section>

      <Spacer size="md" />

      <section>
        <Title
          type="h3"
          size="md"
        >
          Custom Dimensions
        </Title>
        <Container
          gap="md"
          style={{ alignItems: "center" }}
        >
          <Icon
            name="square"
            width={16}
            height={16}
          />
          <Icon
            name="square"
            width={24}
            height={24}
          />
          <Icon
            name="square"
            width={32}
            height={32}
          />
          <Icon
            name="square"
            width={48}
            height={48}
          />
          <Icon
            name="square"
            width="64px"
            height="64px"
          />
        </Container>
      </section>

      <Spacer size="md" />

      <section>
        <Title
          type="h3"
          size="md"
        >
          Common Icons
        </Title>
        <GridContainer
          gap="md"
          gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        >
          {ICON_NAMES.slice(0, 20).map(iconName => (
            <Panel
              key={iconName}
              hasBorder
              padding="xs"
            >
              <Container
                orientation="vertical"
                gap="xs"
                style={{ alignItems: "center" }}
              >
                <Icon
                  name={iconName}
                  size="md"
                />
                <Text
                  size="xs"
                  color="muted"
                  align="center"
                >
                  {iconName}
                </Text>
              </Container>
            </Panel>
          ))}
        </GridContainer>
      </section>

      <Spacer size="md" />

      <section>
        <Title
          type="h3"
          size="md"
        >
          Flags
        </Title>
        <Container
          gap="md"
          style={{ alignItems: "center", flexWrap: "wrap" }}
        >
          {FlagNames.slice(0, 10).map(flag => (
            <Container
              key={flag}
              orientation="vertical"
              gap="xs"
              style={{ alignItems: "center" }}
            >
              <Icon
                name={flag as IconName}
                size="md"
              />
              <Text
                size="xs"
                color="muted"
              >
                {flag.toUpperCase()}
              </Text>
            </Container>
          ))}
        </Container>
      </section>

      <Spacer size="md" />

      <section>
        <Title
          type="h3"
          size="md"
        >
          Payments
        </Title>
        <Container
          gap="md"
          style={{ alignItems: "center", flexWrap: "wrap" }}
        >
          {PaymentNames.slice(0, 6).map(payment => (
            <Container
              key={payment}
              orientation="vertical"
              gap="xs"
              style={{ alignItems: "center" }}
            >
              <Icon
                name={payment as IconName}
                size="md"
              />
              <Text
                size="xs"
                color="muted"
              >
                {payment}
              </Text>
            </Container>
          ))}
        </Container>
      </section>
    </Container>
  ),
};

export const Icons = () => {
  const [query, setQuery] = useState("");
  return (
    <Container
      orientation="vertical"
      gap="sm"
      maxWidth="1000px"
      style={{ margin: "0 auto" }}
    >
      <Title
        type="h2"
        size="xl"
      >
        Glyph
      </Title>

      <Container
        orientation="vertical"
        gap="md"
      >
        <SearchField
          value={query}
          placeholder="Search icons..."
          onChange={setQuery}
          tabIndex={1}
        />
        <ResponsiveGridContainer>
          {Object.keys(ICONS_MAP)
            .filter(
              key => query === "" || key.toLowerCase().includes(query.toLowerCase())
            )
            .sort()
            .map(key => {
              return (
                <IconGallery
                  key={key}
                  name={key as IconName}
                />
              );
            })}
        </ResponsiveGridContainer>
      </Container>

      <Spacer size="md" />

      <Title
        type="h2"
        size="xl"
      >
        Flags
      </Title>

      <ResponsiveGridContainer>
        {Object.keys(FlagList).map(key => (
          <IconGallery
            key={key}
            name={key as IconName}
          />
        ))}
      </ResponsiveGridContainer>

      <Spacer size="md" />

      <Title
        type="h2"
        size="xl"
      >
        Payments
      </Title>

      <ResponsiveGridContainer>
        {Object.keys(PaymentList).map(key => (
          <IconGallery
            key={key}
            name={key as IconName}
          />
        ))}
      </ResponsiveGridContainer>

      <Spacer size="md" />

      <Title
        type="h2"
        size="xl"
      >
        Logo
      </Title>

      <ResponsiveGridContainer>
        {Object.keys(LogosLight).map(key => (
          <IconGallery
            key={key}
            name={key as IconName}
          />
        ))}
      </ResponsiveGridContainer>
    </Container>
  );
};
