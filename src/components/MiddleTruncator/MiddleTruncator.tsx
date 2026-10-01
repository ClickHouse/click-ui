import styles from './MiddleTruncator.module.css';

export const MiddleTruncator = ({
  text,
  trailingChars = 10,
}: {
  text: string;
  trailingChars?: number;
}) => {
  const startText = text.slice(0, -trailingChars);
  const endText = text.slice(-trailingChars);

  return (
    <div
      className={styles.truncator}
      title={text}
      aria-label={text}
    >
      <span className={styles.truncator__start}>{startText}</span>
      <span className={styles.truncator__end}>{endText}</span>
    </div>
  );
};
