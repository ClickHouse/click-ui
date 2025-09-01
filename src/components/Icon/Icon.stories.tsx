import LogosLight from "../Logos/LogosLight";
import { FlagList } from "../icons/Flags";
import { PaymentList } from "../icons/Payments";
import { Icon } from "./Icon";
import { IconName } from "../types";
import { ICONS_MAP } from "./IconCommon";
import { IconProps } from "./types";
import { Container } from "../Container/Container";
import { styled } from "styled-components";
import { useState } from "react";
import { SearchField } from "../Input/SearchField";
import { Title } from "../Typography/Title/Title";
import { Panel } from "../Panel/Panel";
import { Text } from "../Typography/Text/Text";
import { GridContainer } from "../GridContainer/GridContainer";
import { Spacer } from "../Spacer/Spacer";

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

const ResponsiveGridContainer = styled(GridContainer)`
  grid-template-columns: repeat(6, 1fr);
  gap: 1em;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

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
