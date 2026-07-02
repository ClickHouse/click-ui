import type { DragEvent, FC, ReactNode } from 'react';
import { cn, cva } from '@/lib/cva';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import styles from './FileUploadArea.module.css';

const uploadAreaVariants = cva(styles['upload-area'], {
  variants: {
    radius: {
      sm: styles['upload-area_radius_sm'],
      md: styles['upload-area_radius_md'],
    },
    padding: {
      sm: styles['upload-area_padding_sm'],
      md: styles['upload-area_padding_md'],
    },
    minHeight: {
      sm: styles['upload-area_min-height_sm'],
      md: styles['upload-area_min-height_md'],
    },
    direction: {
      row: styles['upload-area_direction_row'],
      column: styles['upload-area_direction_column'],
    },
    justify: {
      'space-between': styles['upload-area_justify_space-between'],
      center: styles['upload-area_justify_center'],
    },
    gap: {
      sm: styles['upload-area_gap_sm'],
      md: styles['upload-area_gap_md'],
    },
    cursor: {
      default: styles['upload-area_cursor_default'],
      pointer: styles['upload-area_cursor_pointer'],
    },
    dashed: {
      true: styles['upload-area_dashed_true'],
    },
    dragging: {
      true: styles['upload-area_dragging_true'],
    },
    error: {
      true: styles['upload-area_error_true'],
    },
  },
});

const titleVariants = cva(styles.title, {
  variants: {
    notSupported: {
      true: styles['title_not-supported_true'],
    },
  },
});

const uploadTextVariants = cva(styles['upload-text'], {
  variants: {
    centered: {
      true: styles['upload-text_centered_true'],
    },
    grow: {
      true: styles['upload-text_grow_true'],
    },
  },
});

export interface FileUploadAreaProps {
  title: string;
  supportedFileTypes: string[];
  size?: 'sm' | 'md';
  isDragging: boolean;
  isNotSupported: boolean;
  hasFile?: boolean;
  isError?: boolean;
  multiple?: boolean;
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  children?: ReactNode;
}

export const FileUploadArea: FC<FileUploadAreaProps> = ({
  title,
  supportedFileTypes,
  size = 'sm',
  isDragging,
  isNotSupported,
  hasFile = false,
  isError = false,
  multiple = false,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  children,
}) => {
  const isCompact = hasFile || size === 'sm';

  return (
    <div
      className={cn(
        uploadAreaVariants({
          radius: hasFile ? 'sm' : 'md',
          padding: isCompact ? 'sm' : 'md',
          minHeight: size === 'sm' ? 'sm' : 'md',
          direction: hasFile || size === 'sm' ? 'row' : 'column',
          justify: hasFile || size === 'sm' ? 'space-between' : 'center',
          gap: size === 'sm' ? 'sm' : 'md',
          cursor: hasFile ? 'default' : 'pointer',
          dashed: !hasFile,
          dragging: !hasFile && isDragging,
          error: isError,
        })
      )}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={!hasFile ? onClick : undefined}
    >
      {!hasFile ? (
        <>
          <Icon
            name="upload"
            className={styles['upload-icon']}
          />
          <div
            className={cn(
              uploadTextVariants({
                centered: !hasFile && size === 'md',
                grow: hasFile || size === 'sm',
              })
            )}
          >
            {isNotSupported ? (
              <Title
                type="h1"
                className={cn(titleVariants({ notSupported: true }))}
              >
                Unsupported file type
              </Title>
            ) : (
              <Title
                type="h1"
                className={cn(titleVariants({ notSupported: isNotSupported }))}
              >
                {title}
              </Title>
            )}
            <Text className={styles.description}>
              Files supported: {supportedFileTypes.join(', ')}
            </Text>
          </div>
          <Button
            type={'secondary'}
            onClick={e => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            {multiple ? 'Browse files' : 'Browse file'}
          </Button>
        </>
      ) : (
        children
      )}
    </div>
  );
};
