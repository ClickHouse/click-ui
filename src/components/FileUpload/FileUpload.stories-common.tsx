import type { FC, ReactNode } from 'react';
import styles from './FileUpload.stories-common.module.css';

export const Wrapper: FC<{ children?: ReactNode }> = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);
