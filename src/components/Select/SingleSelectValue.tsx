import { SelectItemProps } from './common/types';
import { IconWrapper } from '@/components/IconWrapper';
import styles from './SingleSelectValue.module.css';

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
    <div className={styles['select-value-container']}>
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
        gap="xxs"
        isResponsive={false}
      >
        {label ?? children ?? value}
      </IconWrapper>
    </div>
  );
};

export default SingleSelectValue;
