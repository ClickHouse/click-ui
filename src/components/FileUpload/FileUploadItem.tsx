import type { FC } from 'react';
import { cn, cva } from '@/lib/cva';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { ProgressBar } from '@/components/ProgressBar';
import { MiddleTruncator } from '@/components/MiddleTruncator';
import { formatFileSize } from '@/utils/file';
import styles from './FileUploadItem.module.css';

export interface FileUploadItemProps {
  fileName: string;
  fileSize: number;
  progress?: number;
  showSuccess?: boolean;
  showProgress?: boolean;
  failureMessage?: string;
  onRetry?: () => void;
  onRemove?: () => void;
  size?: 'sm' | 'md';
  inline?: boolean;
}

const fileItemContainerVariants = cva(styles['file-item-container'], {
  variants: {
    inline: {
      false: styles['file-item-container_inline_false'],
    },
    error: {
      true: styles['file-item-container_error_true'],
    },
  },
});

const documentIconVariants = cva(styles['document-icon'], {
  variants: {
    size: {
      sm: styles['document-icon_size_sm'],
      md: styles['document-icon_size_md'],
    },
  },
});

const descriptionVariants = cva(styles.description, {
  variants: {
    error: {
      true: styles['description_error_true'],
    },
  },
});

const fileContentContainerVariants = cva(styles['file-content-container'], {
  variants: {
    size: {
      sm: styles['file-content-container_size_sm'],
      md: styles['file-content-container_size_md'],
    },
  },
});

export const FileUploadItem: FC<FileUploadItemProps> = ({
  fileName,
  fileSize,
  progress = 0,
  showSuccess = false,
  showProgress = false,
  failureMessage = 'Upload failed',
  onRetry,
  onRemove,
  size = 'sm',
  inline = false,
}) => {
  const isError = !showSuccess && !showProgress;

  return (
    <div
      className={cn(
        fileItemContainerVariants({
          inline: inline ? undefined : false,
          error: !inline && isError,
        })
      )}
    >
      {showSuccess ? (
        <Icon
          size={'xs'}
          state={'success'}
          name={'check'}
        />
      ) : (
        <Icon
          name={'document'}
          className={cn(documentIconVariants({ size }))}
        />
      )}

      <div className={cn(fileContentContainerVariants({ size }))}>
        <div className={styles['file-details']}>
          <MiddleTruncator text={fileName} />
          {showProgress && !showSuccess && (
            <Text className={styles.description}>{progress}%</Text>
          )}
        </div>

        {isError && (
          <Text className={cn(descriptionVariants({ error: true }))}>
            {failureMessage}
          </Text>
        )}

        {showProgress && !showSuccess && (
          <div className={styles['progress-bar-wrapper']}>
            <ProgressBar
              progress={progress}
              type={'small'}
            />
          </div>
        )}

        {showSuccess && (
          <Text className={styles.description}>{formatFileSize(fileSize)}</Text>
        )}
      </div>

      <div className={styles['file-actions']}>
        {isError && onRetry && (
          <IconButton
            size={'sm'}
            icon={'refresh'}
            type={'ghost'}
            onClick={onRetry}
          />
        )}
        {onRemove && (
          <IconButton
            size={'sm'}
            icon={'cross'}
            type={'ghost'}
            onClick={onRemove}
          />
        )}
      </div>
    </div>
  );
};
