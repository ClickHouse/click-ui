import { styled } from "styled-components";
import { SelectItemProps } from "./common/types";
import IconWrapper from "../IconWrapper/IconWrapper";

const SelectValueContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: inherit;
`;

const SingleSelectValue = ({
  valueNode,
  value,
}: {
  valueNode?: SelectItemProps;
  value: string;
}) => {
  const { icon, iconDir, children, label } = valueNode ?? {};

  return (
    <SelectValueContainer>
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {label ?? children ?? value}
      </IconWrapper>
    </SelectValueContainer>
  );
};

export default SingleSelectValue;
