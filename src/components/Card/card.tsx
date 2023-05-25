import styled from "styled-components";
import { S3Logo } from "../../assets/S3Logo/s3-logo";
import { RightArrow } from "../../assets/RightArrow/right-arrow";
import {Badge} from "@/components/Badge/badge";

export type CardState = "active" | "disabled";
export interface CardProps {
  title: string;
  badgeText: string;
  description: string;
  infoUrl: string;
  infoText: string;
  state?: CardState;
}
export const Card = ({
  title,
  badgeText,
  description,
  infoUrl,
  infoText,
  state = "active",
}: CardProps) => (
  <Wrapper state={state}>
    <Header>
      <HeaderLeft>
        <S3Logo />
        <Title>{title}</Title>
      </HeaderLeft>
        <Badge text={badgeText} state={state === 'disabled' ? 'disabled' : 'default'}></Badge>
    </Header>

    <Content>
      <Description>{description}</Description>
    </Content>

    <InfoLink>
      <LinkButton href={infoUrl}>{infoText}</LinkButton>
      <RightArrow />
    </InfoLink>
  </Wrapper>
);

interface WrapperProps {
  state: CardState;
}
const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ state }) =>
    state === "active"
      ? "var(--click-card-color-background-active)"
      : "var(--click-card-color-background-disabled)"};
  border-radius: 4px;
  border: 1px solid #e6e7e9;
  max-width: 420px;
  min-width: 300px;

  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

const Header = styled.div`
  margin-top: 8px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h3`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

const Content = styled.div`
  /* width: 330px; */
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #696e79;
`;

const InfoLink = styled.div`
  display: flex;
  align-items: center;
`;
const LinkButton = styled.a`
  width: max-content;
  text-decoration: none;
  color: #161517;
  font-size: 14px;
  font-weight: 600;
`;
