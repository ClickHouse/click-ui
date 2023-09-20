import styled from "styled-components";
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
  onOpenChange,
}: {
  valueNode?: SelectItemProps;
  value: string;
  onOpenChange: (open?: boolean) => void;
}) => {
  const { icon, iconDir, children } = valueNode ?? {};
  if (!value) {
    return null;
  }

  return (
    <SelectValueContainer onClick={() => onOpenChange()}>
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {children ?? value}
      </IconWrapper>
    </SelectValueContainer>
  );
};

export default SingleSelectValue;
