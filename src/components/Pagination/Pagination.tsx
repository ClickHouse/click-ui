import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Container } from '@/components/Container';
import { IconButton } from '@/components/IconButton';
import { NumberField } from '@/components/NumberField';
import { Select } from '@/components/Select';
import { Text } from '@/components/Text';
import type { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.css';

export const Pagination = ({
  totalPages,
  currentPage,
  maxRowsPerPageList = [],
  rowCount,
  onChange: onChangeProp,
  onPageSizeChange: onPageSizeChangeProp,
  pageSize = -1,
  fillWidth = true,
  gap = 'md',
  justifyContent,
  onNextPageClick,
  onPrevPageClick,
  onPageNumberFocus,
  onPageNumberBlur,
  disableNextButton,
  allowAllRows = true,
  ...props
}: PaginationProps): ReactElement => {
  const hasRowCount = ['number', 'string'].includes(typeof rowCount);
  const inputRef = useRef<HTMLInputElement>(null);
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en').format(value);
  };
  const leftButtonDisabled = currentPage <= 1;
  const rightButtonDisabled =
    (!!totalPages && currentPage === totalPages) || disableNextButton;

  // Holds what the user is typing, so a partial or empty value isn't replaced by currentPage
  const [pageNumberDraft, setPageNumberDraft] = useState<string | null>(null);

  const commitPageNumber = () => {
    if (pageNumberDraft === null) {
      return;
    }

    const pageNumber = parseInt(pageNumberDraft, 10);
    setPageNumberDraft(null);
    if (
      Number.isNaN(pageNumber) ||
      pageNumber < 1 ||
      pageNumber === currentPage ||
      inputRef.current?.disabled ||
      (typeof totalPages !== 'undefined' ? pageNumber > totalPages : false)
    ) {
      return;
    }

    onChangeProp(pageNumber);
  };

  const onPageNumberChange = (value: string) => {
    setPageNumberDraft(value);
  };

  const onPageNumberKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitPageNumber();
    } else if (e.key === 'Escape') {
      setPageNumberDraft(null);
    }
  };

  const onPageNumberBlurHandler: FocusEventHandler<HTMLInputElement> = e => {
    commitPageNumber();
    if (typeof onPageNumberBlur === 'function') {
      onPageNumberBlur(e);
    }
  };

  const onPageSizeChange = (value: string) => {
    if (typeof onPageSizeChangeProp === 'function') {
      onPageSizeChangeProp(Number(value));
    }
  };

  const onPrevClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      if (leftButtonDisabled) {
        return;
      }

      onChangeProp(currentPage - 1);
      if (typeof onPrevPageClick === 'function') {
        onPrevPageClick(e);
      }
    },
    [currentPage, leftButtonDisabled, onChangeProp, onPrevPageClick]
  );

  const onNextClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      if (rightButtonDisabled) {
        return;
      }

      onChangeProp(currentPage + 1);
      if (typeof onNextPageClick === 'function') {
        onNextPageClick(e);
      }
    },
    [currentPage, onChangeProp, onNextPageClick, rightButtonDisabled]
  );

  // if `allowAllRows` is false we need to switch to the first option in the list
  if (pageSize === -1 && !allowAllRows && maxRowsPerPageList.length > 0) {
    pageSize = maxRowsPerPageList[0];
  }

  return (
    <Container
      gap={gap}
      justifyContent={
        justifyContent ??
        (rowCount || maxRowsPerPageList.length > 0 ? 'space-between' : 'center')
      }
      fillWidth={fillWidth}
      {...props}
    >
      {hasRowCount && (
        <Text
          component="div"
          color="muted"
          size="sm"
        >
          {typeof rowCount === 'number' ? formatNumber(rowCount) : rowCount} rows
        </Text>
      )}
      <Container
        gap="xxs"
        fillWidth={false}
      >
        <IconButton
          icon="chevron-left"
          type="ghost"
          disabled={leftButtonDisabled}
          onClick={onPrevClick}
          data-testid="prev-btn"
        />
        <Container
          maxWidth="50px"
          fillWidth={false}
        >
          <NumberField
            ref={inputRef}
            onChange={onPageNumberChange}
            onKeyDown={onPageNumberKeyDown}
            value={pageNumberDraft ?? currentPage}
            loading={false}
            aria-label={currentPage.toString()}
            min={1}
            max={totalPages}
            onFocus={onPageNumberFocus}
            hideControls
            onBlur={onPageNumberBlurHandler}
            disabled={leftButtonDisabled && rightButtonDisabled}
          />
        </Container>
        {!!totalPages && (
          <Text
            component="div"
            color="muted"
            size="sm"
          >
            of {formatNumber(totalPages)}
          </Text>
        )}
        <IconButton
          icon="chevron-right"
          type="ghost"
          disabled={rightButtonDisabled}
          onClick={onNextClick}
          data-testid="next-btn"
        />
      </Container>
      {maxRowsPerPageList.length > 0 && (
        <Select
          className={styles['custom-select']}
          onSelect={onPageSizeChange}
          value={pageSize.toString()}
        >
          {allowAllRows && <Select.Item value="-1">All rows</Select.Item>}
          {maxRowsPerPageList.map(option => (
            <Select.Item
              key={option}
              value={option.toString()}
            >
              {option} rows
            </Select.Item>
          ))}
        </Select>
      )}
    </Container>
  );
};
