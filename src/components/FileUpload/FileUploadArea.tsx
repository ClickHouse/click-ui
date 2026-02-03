import type { DragEvent } from 'react';
import { styled, css } from 'styled-components';
import { Text } from '@/components/Typography/Text/Text';
import { Title } from '@/components/Typography/Title/Title';
import { Icon } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';

export interface FileUploadAreaProps {
  title: string;
  supportedFileTypes: string[];
  size?: 'sm' | 'md';
  isDragging: boolean;
  isNotSupported: boolean;
  hasFile?: boolean;
  multiple?: boolean;
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

const UploadArea = styled.div<{
  $isDragging: boolean;
  $size: 'sm' | 'md';
  $hasFile: boolean;
  $isError?: boolean;
}>`
  container-type: inline-size;
  container-name: uploadArea;
  box-sizing: border-box;
  width: 100%;
  background-color: ${({ theme }) => theme.click.fileUpload.color.background.default};
  border: ${({ theme }) => `1px solid ${theme.click.fileUpload.color.stroke.default}`};
  border-radius: ${({ theme, $hasFile }) =>
    $hasFile
      ? `${theme.click.fileUpload.sm.radii.all}`
      : `${theme.click.fileUpload.md.radii.all}`};
  padding: ${({ theme, $hasFile, $size }) =>
    $hasFile || $size === 'sm'
      ? `${theme.click.fileUpload.sm.space.y} ${theme.click.fileUpload.sm.space.x}`
      : `${theme.click.fileUpload.md.space.y} ${theme.click.fileUpload.md.space.x}`};
  min-height: ${({ theme, $size }) =>
    $size === 'sm'
      ? `calc(${theme.click.fileUpload.sm.space.y} * 2 + ${theme.sizes[8]})`
      : 'auto'};
  display: flex;
  flex-direction: ${props =>
    props.$hasFile ? 'row' : props.$size === 'sm' ? 'row' : 'column'};
  align-items: center;
  justify-content: ${props =>
    props.$hasFile ? 'space-between' : props.$size === 'sm' ? 'space-between' : 'center'};
  gap: ${({ theme, $size }) =>
    $size === 'sm'
      ? theme.click.fileUpload.sm.space.gap
      : theme.click.fileUpload.md.space.gap};
  cursor: ${props => (props.$hasFile ? 'default' : 'pointer')};
  transition: ${({ theme }) => theme.click.fileUpload.transitions.all};

  ${props =>
    !props.$hasFile &&
    css`
      border-style: dashed;
      border-color: ${({ theme }) => theme.click.fileUpload.color.stroke.default};

      ${props.$isDragging &&
      css`
        background-color: ${({ theme }) =>
          theme.click.fileUpload.color.background.active};
        border-color: ${({ theme }) => theme.click.fileUpload.color.stroke.active};
      `}
    `}

  ${props =>
    props.$isError &&
    css`
      background-color: ${({ theme }) => theme.click.fileUpload.color.background.error};
      border-color: transparent;
    `}
`;

const FileUploadTitle = styled(Title)<{ $isNotSupported: boolean }>`
  font: ${({ theme }) => theme.click.fileUpload.typography.title.default};
  color: ${({ theme, $isNotSupported }) =>
    $isNotSupported
      ? theme.click.fileUpload.color.title.error
      : theme.click.fileUpload.color.title.default};
`;

const FileUploadDescription = styled(Text)`
  font: ${({ theme }) => theme.click.fileUpload.typography.description.default};
  color: ${({ theme }) => theme.click.fileUpload.color.description.default};
`;

const UploadIcon = styled(Icon)`
  svg {
    width: ${({ theme }) => theme.click.fileUpload.md.icon.size.width};
    height: ${({ theme }) => theme.click.fileUpload.md.icon.size.height};
    color: ${({ theme }) => theme.click.fileUpload.md.color.icon.default};
  }
`;

const UploadText = styled.div<{ $size: 'sm' | 'md'; $hasFile: boolean }>`
  text-align: ${props => (props.$hasFile || props.$size === 'sm' ? 'left' : 'center')};
  ${props =>
    (props.$hasFile || props.$size === 'sm') &&
    css`
      flex: 1;
    `}

  ${props =>
    !props.$hasFile &&
    props.$size === 'md' &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    `}
`;

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  title,
  supportedFileTypes,
  size = 'sm',
  isDragging,
  isNotSupported,
  hasFile = false,
  multiple = false,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  children,
}) => {
  return (
    <UploadArea
      $isDragging={isDragging}
      $size={size}
      $hasFile={hasFile}
      $isError={hasFile && !isNotSupported}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={!hasFile ? onClick : undefined}
    >
      {!hasFile ? (
        <>
          <UploadIcon name="upload" />
          <UploadText
            $size={size}
            $hasFile={false}
          >
            {isNotSupported ? (
              <FileUploadTitle
                $isNotSupported
                type="h1"
              >
                Unsupported file type
              </FileUploadTitle>
            ) : (
              <FileUploadTitle
                $isNotSupported={isNotSupported}
                type="h1"
              >
                {title}
              </FileUploadTitle>
            )}
            <FileUploadDescription>
              Files supported: {supportedFileTypes.join(', ')}
            </FileUploadDescription>
          </UploadText>
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
    </UploadArea>
  );
};
