import type { FC } from 'react';
import { styled, css } from 'styled-components';
import { Text } from '@/components/Typography/Text/Text';
import { Icon } from '@/components/Icon/Icon';
import { IconButton } from '@/components/IconButton/IconButton';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { MiddleTruncator } from '@/components/MiddleTruncator';
import { formatFileSize } from '@/utils/file';

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

const FileItemContainer = styled.div<{
  $isError?: boolean;
  $inline?: boolean;
  $size?: 'sm' | 'md';
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.click.fileUpload.sm.space.gap};
  flex: 1;
  min-width: 0;

  ${props =>
    !props.$inline &&
    css`
      background-color: ${({ theme }) => theme.click.fileUpload.color.background.default};
      border: ${({ theme }) =>
        `1px solid ${theme.click.fileUpload.color.stroke.default}`};
      border-radius: ${({ theme }) => theme.click.fileUpload.sm.radii.all};
      padding: ${({ theme }) =>
        `${theme.click.fileUpload.sm.space.y} ${theme.click.fileUpload.sm.space.x}`};

      ${props.$isError &&
      css`
        background-color: ${({ theme }) => theme.click.fileUpload.color.background.error};
        border-color: transparent;
      `}
    `}
`;

const DocumentIcon = styled(Icon)<{ $size?: 'sm' | 'md' }>`
  svg {
    width: ${({ theme, $size }) =>
      $size === 'sm'
        ? theme.click.fileUpload.sm.icon.size.width
        : theme.click.fileUpload.md.icon.size.width};
    height: ${({ theme, $size }) =>
      $size === 'sm'
        ? theme.click.fileUpload.sm.icon.size.height
        : theme.click.fileUpload.md.icon.size.height};
    color: ${({ theme, $size }) =>
      $size === 'sm'
        ? theme.click.fileUpload.sm.color.icon.default
        : theme.click.fileUpload.md.color.icon.default};
  }
`;

const FileUploadDescription = styled(Text)<{ $isError?: boolean }>`
  font: ${({ theme }) => theme.click.fileUpload.typography.description.default};
  color: ${({ theme, $isError }) =>
    $isError
      ? theme.click.fileUpload.color.title.error
      : theme.click.fileUpload.color.description.default};
`;

const FileDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.click.fileUpload.md.space.gap};
  border: none;
  min-width: 0;
`;

const FileActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 0;
`;

const FileContentContainer = styled.div<{ $size: 'sm' | 'md' }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: ${({ $size }) => ($size === 'sm' ? '24px' : 'auto')};
  min-width: 0;
`;

const ProgressBarWrapper = styled.div`
  margin-top: ${({ theme }) => theme.click.fileUpload.md.space.gap};
  margin-bottom: 9px;
`;

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
    <FileItemContainer
      $isError={isError}
      $inline={inline}
      $size={size}
    >
      {showSuccess ? (
        <Icon
          size={'xs'}
          state={'success'}
          name={'check'}
        />
      ) : (
        <DocumentIcon
          name={'document'}
          $size={size}
        />
      )}

      <FileContentContainer $size={size}>
        <FileDetails>
          <MiddleTruncator text={fileName} />
          {showProgress && !showSuccess && (
            <FileUploadDescription>{progress}%</FileUploadDescription>
          )}
        </FileDetails>

        {isError && (
          <FileUploadDescription $isError>{failureMessage}</FileUploadDescription>
        )}

        {showProgress && !showSuccess && (
          <ProgressBarWrapper>
            <ProgressBar
              progress={progress}
              type={'small'}
            />
          </ProgressBarWrapper>
        )}

        {showSuccess && (
          <FileUploadDescription>{formatFileSize(fileSize)}</FileUploadDescription>
        )}
      </FileContentContainer>

      <FileActions>
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
      </FileActions>
    </FileItemContainer>
  );
};
