import { SelectItemProps } from "./common/types";
import { IconWrapper } from "@/components";
import styles from "./SingleSelectValue.module.scss";

const SingleSelectValue = ({
  valueNode,
  value,
}: {
  valueNode?: SelectItemProps;
  value: string;
}) => {
  if (value === undefined || value === null) {
    return null;
  }

  const { icon, iconDir, children, label } = valueNode ?? {};

  return (
    <div className={styles.cuiSelectValueContainer}>
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
        gap="xxs"
      >
        {label ?? children ?? value}
      </IconWrapper>
    </div>
  );
};

export default SingleSelectValue;
