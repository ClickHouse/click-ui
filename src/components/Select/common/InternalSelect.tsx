import {
  Children,
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NoAvailableOptionsFactoryProps,
  SelectContainerProps,
  SelectGroupProps,
  SelectItemProps,
} from './types';
import { Error, FormElementContainer, FormRoot } from '@/components/FormContainer';
import { Portal } from '@radix-ui/react-popover';
import { Checkbox } from '@/components/Checkbox';
import type { CheckboxVariants } from '@/components/Checkbox';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Label } from '@/components/Label';
import { Separator } from '@/components/Separator';
import { Text } from '@/components/Text';
import type { TextProps } from '@/components/Text';

import {
  SelectPopoverContent,
  SearchBar,
  SearchBarContainer,
  SelectList,
  SelectListContent,
  SelectPopoverRoot,
  StyledSelectTrigger,
  SelectValue,
  HiddenSelectElement,
  SelectGroupContainer,
  SelectGroupName,
  SelectGroupContent,
  SelectNoDataContainer,
  SelectItemDescriptionText,
  selectStyles,
} from './SelectComponents';
import { OptionContext } from './OptionContext';
import { MultiSelectValue } from '../MultiSelectValue';
import SingleSelectValue from '../SingleSelectValue';
import { useOption, useSearch } from './useOption';
import { mergeRefs } from '@/utils/mergeRefs';
import { GenericMenuItem } from '@/components/GenericMenu';
import { IconWrapper } from '@/components/IconWrapper';
import { useInputModality } from '@/hooks/internal';
import { cn } from '@/lib/cva';
import { useResolvedPortalContainer } from '@/providers/PortalContext';

type NormalizedOption = {
  value: string;
  disabled?: boolean;
};

type RegisterItem = (value: string, nodeProps: SelectItemProps) => void;

interface NoOptionsDisplayProps {
  allowCreateOption: boolean;
  search: string;
  customText: string;
  noAvailableOptions: boolean | ((props: NoAvailableOptionsFactoryProps) => ReactNode);
  onCreateOption: (e: MouseEvent<HTMLDivElement>) => void;
  onOpenChange: (open: boolean) => void;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

const NoOptionsDisplay: React.FC<NoOptionsDisplayProps> = ({
  allowCreateOption,
  search,
  customText,
  noAvailableOptions,
  onCreateOption,
  onOpenChange,
  containerProps,
}) => {
  const getCustomTextWithSearch = (text: string) => text.replaceAll('{search}', search);

  const getDefaultMessage = () =>
    `No Options found${search.length > 0 ? ` for "${search}" ` : ''}`;

  const getNoAvailableOptionsNode = (): ReactNode => {
    if (typeof noAvailableOptions === 'boolean') {
      return noAvailableOptions ? getDefaultMessage() : null;
    }

    // ReactNode
    return noAvailableOptions({
      search,
      close: (): void => onOpenChange(false),
    });
  };

  // Determine node to render when there are no options
  const hasCustomText = customText.length > 0;
  const hasSearchInput = search.length > 0;
  const shouldShowCreateOption = allowCreateOption && hasSearchInput;

  let noOptionsNode: ReactNode = null;

  if (shouldShowCreateOption) {
    noOptionsNode = hasCustomText ? getCustomTextWithSearch(customText) : `Add ${search}`;
  } else if (hasCustomText) {
    noOptionsNode = getCustomTextWithSearch(customText);
  } else {
    noOptionsNode = getNoAvailableOptionsNode();
  }

  if (!noOptionsNode) {
    return null;
  }

  const handleNoOptionsClick = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldShowCreateOption) {
      onCreateOption(e);
      onOpenChange(false);
    }
  };

  const isCustomReactNode = typeof noAvailableOptions === 'function';
  if (isCustomReactNode) {
    return (
      <Container
        onClick={handleNoOptionsClick}
        {...containerProps}
      >
        {noOptionsNode}
      </Container>
    );
  }

  return (
    <SelectNoDataContainer
      onClick={handleNoOptionsClick}
      $clickable={allowCreateOption}
      {...containerProps}
    >
      {noOptionsNode}
    </SelectNoDataContainer>
  );
};

const childrenToNormalizedOptions = (
  children: ReactNode,
  register: RegisterItem
): NormalizedOption[] => {
  return Children.toArray(children).flatMap(child => {
    if (isValidElement(child) && child && typeof child === 'object') {
      const type = child.type as FunctionComponent;
      if (type.displayName === 'Select.Group') {
        return childrenToNormalizedOptions(child.props.children, register);
      } else if (type.displayName === 'Select.Item') {
        const { value, disabled } = child.props;
        register(value, child.props);
        return { value, disabled };
      } else if ('props' in child && child.props.children) {
        return childrenToNormalizedOptions(child.props.children, register);
      }
    }
    return [];
  });
};

export const InternalSelect = ({
  label,
  children,
  orientation,
  dir,
  disabled,
  id,
  error,
  value: selectedValues,
  onChange,
  onSelect,
  open,
  onOpenChange,
  name,
  form,
  allowCreateOption = false,
  customText = '',
  options,
  sortable = false,
  placeholder = 'Select an option',
  maxHeight,
  multiple,
  checkbox,
  selectLabel,
  showSearch = false,
  container,
  useFullWidthItems = false,
  itemCharacterLimit = '64ch',
  noAvailableOptions = true,
  triggerProps,
  ...props
}: SelectContainerProps) => {
  const defaultId = useId();
  const [search, setSearch] = useState('');
  const [highlighted, setHighlighted] = useState<string | undefined>();
  // value -> lowercased rendered text (item + its group heading).
  const [searchSource, setSearchSource] = useState<Map<string, string>>(() => new Map());
  const valueNode = useRef<Map<string, SelectItemProps>>(new Map());

  const registerValueNode = useCallback<RegisterItem>((value, nodeProps) => {
    valueNode.current.set(value, nodeProps);
  }, []);

  const normalizedOptions = useMemo<NormalizedOption[]>(() => {
    if (options) {
      return options.flatMap(option => {
        if ('options' in option) {
          return (option.options ?? []).map(item => {
            valueNode.current.set(item.value, item);
            return { value: item.value, disabled: item.disabled };
          });
        }
        valueNode.current.set(option.value, option);
        return { value: option.value, disabled: option.disabled };
      });
    } else if (children) {
      return childrenToNormalizedOptions(children, registerValueNode);
    }

    return [];
  }, [children, options, registerValueNode]);

  // Radix mounts the popover content a commit after `open` flips, so the item
  // text is read once the list node itself commits.
  const listRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) {
        return;
      }
      const next = new Map<string, string>();
      node.querySelectorAll<HTMLElement>('[cui-select-item][data-value]').forEach(el => {
        const value = el.getAttribute('data-value');
        if (value === null) {
          return;
        }
        const group = el.closest('[cui-select-group]');
        const heading =
          group?.querySelector('[cui-select-group-name]')?.textContent ?? '';
        next.set(value, `${el.textContent ?? ''} ${heading}`.toLowerCase());
      });
      setSearchSource(next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- depend on normalizedOptions to re-read DOM if options change
    [normalizedOptions]
  );

  const matchedOptions = useMemo(() => {
    if (search === '') {
      return normalizedOptions;
    }
    const searchLowerCase = search.toLowerCase();
    return normalizedOptions.filter(item =>
      (searchSource.get(item.value) ?? '').includes(searchLowerCase)
    );
  }, [search, normalizedOptions, searchSource]);

  const visibleValues = useMemo(
    () => new Set(matchedOptions.map(o => o.value)),
    [matchedOptions]
  );
  const navigableValues = useMemo(
    () => matchedOptions.filter(o => !o.disabled).map(o => o.value),
    [matchedOptions]
  );

  // `highlighted` is the user's last pointer; honor it only while it stays navigable.
  const effectiveHighlight =
    highlighted && navigableValues.includes(highlighted)
      ? highlighted
      : navigableValues[0];

  const inputRef = useRef<HTMLInputElement>(null);
  const inputModalityProps = useInputModality();
  const portalContainer = useResolvedPortalContainer(container);

  const onFocus = () => {
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearch('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!e.defaultPrevented) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (effectiveHighlight) {
          onSelect(effectiveHighlight, undefined, e);
        } else if (matchedOptions.length === 0 && allowCreateOption) {
          onSelect(search, 'custom', e);
        }
      } else if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        let nextHighlightedValue = effectiveHighlight;
        const highlightedIndex = navigableValues.findIndex(
          value => value === effectiveHighlight
        );
        if (e.key === 'ArrowUp') {
          if (highlightedIndex === 0) {
            nextHighlightedValue = navigableValues[navigableValues.length - 1];
          } else {
            nextHighlightedValue = navigableValues[highlightedIndex - 1];
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (highlightedIndex === navigableValues.length - 1) {
            nextHighlightedValue = navigableValues[0];
          } else {
            nextHighlightedValue = navigableValues[highlightedIndex + 1];
          }
        } else if (e.key === 'End') {
          e.preventDefault();
          nextHighlightedValue = navigableValues[navigableValues.length - 1];
        } else if (e.key === 'Home') {
          nextHighlightedValue = navigableValues[0];
          e.preventDefault();
        }
        setHighlighted(nextHighlightedValue);
      }
    }
  };
  const isHidden = useCallback(
    (value?: string) => !visibleValues.has(value ?? ''),
    [visibleValues]
  );

  const optionContextValue = useMemo(() => {
    return {
      search,
      updateHighlighted: setHighlighted,
      highlighted: effectiveHighlight,
      isHidden,
      onSelect,
      selectedValues,
    };
  }, [search, effectiveHighlight, isHidden, onSelect, selectedValues]);

  const onCreateOption = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (allowCreateOption) {
      onSelect(search, 'custom', e);
    }
  };

  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
      {...props}
    >
      <FormElementContainer>
        <SelectPopoverRoot
          open={open}
          onOpenChange={onOpenChange}
          modal={true}
        >
          <StyledSelectTrigger
            id={id ?? defaultId}
            $error={!!error}
            disabled={disabled}
            data-testid="select-trigger"
            {...triggerProps}
          >
            <SelectValue>
              {selectedValues.length === 0 ? (
                placeholder
              ) : multiple ? (
                <MultiSelectValue
                  disabled={disabled ?? false}
                  onSelect={onSelect}
                  selectedValues={selectedValues}
                  sortable={!disabled && sortable}
                  valueNode={valueNode.current}
                  onChange={onChange}
                />
              ) : (
                <SingleSelectValue
                  valueNode={
                    checkbox && selectLabel
                      ? { label: selectLabel as string, value: selectLabel as string }
                      : valueNode.current.get(selectedValues[0])
                  }
                  value={selectedValues[0]}
                />
              )}
            </SelectValue>
            <Icon
              name="sort"
              size="sm"
            />
          </StyledSelectTrigger>
          {form && (
            <HiddenSelectElement
              multiple={multiple}
              name={name}
              form={form}
              value={selectedValues}
              onChange={() => null}
            >
              {normalizedOptions.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.value}
                </option>
              ))}
            </HiddenSelectElement>
          )}
          <Portal container={portalContainer}>
            <SelectPopoverContent
              {...inputModalityProps}
              sideOffset={5}
              onFocus={onFocus}
              onCloseAutoFocus={() => {
                setSearch('');
              }}
              align="start"
              $useFullWidthItems={useFullWidthItems}
              $itemCharacterLimit={itemCharacterLimit}
            >
              <SelectList>
                <SearchBarContainer $showSearch={showSearch}>
                  <SearchBar
                    ref={inputRef}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    data-testid="select-search-input"
                    onKeyDown={onKeyDown}
                    $showSearch={showSearch}
                  />
                  <IconButton
                    className={cn(
                      selectStyles['search-close'],
                      search.length > 0 && selectStyles['search-close_show-close']
                    )}
                    htmlType="button"
                    icon="cross"
                    onClick={clearSearch}
                    data-testid="select-search-close"
                    size="xs"
                  />
                </SearchBarContainer>
                <SelectListContent
                  ref={listRef}
                  $maxHeight={maxHeight}
                >
                  <OptionContext.Provider value={optionContextValue}>
                    {options && options.length > 0
                      ? options.map((props, index) => {
                          if ('options' in props) {
                            const { options: itemList = [], ...groupProps } = props;
                            return (
                              <SelectGroup
                                key={`select-${id}-group-${index}`}
                                {...groupProps}
                              >
                                {itemList.map((itemProps, itemIndex) => {
                                  if (checkbox) {
                                    return (
                                      <MultiSelectCheckboxItem
                                        key={`select-${id}-group-${index}-item-${itemIndex}`}
                                        {...itemProps}
                                      />
                                    );
                                  }
                                  return (
                                    <SelectItem
                                      key={`select-${id}-group-${index}-item-${itemIndex}`}
                                      {...itemProps}
                                    />
                                  );
                                })}
                              </SelectGroup>
                            );
                          } else {
                            if (checkbox) {
                              return (
                                <MultiSelectCheckboxItem
                                  key={`select-${id}-item-${index}`}
                                  {...props}
                                />
                              );
                            }
                            return (
                              <SelectItem
                                key={`select-${id}-item-${index}`}
                                {...props}
                              />
                            );
                          }
                        })
                      : children}
                  </OptionContext.Provider>
                </SelectListContent>
                {matchedOptions.length === 0 &&
                  (allowCreateOption || !!noAvailableOptions) && (
                    <NoOptionsDisplay
                      allowCreateOption={allowCreateOption}
                      search={search}
                      customText={customText}
                      noAvailableOptions={noAvailableOptions}
                      onCreateOption={onCreateOption}
                      onOpenChange={onOpenChange}
                      containerProps={props}
                    />
                  )}
              </SelectList>
            </SelectPopoverContent>
          </Portal>
        </SelectPopoverRoot>
        {!!error && error !== true && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
          error={!!error}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, heading, ...props }, forwardedRef) => {
    useSearch();
    return (
      <SelectGroupContainer
        {...props}
        cui-select-group=""
        ref={mergeRefs([
          forwardedRef,
          node => {
            const hidden =
              node?.querySelectorAll('[cui-select-item]:not([hidden])').length === 0;
            if (hidden) {
              node?.setAttribute('hidden', '');
            } else {
              node?.removeAttribute('hidden');
            }
            node?.setAttribute('aria-hidden', hidden.toString());
          },
        ])}
      >
        <SelectGroupName cui-select-group-name="">{heading}</SelectGroupName>
        <SelectGroupContent>{children}</SelectGroupContent>
      </SelectGroupContainer>
    );
  }
);

SelectGroup.displayName = 'Select.Group';

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  (
    {
      disabled = false,
      children,
      label,
      description,
      separator,
      onSelect: onSelectProp,
      value = '',
      icon,
      iconDir,
      onMouseOver: onMouseOverProp,
      ...props
    },
    forwardedRef
  ) => {
    const { highlighted, updateHighlighted, isHidden, selectedValues, onSelect } =
      useOption();
    const onSelectValue = (evt: MouseEvent<HTMLElement>) => {
      if (!disabled) {
        onSelect(value, undefined, evt);
        if (typeof onSelectProp == 'function') {
          onSelectProp(value, undefined, evt);
        }
      }
    };
    const onMouseOver = (e: MouseEvent<HTMLDivElement>) => {
      if (onMouseOverProp) {
        onMouseOverProp(e);
      }
      if (!disabled) {
        updateHighlighted(value);
      }
    };

    // Filtered items stay mounted (just hidden) so their text remains readable
    // from the DOM for search; see the searchSource capture in InternalSelect.
    const hidden = isHidden(value);
    const isChecked = selectedValues.includes(value);

    return (
      <>
        <GenericMenuItem
          {...props}
          hidden={hidden}
          data-value={value}
          onClick={onSelectValue}
          onMouseOver={onMouseOver}
          ref={forwardedRef}
          data-state={isChecked ? 'checked' : 'unchecked'}
          data-disabled={disabled ? true : undefined}
          data-highlighted={highlighted == value ? 'true' : undefined}
          cui-select-item=""
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
            gap="xxs"
            isResponsive={false}
          >
            {label ? (
              <>
                {label}
                {description && (
                  <SelectItemDescription>{description}</SelectItemDescription>
                )}
              </>
            ) : (
              children
            )}
          </IconWrapper>
          <Icon
            className={cn(
              selectStyles['check-icon'],
              isChecked && selectStyles['check-icon_show-check']
            )}
            name="check"
            size="sm"
          />
        </GenericMenuItem>
        {separator && !hidden && <Separator size="sm" />}
      </>
    );
  }
);

export type MultiSelectCheckboxItemProps = SelectItemProps & {
  variant?: CheckboxVariants;
};

SelectItem.displayName = 'Select.Item';

export const MultiSelectCheckboxItem = forwardRef<
  HTMLDivElement,
  MultiSelectCheckboxItemProps
>(
  (
    {
      disabled = false,
      children,
      icon,
      iconDir = 'end',
      label,
      description,
      onMouseOver: onMouseOverProp,
      onSelect: onSelectProp,
      separator,
      value = '',
      variant,
      ...props
    },
    forwardedRef
  ) => {
    const { highlighted, updateHighlighted, isHidden, selectedValues, onSelect } =
      useOption();

    const handleMenuItemClick = (evt: MouseEvent<HTMLElement>) => {
      if (!disabled) {
        onSelect(value, undefined, evt);

        if (typeof onSelectProp === 'function') {
          onSelectProp(value, undefined, evt);
        }
      }
    };

    const handleMenuItemMouseOver = (e: MouseEvent<HTMLDivElement>) => {
      if (onMouseOverProp) {
        onMouseOverProp(e);
      }
      if (!disabled) {
        updateHighlighted(value);
      }
    };

    // Filtered items stay mounted (just hidden) so their text remains readable
    // from the DOM for search; see the searchSource capture in InternalSelect.
    const hidden = isHidden(value);
    const isChecked = selectedValues.includes(value);

    return (
      <>
        <GenericMenuItem
          {...props}
          hidden={hidden}
          data-value={value}
          onClick={handleMenuItemClick}
          onMouseOver={handleMenuItemMouseOver}
          ref={forwardedRef}
          data-disabled={disabled ? true : undefined}
          data-highlighted={highlighted == value ? 'true' : undefined}
          data-testid={`multi-select-checkbox-${value}`}
          cui-select-item=""
        >
          <Container
            orientation="horizontal"
            gap="xs"
            overflow="hidden"
            isResponsive={false}
          >
            <Checkbox
              checked={isChecked}
              data-testid="multi-select-checkbox"
              disabled={disabled}
              variant={variant ?? 'default'}
            />
            <IconWrapper
              icon={icon}
              iconDir={iconDir}
              gap="xxs"
              isResponsive={false}
            >
              {label ? (
                <>
                  {label}
                  {description && (
                    <SelectItemDescription>{description}</SelectItemDescription>
                  )}
                </>
              ) : (
                children
              )}
            </IconWrapper>
          </Container>
        </GenericMenuItem>
        {separator && !hidden && <Separator size="sm" />}
      </>
    );
  }
);

MultiSelectCheckboxItem.displayName = 'Select.Item';

export const SelectItemDescription = forwardRef<HTMLDivElement, TextProps>(
  ({ children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        component={SelectItemDescriptionText}
        color="muted"
        {...props}
      >
        {children}
      </Text>
    );
  }
);

SelectItemDescription.displayName = 'Select.ItemDescription';
